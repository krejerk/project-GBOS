import os
import re

def audit_confessions():
    confession_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/content/chapters"
    report = []
    
    for root, dirs, files in os.walk(confession_dir):
        for file in files:
            if file.endswith(".md") and file.startswith("confession_"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract frontmatter block
                fm_match = re.match(r'^---(.*?)---', content, re.DOTALL)
                if not fm_match:
                    continue
                
                fm_text = fm_match.group(1)
                
                # Extract revealed list using regex
                revealed_match = re.search(r'revealed:\s*(.*?)(?:\n\w+:|$)', fm_text, re.DOTALL)
                revealed_ids = []
                if revealed_match:
                    revealed_block = revealed_match.group(1)
                    # Match both "- id" and "- id: name" formats
                    revealed_ids = re.findall(r'-\s+([\w-]+)', revealed_block)

                # Find tags in text: [text](clue:id)
                tags = re.findall(r'\[(.*?)\]\(clue:(.*?)\)', content)
                tag_ids = [t[1] for t in tags]
                
                # Check for mismatches
                missing_tags = [rid for rid in revealed_ids if rid not in tag_ids]
                unauthorized_tags = [tid for tid in tag_ids if tid not in revealed_ids]
                
                # Check for duplicates (first-occurrence rule violation)
                duplicates = []
                seen = set()
                for tid in tag_ids:
                    if tid in seen:
                        duplicates.append(tid)
                    seen.add(tid)

                if missing_tags or unauthorized_tags or duplicates:
                    report.append({
                        "file": file,
                        "path": path,
                        "revealed": revealed_ids,
                        "missing": missing_tags,
                        "unauthorized": unauthorized_tags,
                        "duplicates": duplicates
                    })

    return report

if __name__ == "__main__":
    results = audit_confessions()
    if not results:
        print("ALL CONFESSIONS SYNCED.")
    else:
        for r in results:
            print(f"File: {r['file']}")
            if r['missing']: print(f"  Missing tags (In Revealed but not in Text): {r['missing']}")
            if r['unauthorized']: print(f"  Unauthorized tags (In Text but not in Revealed): {r['unauthorized']}")
            if r['duplicates']: print(f"  Duplicate tags (Violation of First-Occurrence): {r['duplicates']}")
            print("-" * 20)
