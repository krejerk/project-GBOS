import os
import re
import json

def decode_unicode(s):
    if not s: return s
    try:
        return s.encode('utf-8').decode('unicode-escape')
    except:
        return s

def normalize_list(lst):
    if not lst: return []
    decoded = [decode_unicode(str(x)).strip() for x in lst]
    return sorted(list(set(decoded)))

def extract_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'---\s*(.*?)\s*---', content, re.DOTALL)
    if not match: return None
    
    frontmatter = match.group(1)
    data = {}
    
    # Pre-process frontmatter to handle the weird revealed format in clipping_05
    # e.g. revealed：\n莫哈韦休息站\n空烟盒
    fm_lines = frontmatter.split('\n')
    i = 0
    while i < len(fm_lines):
        line = fm_lines[i]
        if ':' in line or '：' in line:
            sep = ':' if ':' in line else '：'
            key, val = line.split(sep, 1)
            key = key.strip()
            val = val.strip()
            if not val and i+1 < len(fm_lines) and not (':' in fm_lines[i+1] or '：' in fm_lines[i+1]):
                # Multiline or weird format
                next_vals = []
                while i+1 < len(fm_lines) and not (':' in fm_lines[i+1] or '：' in fm_lines[i+1]):
                    i += 1
                    v = fm_lines[i].strip('- ').strip()
                    if v: next_vals.append(v)
                data[key] = next_vals
            elif val.startswith('['):
                items = re.findall(r'["\'](.*?)["\']', val)
                data[key] = items
            else:
                data[key] = val
        i += 1
    
    return {
        'id': data.get('id'),
        'year': data.get('trigger_year'),
        'persons': normalize_list(data.get('trigger_persons', []) if isinstance(data.get('trigger_persons'), list) else [data.get('trigger_persons')] if data.get('trigger_persons') else []),
        'revealed': normalize_list(data.get('revealed', []) if isinstance(data.get('revealed'), list) else [data.get('revealed')] if data.get('revealed') else [])
    }

def extract_ts(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'export const ARCHIVE_DATABASE = \[(.*?)\];', content, re.DOTALL)
    if not match: return []
    
    entries_text = match.group(1)
    objects = []
    bracket_count = 0
    current_obj = ""
    for char in entries_text:
        if char == '{': bracket_count += 1
        if bracket_count > 0: current_obj += char
        if char == '}':
            bracket_count -= 1
            if bracket_count == 0:
                objects.append(current_obj)
                current_obj = ""
    
    results = []
    for obj_str in objects:
        id_match = re.search(r'"id":\s*"([^"]*)"', obj_str)
        year_match = re.search(r'"year":\s*"([^"]*)"', obj_str)
        person_match = re.search(r'"person":\s*\[(.*?)\]', obj_str, re.DOTALL)
        revealed_match = re.search(r'"revealed":\s*\[(.*?)\]', obj_str, re.DOTALL)
        
        id_val = id_match.group(1) if id_match else None
        year_val = year_match.group(1) if year_match else None
        
        persons = []
        if person_match:
            persons = re.findall(r'"(.*?)"', person_match.group(1))
        
        revealed = []
        if revealed_match:
            revealed = re.findall(r'"(.*?)"', revealed_match.group(1))
            
        results.append({
            'id': id_val,
            'year': year_val,
            'persons': normalize_list(persons),
            'revealed': normalize_list(revealed)
        })
    return results

def main():
    root_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos"
    archives_dir = os.path.join(root_dir, "content/archives")
    ts_file = os.path.join(root_dir, "constants/archive_data.ts")
    
    md_data = {}
    for chapter in range(1, 8):
        chapter_dir = os.path.join(archives_dir, f"chapter{chapter}")
        if not os.path.exists(chapter_dir): continue
        for filename in os.listdir(chapter_dir):
            if filename.endswith(".md"):
                info = extract_md(os.path.join(chapter_dir, filename))
                if info and info['id']: md_data[info['id']] = info
    
    ts_data_list = extract_ts(ts_file)
    ts_data = {item['id']: item for item in ts_data_list if item['id']}
    
    diffs = []
    all_ids = sorted(set(md_data.keys()) | set(ts_data.keys()))
    
    for cid in all_ids:
        md_item = md_data.get(cid)
        ts_item = ts_data.get(cid)
        
        if not md_item:
            diffs.append({"id": cid, "field": "Existence", "md": "Missing", "ts": "Present"})
            continue
        if not ts_item:
            diffs.append({"id": cid, "field": "Existence", "md": "Present", "ts": "Missing"})
            continue
            
        if md_item['year'] != ts_item['year'] and md_item['year'] is not None:
            diffs.append({"id": cid, "field": "Year", "md": md_item['year'], "ts": ts_item['year']})
            
        if md_item['persons'] != ts_item['persons']:
            diffs.append({"id": cid, "field": "Persons", "md": ", ".join(md_item['persons']), "ts": ", ".join(ts_item['persons'])})
            
        if md_item['revealed'] != ts_item['revealed']:
            diffs.append({"id": cid, "field": "Revealed", "md": ", ".join(md_item['revealed']), "ts": ", ".join(ts_item['revealed'])})

    if not diffs:
        print("No significant differences found after normalization.")
        return

    print("| ID | Field | MD (Truth) | TS (Implementation) |")
    print("|----|-------|------------|--------------------|")
    for d in diffs:
        # Avoid print encoding issues in terminal
        print(f"| {d['id']} | {d['field']} | {d['md']} | {d['ts']} |")

if __name__ == "__main__":
    main()
