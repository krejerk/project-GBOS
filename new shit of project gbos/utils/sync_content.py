import os
import re
import json

# --- Configuration ---
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(PROJECT_ROOT, 'content')
CONSTANTS_DIR = os.path.join(PROJECT_ROOT, 'constants')
CHAPTERS_OUT_DIR = os.path.join(CONSTANTS_DIR, 'chapters')
REGISTRY_FILE = os.path.join(PROJECT_ROOT, 'constants', 'registry.ts')
ARCHIVE_DATA_FILE = os.path.join(PROJECT_ROOT, 'constants', 'archive_data.ts')
KEYWORDS_FILE = os.path.join(CONTENT_DIR, 'metadata', 'keywords.md')
GLOBAL_REVEALS_FILE = os.path.join(CONTENT_DIR, 'metadata', 'global_reveals.md')

def parse_val(v):
    v = v.strip()
    if not v: return None
    if v.startswith('[') and v.endswith(']'):
        return [i.strip().strip("'").strip('"') for i in v[1:-1].split(',') if i.strip()]
    if v.startswith('{') and v.endswith('}'):
        d = {}
        for item in v[1:-1].split(','):
            if ':' in item:
                ki, vi = item.split(':', 1)
                ki = ki.strip().strip("'").strip('"')
                vi = vi.strip().strip("'").strip('"')
                if vi.isdigit(): vi = int(vi)
                elif vi.replace('.','',1).isdigit(): vi = float(vi)
                d[ki] = vi
        return d
    if v.isdigit(): return int(v)
    if v.replace('.','',1).isdigit(): return float(v)
    return v.strip("'").strip('"')

def parse_yaml_frontmatter(text):
    """A slightly more robust parser that handles basic indentation for dicts and lists."""
    # Normalize full-width colons
    text = text.replace('：', ':')
    lines = text.split('\n')
    data = {}
    current_key = None
    
    for line in lines:
        if not line.strip() or line.strip() == '---': continue
        indent = len(line) - len(line.lstrip())
        content = line.strip()
        
        if ':' in content and not content.startswith('-'):
            k, v = content.split(':', 1)
            k = k.strip()
            val = parse_val(v)
            if val is not None:
                data[k] = val
                current_key = k
            else:
                data[k] = [] # Assume list if no value and starts a block
                current_key = k
        elif content.startswith('-'):
            if current_key:
                if not isinstance(data[current_key], list): data[current_key] = []
                data[current_key].append(parse_val(content[1:]))
        elif indent > 0 and current_key:
            # Handle liberal lists (indented without dashes)
            if isinstance(data[current_key], list):
                data[current_key].append(parse_val(content))
            elif isinstance(data[current_key], dict) and ':' in content:
                sk, sv = content.split(':', 1)
                data[current_key][sk.strip()] = parse_val(sv)
    return data

def parse_md(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    fm_match = re.search(r'^---(.*?)---', content, re.DOTALL | re.MULTILINE)
    metadata = {}
    body = content
    if fm_match:
        metadata = parse_yaml_frontmatter(fm_match.group(1))
        body = content[fm_match.end():].strip()
    
    sections = {}
    parts = re.split(r'^#\s+(SURFACE|DEEP|CORE|NEWSPAPER|ANNOTATION)', body, flags=re.MULTILINE)
    for i in range(1, len(parts), 2):
        sections[parts[i].strip()] = parts[i+1].strip()
    return metadata, sections

def sync():
    print(">>> Starting GS Sync Engine")
    keywords = {}
    if os.path.exists(KEYWORDS_FILE):
        with open(KEYWORDS_FILE, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        for line in lines:
            if '|' in line and not line.startswith('#'):
                cols = [c.strip() for c in line.split('|')]
                # Skip header and separator lines
                if len(cols) >= 8 and cols[1] != 'ID' and not all(c.startswith('-') for c in cols[1:-1] if c):
                    kid = cols[1]
                    keywords[kid] = {
                        'id': kid,
                        'type': cols[2], 'displayName': cols[3],
                        'chapter': int(cols[4]) if cols[4].isdigit() else 1,
                        'description': cols[5] if cols[5] != '-' else '',
                        'source': cols[6] if cols[6] != '-' else '',
                        'aliases': [a.strip() for a in cols[7].split(',') if a.strip() and a.strip() != '-'],
                        'attachments': [a.strip() for a in cols[8].split(',') if a.strip() and a.strip() != '-'] if len(cols) > 8 else []
                    }
    
    # Initialize chapters with all keywords from keywords.md
    chapters = {}
    for kid, kinfo in keywords.items():
        cnum = str(kinfo.get('chapter', 0))
        if cnum not in chapters: chapters[cnum] = {'nodes': [], 'keywords': {}}
        chapters[cnum]['keywords'][kid] = keywords[kid]

    unlocks = {}
    chaps_root = os.path.join(CONTENT_DIR, 'chapters')
    if os.path.exists(chaps_root):
        for cdir in sorted(os.listdir(chaps_root)):
            if cdir.startswith('chapter'):
                cnum = cdir.replace('chapter', '')
                cpath = os.path.join(chaps_root, cdir)
                if cnum not in chapters: chapters[cnum] = {'nodes': [], 'keywords': {}}
                for f in os.listdir(cpath):
                    if f.endswith('.md'):
                        meta, sections = parse_md(os.path.join(cpath, f))
                        # Handle literal \n in sections
                        for k in sections:
                            sections[k] = sections[k].replace('\\n', '\n')
                        
                        nid = meta.get('id', f.replace('.md',''))
                        node = {
                            'id': nid, 'title': meta.get('title', nid),
                            'trigger': meta.get('trigger', []), 'revealed': [],
                            'excluded': meta.get('excluded', []), 'visuals': meta.get('visuals', {}),
                            'sections': sections, 'position': meta.get('position', {'x':500, 'y':500})
                        }
                        
                        # Resolve revealed keywords
                        name_to_id = {kv['displayName']: kid for kid, kv in keywords.items()}
                        raw_revealed = meta.get('revealed', [])
                        items = [raw_revealed] if isinstance(raw_revealed, (str, int)) else raw_revealed
                        for item in items:
                            if not item: continue
                            item = str(item).strip()
                            kid = None
                            if item in keywords: kid = item
                            elif item in name_to_id: kid = name_to_id[item]
                            else:
                                fuzzy_item = item.replace('年', '').replace('州', '')
                                if fuzzy_item in name_to_id: kid = name_to_id[fuzzy_item]
                                elif fuzzy_item.isdigit() and f"year_{fuzzy_item}" in keywords:
                                    kid = f"year_{fuzzy_item}"
                                else: kid = item
                            
                            if kid:
                                if kid.isdigit() and f"year_{kid}" in keywords:
                                    kid = f"year_{kid}"
                                node['revealed'].append(kid)
                                # Ensure used keywords are in this chapter's registry
                                if kid in keywords:
                                    chapters[cnum]['keywords'][kid] = keywords[kid]

                        chapters[cnum]['nodes'].append(node)
                        if node['trigger']: unlocks[nid] = {'keywords': node['trigger'], 'targetId': nid, 'type': 'node'}

    # Global Reveals
    global_revealed_ids = []
    if os.path.exists(GLOBAL_REVEALS_FILE):
        with open(GLOBAL_REVEALS_FILE, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        for line in lines:
            if line.strip().startswith('-'):
                kid = line.strip().lstrip('-').strip()
                if kid: global_revealed_ids.append(kid)
    
    global_keywords = {}
    for kid in global_revealed_ids:
        if kid in keywords: global_keywords[kid] = keywords[kid]

    archives = []
    arch_root = os.path.join(CONTENT_DIR, 'archives')
    if os.path.exists(arch_root):
        for root, dirs, files in os.walk(arch_root):
            for f in files:
                if f.endswith('.md'):
                    meta, sections = parse_md(os.path.join(root, f))
                    # Handle literal \n in sections
                    for k in sections:
                        sections[k] = sections[k].replace('\\n', '\n')
                    
                    aid = meta.get('id', f.replace('.md',''))
                    nw_content = [l.strip() for l in sections.get('NEWSPAPER', '').split('\n') if l.strip()]
                    arch_node = {
                        'id': aid, 'title': meta.get('title', aid),
                        'triggers': { 
                            'year': meta.get('trigger_year', ''), 
                            'person': meta.get('trigger_persons', []) 
                        },
                        'revealed': [],
                        'newspaper': { 
                            'source': meta.get('newspaper_source', ''), 
                            'date': meta.get('newspaper_date', ''), 
                            'headline': meta.get('newspaper_headline', ''), 
                            'content': nw_content 
                        },
                        'annotation': { 
                            'fileId': meta.get('annotation_fileId', ''), 
                            'date': meta.get('annotation_date', ''), 
                            'level': meta.get('annotation_level', ''), 
                            'author': meta.get('annotation_author', ''), 
                            'template': meta.get('annotation_template', 'REGGIE'), 
                            'content': sections.get('ANNOTATION', '') 
                        }
                    }

                    # Resolve revealed keywords
                    name_to_id = {kv['displayName']: kid for kid, kv in keywords.items()}
                    raw_revealed = meta.get('revealed', [])
                    items = [raw_revealed] if isinstance(raw_revealed, (str, int)) else raw_revealed
                    for item in items:
                        if not item: continue
                        item = str(item).strip()
                        kid = None
                        if item in keywords: kid = item
                        elif item in name_to_id: kid = name_to_id[item]
                        else:
                            fuzzy_item = item.replace('年', '').replace('州', '')
                            if fuzzy_item in name_to_id: kid = name_to_id[fuzzy_item]
                            elif fuzzy_item.isdigit() and f"year_{fuzzy_item}" in keywords:
                                kid = f"year_{fuzzy_item}"
                            else: kid = item
                        
                        if kid:
                            if kid.isdigit() and f"year_{kid}" in keywords:
                                kid = f"year_{kid}"
                            arch_node['revealed'].append(kid)
                            if kid in keywords:
                                c_num = str(keywords[kid].get('chapter', 1))
                                if c_num not in chapters: chapters[c_num] = {'nodes': [], 'keywords': {}}
                                chapters[c_num]['keywords'][kid] = keywords[kid]

                    archives.append(arch_node)
                    # Ensure UNLOCKS_REGISTRY has archive triggers
                    trig = arch_node['triggers']
                    kw_list = []
                    if trig.get('year'): kw_list.append(trig['year'])
                    if trig.get('person'):
                        if isinstance(trig['person'], list): kw_list.extend(trig['person'])
                        else: kw_list.append(trig['person'])
                    if kw_list:
                        unlocks[aid] = {'keywords': kw_list, 'targetId': aid, 'type': 'archive'}

    # Generation
    if not os.path.exists(CHAPTERS_OUT_DIR): os.makedirs(CHAPTERS_OUT_DIR)
    
    for n, data in chapters.items():
        kw_entries = []
        for kid, kv in data['keywords'].items():
            line = f"  '{kid}': {{ id: '{kid}', chapter: {kv['chapter']}, type: '{kv['type']}', displayName: {json.dumps(kv['displayName'], ensure_ascii=False)}, isPersistent: true"
            if kv['description']: line += f", description: {json.dumps(kv['description'], ensure_ascii=False)}"
            if kv['source']: line += f", source: {json.dumps(kv['source'], ensure_ascii=False)}"
            if (kv.get('attachments')): line += f", attachments: {json.dumps(kv['attachments'], ensure_ascii=False)}"
            line += " }"
            kw_entries.append(line)
        
        node_snippets = []
        for nd in data['nodes']:
            def extract_pos_val(v, default=500):
                if not v: return default
                if isinstance(v, (int, float)): return float(v)
                if isinstance(v, str) and '*' in v:
                    try: return float(v.split('*')[-1].strip()) * 1000
                    except: return default
                try: return float(v)
                except: return default

            pos = nd['position']
            px = extract_pos_val(pos.get('x', 500) if isinstance(pos, dict) else 500)
            py = extract_pos_val(pos.get('y', 500) if isinstance(pos, dict) else 500)
            
            vis = nd.get('visuals', {})
            vs = vis.get('surface', '') if isinstance(vis, dict) else ''
            vd = vis.get('deep', '') if isinstance(vis, dict) else ''
            vc = vis.get('core', '') if isinstance(vis, dict) else ''
            
            s = f"""  {{
    id: "{nd['id']}",
    keyword: "confession",
    title: {json.dumps(nd['title'], ensure_ascii=False)},
    currentLayer: MemoryLayer.SURFACE,
    position: {{ x: window.innerWidth * {px/1000}, y: window.innerHeight * {py/1000} }},
    revealedKeywords: {json.dumps(nd['revealed'])},
    excludedKeywords: {json.dumps(nd['excluded'])},
    layers: {{
      [MemoryLayer.SURFACE]: {{ event: {json.dumps(nd['sections'].get('SURFACE', ''), ensure_ascii=False)}, attitude: "", visual: {json.dumps(vs, ensure_ascii=False)} }},
      [MemoryLayer.DEEP]: {{ event: {json.dumps(nd['sections'].get('DEEP', ''), ensure_ascii=False)}, attitude: "", visual: {json.dumps(vd, ensure_ascii=False)} }},
      [MemoryLayer.CORE]: {{ event: {json.dumps(nd['sections'].get('CORE', ''), ensure_ascii=False)}, attitude: "", visual: {json.dumps(vc, ensure_ascii=False)} }}
    }}
  }}"""
            node_snippets.append(s)
            
        with open(os.path.join(CHAPTERS_OUT_DIR, f"chapter{n}.ts"), 'w', encoding='utf-8') as out:
            out.write(f"import {{ MemoryLayer, MemoryNode }} from '../../types';\nimport {{ KeywordMetadata }} from '../types';\n\n")
            out.write(f"export const CHAPTER{n}_KEYWORDS: Record<string, KeywordMetadata> = {{\n" + ",\n".join(kw_entries) + "\n};\n\n")
            out.write(f"export const CHAPTER{n}_NODES: MemoryNode[] = [\n" + ",\n".join(node_snippets) + "\n];\n")
    
    if archives:
        with open(ARCHIVE_DATA_FILE, 'w', encoding='utf-8') as out:
            out.write(f"export const ARCHIVE_DATABASE = {json.dumps(archives, indent=4, ensure_ascii=False)};")

    alias_map = {}
    for kid, kv in keywords.items():
        alias_map[kv['displayName']] = {"id": kid, "type": kv['type']}
        if 'aliases' in kv:
            for a in kv['aliases']: alias_map[a] = {"id": kid, "type": kv['type']}

    # Registry update
    with open(REGISTRY_FILE, 'w', encoding='utf-8') as out:
        out.write("import { MemoryNode } from '../types';\nimport { KeywordMetadata } from './types';\n")
        for n in sorted(chapters.keys()): out.write(f"import {{ CHAPTER{n}_KEYWORDS, CHAPTER{n}_NODES }} from './chapters/chapter{n}';\n")
        out.write("import { IDENTITY_NODES, IDENTITY_KEYWORDS } from './chapters/identity';\n\n")
        out.write("export const KEYWORD_REGISTRY: Record<string, KeywordMetadata> = {\n  ...IDENTITY_KEYWORDS,\n")
        for kid, kv in global_keywords.items():
            line = f"  '{kid}': {{ id: '{kid}', chapter: {kv['chapter']}, type: '{kv['type']}', displayName: {json.dumps(kv['displayName'], ensure_ascii=False)}, isPersistent: true"
            if kv['description']: line += f", description: {json.dumps(kv['description'], ensure_ascii=False)}"
            if kv['source']: line += f", source: {json.dumps(kv['source'], ensure_ascii=False)}"
            if (kv.get('attachments')): line += f", attachments: {json.dumps(kv['attachments'], ensure_ascii=False)}"
            line += " },\n"
            out.write(line)
        for n in sorted(chapters.keys()): out.write(f"  ...CHAPTER{n}_KEYWORDS,\n")
        out.write("};\n\nexport const ALL_MEMORY_NODES: MemoryNode[] = [\n  ...IDENTITY_NODES,\n")
        for n in sorted(chapters.keys()): out.write(f"  ...CHAPTER{n}_NODES,\n")
        out.write("];\n\nexport const NODE_MAP = new Map(ALL_MEMORY_NODES.map(node => [node.id, node]));\n\n")
        out.write(f"export const GLOBAL_KEYWORD_MAP: Record<string, {{ id: string, type: string }}> = {json.dumps(alias_map, indent=2, ensure_ascii=False)};\n\n")
        out.write("export const CLUE_DISPLAY_MAP: Record<string, string> = {};\nObject.keys(KEYWORD_REGISTRY).forEach(id => { CLUE_DISPLAY_MAP[id] = KEYWORD_REGISTRY[id].displayName || id; });\n\n")
        out.write(f"export const UNLOCKS_REGISTRY: Record<string, {{ keywords: string[], targetId: string, type: 'node' | 'archive' }}> = {json.dumps(unlocks, indent=2, ensure_ascii=False)};\n\n")
        out.write("export const KEYWORD_CONSUMPTION_MAP: Record<string, string[]> = {};\nObject.entries(UNLOCKS_REGISTRY).forEach(([id, entry]) => { if (entry.keywords) KEYWORD_CONSUMPTION_MAP[id] = entry.keywords; });\n")

    print(">>> Sync Complete!")

if __name__ == "__main__":
    sync()
