import os
import re

def audit_clippings_v2():
    base_dir = 'content/archives'
    broken_files = {}

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                # Extract revealed list - improved regex to handle hyphens and underscores
                fm_match = re.search(r'^---(.*?)---', content, re.DOTALL)
                if not fm_match: continue
                
                fm_text = fm_match.group(1)
                revealed_match = re.search(r'revealed:(.*?)(?:\n\w+:|$)', fm_text, re.DOTALL)
                revealed = []
                if revealed_match:
                    # Match any characters except newline after '- '
                    revealed = [line.strip().replace('- ', '') for line in revealed_match.group(1).split('\n') if '-' in line]
                
                # Find all clues in text
                clues_in_text = re.findall(r'\[.*?\]\(clue:(.*?)\)', content)
                
                issues = []
                # Check for missing tags
                for r_id in revealed:
                    if r_id not in clues_in_text:
                        issues.append(f"Missing tag for revealed ID: {r_id}")
                
                # Check for unauthorized tags
                for c_id in clues_in_text:
                    if c_id not in revealed:
                        issues.append(f"Unauthorized tag in text: {c_id}")
                
                # Check for duplicates
                from collections import Counter
                counts = Counter(clues_in_text)
                for cid, count in counts.items():
                    if count > 1:
                        issues.append(f"Duplicate tag for ID: {cid} (Found {count} times)")

                if issues:
                    broken_files[path] = issues

    return broken_files

if __name__ == "__main__":
    results = audit_clippings_v2()
    if results:
        print("AUDIT RESULTS: FOUND ISSUES IN THE FOLLOWING FILES:")
        for path, issues in results.items():
            print(f"\nFile: {path}")
            for issue in issues:
                print(f"  - {issue}")
    else:
        print("AUDIT COMPLETE: ALL ARCHIVE FILES ARE VALID.")
