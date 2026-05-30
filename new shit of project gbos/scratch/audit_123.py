import os
import re

def detailed_audit_chapters_1_3():
    base_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/content/chapters"
    chapters = ["chapter1", "chapter2", "chapter3"]
    report = []
    
    for chap in chapters:
        chap_path = os.path.join(base_dir, chap)
        if not os.path.exists(chap_path): continue
        
        for file in sorted(os.listdir(chap_path)):
            if file.endswith(".md") and file.startswith("confession_"):
                path = os.path.join(chap_path, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                fm_match = re.match(r'^---(.*?)---', content, re.DOTALL)
                if not fm_match: continue
                
                fm_text = fm_match.group(1)
                revealed_match = re.search(r'revealed:\s*(.*?)(?:\n\w+:|$)', fm_text, re.DOTALL)
                revealed_ids = []
                if revealed_match:
                    revealed_block = revealed_match.group(1)
                    revealed_ids = re.findall(r'-\s+([\w-]+)', revealed_block)
                
                tags = re.findall(r'\[(.*?)\]\(clue:(.*?)\)', content)
                tag_ids = [t[1] for t in tags]
                
                # Check 1: Meta lists it, but Text doesn't have it
                missing_in_text = [rid for rid in revealed_ids if rid not in tag_ids]
                # Check 2: Text has it, but Meta doesn't list it
                missing_in_meta = [tid for tid in tag_ids if tid not in revealed_ids]
                
                if missing_in_text or missing_in_meta:
                    report.append({
                        "file": file,
                        "revealed_in_meta": revealed_ids,
                        "tags_in_text": tag_ids,
                        "missing_tags": missing_in_text,
                        "unregistered_tags": missing_in_meta
                    })
    return report

if __name__ == "__main__":
    results = detailed_audit_chapters_1_3()
    if not results:
        print("Chapters 1-3: Meta and Tags are perfectly in sync.")
    else:
        for r in results:
            print(f"File: {r['file']}")
            if r['missing_tags']: print(f"  Missing Tags: {r['missing_tags']}")
            if r['unregistered_tags']: print(f"  Unregistered Tags: {r['unregistered_tags']}")
