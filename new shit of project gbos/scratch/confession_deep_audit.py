import os
import re

def comprehensive_audit():
    base_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/content/chapters"
    issues = []
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".md") and file.startswith("confession_"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check for frontmatter
                fm_match = re.match(r'^---(.*?)---', content, re.DOTALL)
                if not fm_match:
                    issues.append(f"CRITICAL: {file} has no frontmatter!")
                    continue
                
                fm_text = fm_match.group(1)
                
                # 1. Check if 'revealed:' exists
                if "revealed:" not in fm_text:
                    issues.append(f"METADATA MISSING: {file} has no 'revealed' field.")
                
                # 2. Extract revealed IDs
                revealed_match = re.search(r'revealed:\s*(.*?)(?:\n\w+:|$)', fm_text, re.DOTALL)
                revealed_ids = []
                if revealed_match:
                    revealed_block = revealed_match.group(1)
                    revealed_ids = re.findall(r'-\s+([\w-]+)', revealed_block)
                
                # 3. Extract tags from text
                tags = re.findall(r'\[(.*?)\]\(clue:(.*?)\)', content)
                tag_ids = [t[1] for t in tags]
                
                # 4. Compare
                missing_in_text = [rid for rid in revealed_ids if rid not in tag_ids]
                missing_in_meta = [tid for tid in tag_ids if tid not in revealed_ids]
                
                if missing_in_text:
                    issues.append(f"TAG MISSING: {file} lists {missing_in_text} in metadata but NOT tagged in text.")
                if missing_in_meta:
                    issues.append(f"UNREGISTERED TAG: {file} has tags {missing_in_meta} in text but NOT in metadata.")
                
                # 5. Check for duplicates
                seen = set()
                duplicates = []
                for tid in tag_ids:
                    if tid in seen:
                        duplicates.append(tid)
                    seen.add(tid)
                if duplicates:
                    issues.append(f"DUPLICATE TAG: {file} tags {duplicates} multiple times.")

    return issues

if __name__ == "__main__":
    results = comprehensive_audit()
    if not results:
        print("ALL CONFESSIONS ARE PERFECT.")
    else:
        for issue in results:
            print(issue)
