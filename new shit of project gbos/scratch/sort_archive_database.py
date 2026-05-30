import re
import json

path = 'constants/archive_data.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of the array
match = re.search(r'export const ARCHIVE_DATABASE = \[(.*?) \];', content, re.DOTALL)
if not match:
    # Try another pattern
    match = re.search(r'export const ARCHIVE_DATABASE = \[(.*?)\];', content, re.DOTALL)

if match:
    array_content = match.group(1)
    # This is tricky because it's TypeScript/JS, not pure JSON.
    # But since it's a list of objects, we can split by }, {
    # Or just use regex to find each object
    objects = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', array_content, re.DOTALL)
    
    def get_id(obj):
        id_match = re.search(r'"id": "(clipping_[0-9]+)"', obj)
        if id_match:
            return id_match.group(1)
        return ""

    sorted_objects = sorted(objects, key=get_id)
    
    new_array_content = ',\n    '.join(sorted_objects)
    new_content = content[:match.start(1)] + new_array_content + content[match.end(1):]
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Sorted ARCHIVE_DATABASE by ID")
else:
    print("Could not find ARCHIVE_DATABASE array")
