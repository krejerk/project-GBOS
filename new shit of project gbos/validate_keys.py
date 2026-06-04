import os
import re

content_dir = 'content/chapters'
registry_file = 'constants/registry.ts'

# 1. Parse UNLOCKS_REGISTRY from registry.ts
with open(registry_file, 'r', encoding='utf-8') as f:
    registry_content = f.read()

registry_map = {}
pattern = re.compile(r'"([^"]+)":\s*\{\s*"keywords":\s*\[(.*?)\]', re.DOTALL)
for match in pattern.finditer(registry_content):
    target_id = match.group(1)
    keywords_raw = match.group(2)
    keywords = re.findall(r'"([^"]+)"', keywords_raw)
    registry_map[target_id] = keywords

print(f"Parsed {len(registry_map)} entries from registry.ts")

# 2. Parse Markdown files
md_triggers = {}

for root, _, files in os.walk(content_dir):
    for file in files:
        if file.endswith('.md'):
            with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                content = f.read()
                
            frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
            if frontmatter_match:
                fm_text = frontmatter_match.group(1)
                
                # Extract ID
                id_match = re.search(r'^id:\s*([^\s]+)', fm_text, re.MULTILINE)
                if not id_match:
                    continue
                md_id = id_match.group(1)
                
                # Extract trigger block
                trigger_match = re.search(r'^trigger:\s*\n((?:^[- \t]+[^\n]*\n?)*)', fm_text, re.MULTILINE)
                if trigger_match:
                    trigger_block = trigger_match.group(1)
                    # Find all items starting with -
                    items = re.findall(r'-\s*([^\s]+)', trigger_block)
                    md_triggers[md_id] = items
                else:
                    md_triggers[md_id] = []

errors = 0
for target_id, reg_keywords in registry_map.items():
    if target_id in md_triggers:
        md_keywords = md_triggers[target_id]
        if set(reg_keywords) != set(md_keywords):
            print(f"Mismatch for {target_id}:")
            print(f"  registry.ts : {reg_keywords}")
            print(f"  markdown    : {md_keywords}")
            errors += 1

if errors == 0:
    print("All triggers match perfectly between registry and markdown!")

