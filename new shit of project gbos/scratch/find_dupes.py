
import re

file_path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/registry.ts'
with open(file_path, 'r') as f:
    content = f.read()

# Extract GLOBAL_KEYWORD_MAP content
match = re.search(r'export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = \{(.*?)\};', content, re.DOTALL)
if match:
    map_content = match.group(1)
    keys = re.findall(r'"(.*?)"\s*:', map_content)
    seen = set()
    dupes = []
    for k in keys:
        if k in seen:
            dupes.append(k)
        seen.add(k)
    print(f"Duplicates found: {dupes}")
else:
    print("GLOBAL_KEYWORD_MAP not found")
