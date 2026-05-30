import os
import re

def audit_logic_conflicts():
    search_dirs = ['content/archives', 'content/chapters']
    conflicts = {}

    for base_dir in search_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith('.md'):
                    path = os.path.join(root, file)
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()

                    fm_match = re.search(r'^---(.*?)---', content, re.DOTALL)
                    if not fm_match: continue
                    fm_text = fm_match.group(1)

                    # Extract triggers
                    triggers = []
                    # Archives style
                    t_year = re.search(r'trigger_year:\s*"?([a-zA-Z0-9_]+)"?', fm_text)
                    if t_year: triggers.append(f"year_{t_year.group(1)}")
                    t_persons = re.search(r'trigger_persons:\s*\[(.*?)\]', fm_text)
                    if t_persons:
                        # Find all IDs inside the list
                        ids = re.findall(r'\"([a-zA-Z0-9_]+)\"', t_persons.group(1))
                        triggers.extend(ids)
                    
                    # Confessions style
                    t_list = re.search(r'trigger:\s*(.*?)(?:\n\w+:|$)', fm_text, re.DOTALL)
                    if t_list:
                        ids = re.findall(r'-\s+([a-zA-Z0-9_]+)', t_list.group(1))
                        triggers.extend(ids)

                    # Extract revealed
                    revealed_match = re.search(r'revealed:(.*?)(?:\n\w+:|$)', fm_text, re.DOTALL)
                    revealed = []
                    if revealed_match:
                        rev_text = revealed_match.group(1).strip()
                        if rev_text.startswith('['):
                            revealed = re.findall(r'\"([^\"]+)\"', rev_text)
                        else:
                            revealed = [line.strip().replace('- ', '') for line in rev_text.split('\n') if '-' in line]

                    # Find overlaps
                    overlaps = [r for r in revealed if r in triggers]
                    if overlaps:
                        conflicts[path] = overlaps

    return conflicts

if __name__ == "__main__":
    results = audit_logic_conflicts()
    if results:
        print("LOGIC CONFLICTS FOUND (Trigger == Revealed):")
        for path, overlaps in results.items():
            print(f"\nFile: {path}")
            print(f"  - Overlapping IDs: {', '.join(overlaps)}")
    else:
        print("LOGIC AUDIT COMPLETE: NO TRIGGER/REVEALED OVERLAPS.")
