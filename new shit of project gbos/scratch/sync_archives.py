import os
import re
import json

def get_mappings():
    root_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos"
    chapters_dir = os.path.join(root_dir, "constants/chapters")
    mapping = {}
    for filename in os.listdir(chapters_dir):
        if filename.endswith(".ts"):
            with open(os.path.join(chapters_dir, filename), 'r', encoding='utf-8') as f:
                content = f.read()
                matches = re.finditer(r"['\"](\w+)['\"]:\s*\{[^}]*displayName:\s*['\"](.*?)['\"]", content)
                for m in matches:
                    mapping[m.group(2)] = m.group(1)
    
    mapping.update({
        "莫哈韦休息站": "mojave_rest_stop",
        "空烟盒": "empty_cigarette_pack",
        "玛莎·迪亚兹": "martha_diaz",
        "罗阿诺克": "roanoke",
        "约翰·莫里西": "john_morrissey",
        "里奇": "richie",
        "阿列克谢": "alexei",
        "什一税": "tithe",
        "威廉·道森": "william_dawson",
        "汉弗莱县": "humphrey_county",
        "袭警案": "assault_on_police",
        "弗兰克·罗林斯": "frank_rollins",
        "费利佩·马尔多纳多": "felipe_maldonado",
        "朱莉": "julie",
        "朱维尔·钱伯斯": "juvell_chambers",
        "伯克斯维尔": "burkesville",
        "薄荷计划": "mint_plan",
        "匡提科": "quantico",
        "KLUB-75号分析报告": "klub75_report"
    })
    return mapping

def extract_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'---\s*(.*?)\s*---', content, re.DOTALL)
    if not match: return None
    
    frontmatter = match.group(1)
    data = {}
    lines = frontmatter.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip(): 
            i += 1
            continue
        if ':' in line or '：' in line:
            sep = ':' if ':' in line else '：'
            parts = line.split(sep, 1)
            key = parts[0].strip()
            val = parts[1].strip() if len(parts) > 1 else ""
            
            if not val and i+1 < len(lines) and not (':' in lines[i+1] or '：' in lines[i+1]):
                next_vals = []
                while i+1 < len(lines) and not (':' in lines[i+1] or '：' in lines[i+1]):
                    i += 1
                    v = lines[i].strip('- ').strip()
                    if v: next_vals.append(v)
                data[key] = next_vals
            elif val.startswith('['):
                items = re.findall(r'["\'](.*?)["\']', val)
                data[key] = items
            else:
                data[key] = val.strip('"').strip("'")
        i += 1
    
    return {
        'id': data.get('id'),
        'year': data.get('trigger_year'),
        'persons': data.get('trigger_persons', []) if isinstance(data.get('trigger_persons'), list) else [data.get('trigger_persons')] if data.get('trigger_persons') else [],
        'revealed': data.get('revealed', []) if isinstance(data.get('revealed'), list) else [data.get('revealed')] if data.get('revealed') else []
    }

def sync():
    mapping = get_mappings()
    root_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos"
    archives_dir = os.path.join(root_dir, "content/archives")
    ts_file = os.path.join(root_dir, "constants/archive_data.ts")
    
    md_data = {}
    for chapter in range(1, 6):
        chapter_dir = os.path.join(archives_dir, f"chapter{chapter}")
        if not os.path.exists(chapter_dir): continue
        for filename in os.listdir(chapter_dir):
            if filename.endswith(".md"):
                info = extract_md(os.path.join(chapter_dir, filename))
                if info and info['id']: md_data[info['id']] = info

    with open(ts_file, 'r', encoding='utf-8') as f:
        ts_content = f.read()

    for cid, data in md_data.items():
        # Better pattern to match the whole object block
        # Match starting from { where id: cid is present, until a }, at 4 spaces indentation
        pattern = r'\{\s*"id"\s*:\s*"' + cid + r'".*?\n\s{4}\},?'
        obj_match = re.search(pattern, ts_content, re.DOTALL)
        if not obj_match: 
            # Try 8 spaces if 4 fails (some might be deeper?)
            pattern = r'\{\s*"id"\s*:\s*"' + cid + r'".*?\n\s{8}\},?'
            obj_match = re.search(pattern, ts_content, re.DOTALL)
            
        if not obj_match: continue
        
        obj_str = obj_match.group(0)
        new_obj_str = obj_str
        
        # Update revealed
        rev_ids = []
        for r in data['revealed']:
            if not r: continue
            if r in mapping: rev_ids.append(mapping[r])
            else: rev_ids.append(r)
        
        rev_list_str = '[' + ', '.join([f'"{r}"' for r in rev_ids]) + ']'
        rev_pattern = r'"revealed"\s*:\s*\[.*?\]'
        new_obj_str = re.sub(rev_pattern, lambda m: f'"revealed": {rev_list_str}', new_obj_str, count=1, flags=re.DOTALL)
        
        # Update persons (triggers)
        persons = data['persons']
        persons_str = '[' + ', '.join([f'"{p}"' for p in persons]) + ']'
        per_pattern = r'"person"\s*:\s*\[.*?\]'
        new_obj_str = re.sub(per_pattern, lambda m: f'"person": {persons_str}', new_obj_str, count=1, flags=re.DOTALL)

        # Update year
        year = data['year']
        if year:
            new_obj_str = re.sub(r'"year"\s*:\s*"[^"]*"', lambda m: f'"year": "{year}"', new_obj_str, count=1)
            
        ts_content = ts_content.replace(obj_str, new_obj_str)

    with open(ts_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print("Sync completed for chapters 1-5.")

if __name__ == "__main__":
    sync()
