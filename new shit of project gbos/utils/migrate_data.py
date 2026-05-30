import os
import re
import json

CONSTANTS_FILE = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/constants.tsx'
BU_DUMP_FILE = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/Bu_dump.txt'
CONTENT_DIR = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/content'
CHAPTERS_DIR = os.path.join(CONTENT_DIR, 'chapters')
ARCHIVES_DIR = os.path.join(CONTENT_DIR, 'archives')

def migrate_archives():
    with open(BU_DUMP_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Bu_dump is a list of objects: Bu=[{...}, {...}]
    # We can try to strip the "Bu=" and parse as JSON if it's clean, but it's likely JS (unquoted keys)
    # So we'll use regex for each object
    
    # Objects are separated by },{
    objects = re.split(r'\}\s*,\s*\{', content)
    
    for i, obj in enumerate(objects):
        # Add back brackets if they were stripped
        if not obj.startswith('{'): obj = '{' + obj
        if not obj.endswith('}'): obj = obj + '}'
        
        # Extract fields
        aid = re.search(r'id:\s*"(.*?)"', obj)
        title = re.search(r'title:\s*"(.*?)"', obj)
        triggers_text = re.search(r'triggers:\s*\{(.*?)\}', obj, re.DOTALL)
        news_text = re.search(r'newspaper:\s*\{(.*?)\}', obj, re.DOTALL)
        ann_text = re.search(r'annotation:\s*\{(.*?)\}', obj, re.DOTALL)
        
        if not aid: continue
        aid = aid.group(1)
        title = title.group(1) if title else ""
        
        # Triggers
        triggers = {}
        if triggers_text:
            t_body = triggers_text.group(1)
            year = re.search(r'year:\s*"?(\d+)"?', t_body)
            persons = re.search(r'person:\s*\[(.*?)\]', t_body)
            if year: triggers['year'] = int(year.group(1))
            if persons: 
                triggers['person'] = [p.strip().strip('"').strip("'") for p in persons.group(1).split(',')]

        # Newspaper content
        news_content = ""
        news_source = ""
        news_date = ""
        news_headline = ""
        if news_text:
            n_body = news_text.group(1)
            source = re.search(r'source:\s*"(.*?)"', n_body)
            date = re.search(r'date:\s*"(.*?)"', n_body)
            headline = re.search(r'headline:\s*"(.*?)"', n_body)
            content_arr = re.search(r'content:\s*\[(.*?)\]', n_body, re.DOTALL)
            
            news_source = source.group(1) if source else ""
            news_date = date.group(1) if date else ""
            news_headline = headline.group(1) if headline else ""
            if content_arr:
                # This could be multiple strings
                items = re.findall(r'"(.*?)"', content_arr.group(1))
                news_content = "\n\n".join(items)

        # Annotation content
        ann_body_text = ""
        ann_file = ""
        ann_date = ""
        ann_level = ""
        ann_author = ""
        if ann_text:
            a_body = ann_text.group(1)
            file_id = re.search(r'fileId:\s*"(.*?)"', a_body)
            date = re.search(r'date:\s*"(.*?)"', a_body)
            level = re.search(r'level:\s*"(.*?)"', a_body)
            author = re.search(r'author:\s*"(.*?)"', a_body)
            content_val = re.search(r'content:\s*`(.*?)`', a_body, re.DOTALL)
            
            ann_file = file_id.group(1) if file_id else ""
            ann_date = date.group(1) if date else ""
            ann_level = level.group(1) if level else ""
            ann_author = author.group(1) if author else ""
            ann_body_text = content_val.group(1).strip() if content_val else ""

        # Write to MD
        trig_year = triggers.get('year', '')
        trig_persons = json.dumps(triggers.get('person', []))
            
        md_content = f"""---
id: {aid}
title: "{title}"
trigger_year: "{trig_year}"
trigger_persons: {trig_persons}
newspaper_source: "{news_source}"
newspaper_date: "{news_date}"
newspaper_headline: "{news_headline}"
annotation_fileId: "{ann_file}"
annotation_date: "{ann_date}"
annotation_level: "{ann_level}"
annotation_author: "{ann_author}"
---

# NEWSPAPER
Source: {news_source}
Date: {news_date}
Headline: {news_headline}

{news_content}

# ANNOTATION
File: {ann_file}
Date: {ann_date}
Level: {ann_level}
Author: {ann_author}

{ann_body_text}
"""
        with open(os.path.join(ARCHIVES_DIR, f'{aid}.md'), 'w', encoding='utf-8') as f:
            f.write(md_content)
        print(f"Migrated archive {aid}")

def migrate_confessions():
    with open(CONSTANTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract UNLOCKS
    unlocks = {}
    unlocks_match = re.search(r'export const UNLOCKS_REGISTRY: Record<string, .*?> = \{(.*?)\};', content, re.DOTALL)
    if unlocks_match:
        entries = re.findall(r"'(\w+)': \{ keywords: \[(.*?)\]", unlocks_match.group(1), re.DOTALL)
        for nid, keys in entries:
            unlocks[nid] = [k.strip().strip("'").strip('"') for k in keys.split(',') if k.strip()]

    # Extract Nodes one by one
    # We find all blocks that look like a node
    node_blocks = re.split(r'\{\s*id:', content)
    for block in node_blocks[1:]:
        # Re-add "id:" to the beginning
        block = "id:" + block
        
        nid_match = re.search(r'id:\s*"(.*?)"', block)
        if not nid_match: continue
        nid = nid_match.group(1)
        
        title_match = re.search(r'title:\s*"(.*?)"', block)
        title = title_match.group(1) if title_match else ""
        
        revealed_match = re.search(r'revealedKeywords:\s*\[(.*?)\]', block, re.DOTALL)
        revealed = [k.strip().strip("'").strip('"') for k in revealed_match.group(1).split(',')] if revealed_match else []
        
        # Position
        pos_match = re.search(r'position:\s*\{(.*?)\}', block, re.DOTALL)
        pos = {"x": 400, "y": 300}
        if pos_match:
            try:
                x = re.search(r'x:\s*(.*?)(?:,|$)', pos_match.group(1))
                y = re.search(r'y:\s*(.*?)(?:,|$)', pos_match.group(1))
                if x: pos["x"] = x.group(1).strip()
                if y: pos["y"] = y.group(1).strip()
            except: pass

        # Layers
        surface = re.search(r'\[MemoryLayer\.SURFACE\]:\s*\{.*?event:\s*(?:`|")(.*?)(?:`|")', block, re.DOTALL)
        deep = re.search(r'\[MemoryLayer\.DEEP\]:\s*\{.*?event:\s*(?:`|")(.*?)(?:`|")', block, re.DOTALL)
        core = re.search(r'\[MemoryLayer\.CORE\]:\s*\{.*?event:\s*(?:`|")(.*?)(?:`|")', block, re.DOTALL)
        
        visual = re.search(r'visual:\s*(?:`|")(.*?)(?:`|")', block, re.DOTALL)
        vis_val = visual.group(1).replace('${import.meta.env.BASE_URL}', '') if visual else ""

        # Chapter heuristic
        c_num = '1'
        if nid.startswith('confession_'):
            num_match = re.search(r'\d+', nid)
            if num_match:
                num = int(num_match.group())
                if num <= 3: c_num = '1'
                elif num <= 7: c_num = '2'
                elif num <= 13: c_num = '3'
                elif num <= 23: c_num = '4'
                elif num <= 26: c_num = '5'
                elif num <= 30: c_num = '6'
                else: c_num = '7'
        elif nid in ['capone', 'luciano', 'gbos']:
            c_num = '7'

        trigger_str = "\n".join([f"  - {k}" for k in unlocks.get(nid, [])])
        revealed_str = "\n".join([f"  - {k}" for k in revealed])
        md_content = f"""---
id: {nid}
title: "{title}"
trigger:
{trigger_str}
revealed:
{revealed_str}
position: {{ x: {pos['x']}, y: {pos['y']} }}
visuals:
  surface: "{vis_val}"
---

# SURFACE
{surface.group(1).strip() if surface else ""}

# DEEP
{deep.group(1).strip() if deep else ""}

# CORE
{core.group(1).strip() if core else ""}
"""
        target_path = os.path.join(CHAPTERS_DIR, f'chapter{c_num}', f'{nid}.md')
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(md_content)
        print(f"Migrated node {nid}")

if __name__ == '__main__':
    migrate_archives()
    migrate_confessions()
