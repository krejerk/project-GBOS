# -*- coding: utf-8 -*-
import os
import re
import json

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'

with open(path, 'rb') as f:
    raw_content = f.read().decode('utf-8', errors='replace')

# 1. Global clue removal
clean_content = re.sub(r'\[([^\]]+)\]\(clue:[^\)]+\)', r'\1', raw_content)

# 2. Extract the array part
# We assume it starts with [ and ends with ]; or ] at the end of the file.
match = re.search(r'export const ARCHIVE_DATABASE = (\[.*\]);?', clean_content, re.DOTALL)
if not match:
    print("Could not find array")
    exit(1)

array_str = match.group(1)

# Now, we need to parse this array. Since it might have literal newlines,
# standard json.loads will fail. We need to fix it first.
# We'll replace all literal newlines inside double quotes with \n.
def escape_in_string(m):
    return m.group(0).replace('\n', '\\n').replace('\r', '\\r')

# This regex is a bit simplistic but should work for this file.
fixed_array_str = re.sub(r'"[^"]*"', escape_in_string, array_str, flags=re.DOTALL)

# Now try to parse it
try:
    data = json.loads(fixed_array_str)
except Exception as e:
    print(f"JSON Parse Error: {e}")
    # If it fails, maybe there are single quotes or other things.
    # But let's try to fix common issues.
    exit(1)

# 3. Dump back with correct formatting
# ensure_ascii=False keeps Chinese characters
# indent=4 makes it pretty
# json.dumps will correctly use \n (escaped) for all internal newlines.
new_json = json.dumps(data, indent=4, ensure_ascii=False)

final_ts = f"export const ARCHIVE_DATABASE = {new_json};\n"

with open(path, 'w', encoding='utf-8') as f:
    f.write(final_ts)

print("Scientific repair complete.")
