import os
import re

def get_chapter_data_from_ts(chapter_num):
    ts_path = f'constants/chapters/chapter{chapter_num}.ts'
    if not os.path.exists(ts_path):
        return []
    
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    nodes = []
    # Find all occurrences of id: "xxx" and then revealedKeywords: [...]
    # We use a pattern that finds the id and then searches for revealedKeywords before the next id or end of file
    matches = re.finditer(r'id:\s*["\']([^"\']+)["\']', content)
    
    id_positions = []
    for m in matches:
        id_positions.append((m.group(1), m.end()))
        
    for i in range(len(id_positions)):
        node_id, start_pos = id_positions[i]
        end_pos = id_positions[i+1][1] if i+1 < len(id_positions) else len(content)
        
        chunk = content[start_pos:end_pos]
        kw_match = re.search(r'revealedKeywords:\s*\[(.*?)\]', chunk, re.DOTALL)
        keywords = []
        if kw_match:
            # Handle both single and double quotes, and trailing commas
            kw_str = kw_match.group(1)
            keywords = [k.strip().strip('"').strip("'") for k in kw_str.split(',') if k.strip()]
        
        nodes.append({'id': node_id, 'revealedKeywords': sorted(keywords)})
    return nodes

def get_md_truth(chapter, node_id):
    md_path = f'content/chapters/chapter{chapter}/{node_id}.md'
    if not os.path.exists(md_path):
        return None
    
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    fm_rev = []
    fm_match = re.search(r'---(.*?)---', content, re.DOTALL)
    if fm_match:
        fm_content = fm_match.group(1)
        # Look for revealed: block
        revealed_match = re.search(r'revealed:\s*\n((?:\s*-\s*\w+\s*\n?)+)', fm_content)
        if revealed_match:
            revealed_block = revealed_match.group(1)
            fm_rev = [line.strip('- ').strip() for line in revealed_block.split('\n') if line.strip('- ').strip()]
        else:
            # Try single line revealed: [a, b]
            inline_match = re.search(r'revealed:\s*\[(.*?)\]', fm_content)
            if inline_match:
                fm_rev = [k.strip().strip('"').strip("'") for k in inline_match.group(1).split(',') if k.strip()]
    
    text_clues = re.findall(r'\(clue:(\w+)\)', content)
    
    truth = set()
    for item in fm_rev + text_clues:
        if item == 'None' or not item: continue
        if re.match(r'^\d{4}$', item):
            truth.add(f"year_{item}")
        else:
            truth.add(item)
            
    return sorted(list(truth))

def audit():
    print("| Node ID | MD Truth (FM + Text) | TS Impl | Status |")
    print("|---------|----------------------|---------|--------|")
    
    for chapter in range(1, 10):
        ts_data = get_chapter_data_from_ts(chapter)
        
        for node in ts_data:
            md_truth = get_md_truth(chapter, node['id'])
            if md_truth is None: continue
            
            ts_rev = sorted(node.get('revealedKeywords', []))
            
            truth_str = ", ".join(md_truth) if md_truth else "None"
            ts_str = ", ".join(ts_rev) if ts_rev else "None"
            
            status = "✅ OK" if md_truth == ts_rev else "❌ Mismatch"
            
            print(f"| {node['id']} | {truth_str} | {ts_str} | {status} |")

if __name__ == "__main__":
    audit()
