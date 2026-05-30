import os
import re

def extract_data_from_md(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    clues_in_text = re.findall(r'\[.*?\]\(clue:(.*?)\)', content)
    return set(clues_in_text)

for dirname in ['chapters', 'archives']:
    md_dir = f'content/{dirname}/chapter8'
    if not os.path.exists(md_dir): continue
    for filename in sorted(os.listdir(md_dir)):
        if not filename.endswith('.md'): continue
        md_path = os.path.join(md_dir, filename)
        clues = extract_data_from_md(md_path)
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
        frontmatter = re.search(r'^---(.*?)---', content, re.DOTALL | re.MULTILINE)
        revealed_match = re.search(r'revealed:\n((?:  - .*\n)*)', frontmatter.group(1)) if frontmatter else None
        revealed_list = []
        if revealed_match:
            lines = revealed_match.group(1).strip().split('\n')
            revealed_list = [line.replace('- ', '').strip() for line in lines if line.strip()]
        revealed_set = set(revealed_list)
        print(f"{filename}: Text Clues: {clues}, Frontmatter: {revealed_set}")
