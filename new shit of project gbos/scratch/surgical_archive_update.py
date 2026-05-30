# -*- coding: utf-8 -*-
import os
import re
import json

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'

with open(path, 'rb') as f:
    raw_content = f.read().decode('utf-8', errors='replace')

match = re.search(r'export const ARCHIVE_DATABASE = (\[.*\]);', raw_content, re.DOTALL)
if not match:
    exit(1)

json_str = match.group(1)
def escape_newlines(m):
    return m.group(0).replace('\n', '\\n').replace('\r', '\\r')
fixed_json_str = re.sub(r'"[^"]*"', escape_newlines, json_str, flags=re.DOTALL)
data = json.loads(fixed_json_str)

for item in data:
    if item['id'] == 'clipping_23':
        # ONLY surgical replacements in existing content
        old_file_id = item['annotation']['fileId']
        item['annotation']['fileId'] = "[MTXXXXXXXX-93](clue:MTXXXXXXXX-93)"
        item['annotation']['level'] = "机密 (行为分析组档案)"
        
        content = item['annotation']['content']
        content = content.replace('SV-1983-LOG', '[MTXXXXXXXX-93](clue:MTXXXXXXXX-93)')
        content = content.replace('QTC-VA-0994', '[QTC-VA-0994](clue:QTC-VA-0994)')
        item['annotation']['content'] = content
        
        item['revealed'] = ["MTXXXXXXXX-93", "QTC-VA-0994"]
        break

new_json = json.dumps(data, indent=4, ensure_ascii=False)
final_ts = f"export const ARCHIVE_DATABASE = {new_json};"

with open(path, 'w', encoding='utf-8') as f:
    f.write(final_ts)

print("Archive database surgically updated.")
