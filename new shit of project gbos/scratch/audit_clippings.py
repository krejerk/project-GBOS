import os
import re

def get_md_truth(chapter_dir, filename):
    md_path = os.path.join(chapter_dir, filename)
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    fm_match = re.search(r'---(.*?)---', content, re.DOTALL)
    if not fm_match: return None
    fm = fm_match.group(1)
    
    id_match = re.search(r'id:\s*(\w+)', fm)
    clip_id = id_match.group(1) if id_match else None
    
    year_match = re.search(r'trigger_year:\s*["\']?(\d{4})["\']?', fm)
    year = year_match.group(1) if year_match else None
    
    person_match = re.search(r'trigger_persons:\s*\[(.*?)\]', fm)
    persons = []
    if person_match:
        persons = [p.strip().strip('"').strip("'") for p in person_match.group(1).split(',') if p.strip()]
    else:
        single_person = re.search(r'trigger_persons:\s*([^\n]+)', fm)
        if single_person and '[' not in single_person.group(1):
            persons = [single_person.group(1).strip()]

    revealed = []
    rev_match = re.search(r'revealed:\s*\n((?:\s*-\s*[^\n]+\s*\n?)+)', fm)
    if rev_match:
        revealed_block = rev_match.group(1)
        revealed = [line.strip('- ').strip() for line in revealed_block.split('\n') if line.strip('- ').strip()]
    else:
        inline_match = re.search(r'revealed:\s*\[(.*?)\]', fm)
        if inline_match:
            revealed = [k.strip().strip('"').strip("'") for k in inline_match.group(1).split(',') if k.strip()]
            
    text_clues = re.findall(r'\(clue:(\w+)\)', content)
    all_revealed = set(revealed + text_clues)
    
    translation = {
        '米尔谷': 'mill_valley', '记者': 'reporter', '人造烟雾弹': 'fake_smoke_bomb',
        '盲区营地': 'blind_zone_camp', '林地深处': 'woodland_depths'
    }
    translated_rev = []
    for r in all_revealed:
        if r in translation: translated_rev.append(translation[r])
        elif r in ['None', '', '-']: continue
        else: translated_rev.append(r)

    return {
        'id': clip_id, 'year': year, 'persons': sorted(persons), 'revealed': sorted(list(set(translated_rev)))
    }

def audit_clippings():
    with open('constants/archive_data.ts', 'r', encoding='utf-8') as f:
        archive_ts = f.read()
    with open('constants/registry.ts', 'r', encoding='utf-8') as f:
        registry_ts = f.read()
        
    results = []
    archives_root = 'content/archives'
    
    for chapter in range(1, 10):
        chapter_dir = os.path.join(archives_root, f'chapter{chapter}')
        if not os.path.exists(chapter_dir): continue
            
        for filename in sorted(os.listdir(chapter_dir)):
            if filename.endswith('.md') and filename.startswith('clipping_'):
                truth = get_md_truth(chapter_dir, filename)
                if not truth: continue
                clip_id = truth['id']
                
                issues = []
                
                # Check archive_data.ts
                clip_pos = archive_ts.find(f'"{clip_id}"')
                if clip_pos == -1: clip_pos = archive_ts.find(f"'{clip_id}'")
                
                if clip_pos == -1:
                    issues.append("Missing in archive_data.ts")
                else:
                    next_clip = archive_ts.find('"id":', clip_pos + 10)
                    if next_clip == -1: next_clip = len(archive_ts)
                    chunk = archive_ts[clip_pos:next_clip]
                    
                    ts_year_m = re.search(r'"year":\s*["\'](\d{4})["\']', chunk)
                    ts_year = ts_year_m.group(1) if ts_year_m else None
                    
                    ts_person_m = re.search(r'"person":\s*\[(.*?)\]', chunk, re.DOTALL)
                    ts_persons = []
                    if ts_person_m:
                        ts_persons = sorted([p.strip().strip('"').strip("'") for p in ts_person_m.group(1).split(',') if p.strip()])
                    
                    ts_rev_m = re.search(r'"revealed":\s*\[(.*?)\]', chunk, re.DOTALL)
                    ts_rev = []
                    if ts_rev_m:
                        ts_rev = sorted([r.strip().strip('"').strip("'") for r in ts_rev_m.group(1).split(',') if r.strip()])
                    
                    if truth['year'] != ts_year: issues.append(f"Year mismatch: MD={truth['year']}, TS={ts_year}")
                    if truth['persons'] != ts_persons: issues.append(f"Persons mismatch: MD={truth['persons']}, TS={ts_persons}")
                    if truth['revealed'] != ts_rev: issues.append(f"Revealed mismatch: MD={truth['revealed']}, TS={ts_rev}")

                # Check registry.ts
                reg_pos = registry_ts.find(f'"{clip_id}"')
                if reg_pos == -1: reg_pos = registry_ts.find(f"'{clip_id}'")
                
                if reg_pos == -1:
                    issues.append("Missing in registry.ts")
                else:
                    next_reg = registry_ts.find('"clipping_', reg_pos + 10)
                    if next_reg == -1: next_reg = registry_ts.find('};', reg_pos)
                    if next_reg == -1: next_reg = len(registry_ts)
                    reg_chunk = registry_ts[reg_pos:next_reg]
                    
                    # More robust keywords search
                    reg_kw_m = re.search(r'["\']keywords["\']:\s*\[(.*?)\]', reg_chunk, re.DOTALL)
                    if not reg_kw_m: reg_kw_m = re.search(r'keywords:\s*\[(.*?)\]', reg_chunk, re.DOTALL)
                    
                    if reg_kw_m:
                        reg_kws = sorted([k.strip().strip('"').strip("'").encode().decode('unicode_escape') for k in reg_kw_m.group(1).split(',') if k.strip()])
                        expected_reg = sorted(list(set(([truth['year']] if truth['year'] else []) + truth['persons'])))
                        if reg_kws != expected_reg:
                            missing = set(expected_reg) - set(reg_kws)
                            extra = set(reg_kws) - set(expected_reg)
                            if missing: issues.append(f"Registry missing: {list(missing)}")
                            if extra: issues.append(f"Registry extra: {list(extra)}")
                    else:
                        issues.append("Keywords block not found in registry.ts")
                
                results.append({'id': clip_id, 'issues': issues})
                
    print("| Clipping ID | Status | Details |")
    print("|-------------|--------|---------|")
    for r in sorted(results, key=lambda x: int(re.search(r'\d+', x['id']).group())):
        status = "✅ OK" if not r['issues'] else "❌ Mismatch"
        detail_str = "<br>".join(r['issues']) if r['issues'] else "None"
        print(f"| {r['id']} | {status} | {detail_str} |")

if __name__ == "__main__":
    audit_clippings()
