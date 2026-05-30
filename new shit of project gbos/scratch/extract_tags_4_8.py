import os
import re

def extract_all_confession_tags():
    base_dir = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/content/chapters"
    all_tags = {}
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".md") and file.startswith("confession_"):
                # Extract number for sorting
                num_match = re.search(r'confession_(\d+)', file)
                if not num_match: continue
                num = int(num_match.group(1))
                
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Find tags in order of appearance
                tags = re.findall(r'\[(.*?)\]\(clue:(.*?)\)', content)
                tag_list = [f"{t[1]} ({t[0]})" for t in tags]
                all_tags[num] = tag_list

    return all_tags

if __name__ == "__main__":
    results = extract_all_confession_tags()
    for num in sorted(results.keys()):
        if num >= 12 and num <= 33:
            print(f"Confession {num}: {', '.join(results[num]) if results[num] else '[无打标]'}")
