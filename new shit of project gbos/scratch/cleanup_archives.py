# -*- coding: utf-8 -*-
import os
import re
import json

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'

with open(path, 'rb') as f:
    raw_content = f.read().decode('utf-8', errors='replace')

# 1. First, remove ALL [Text](clue:id) markers globally.
clean_content = re.sub(r'\[([^\]]+)\]\(clue:[^\)]+\)', r'\1', raw_content)

# 2. Fix the \\n (double escaped) to \n (escaped)
clean_content = clean_content.replace('\\\\n', '\\n')

# 3. Now, we MUST fix literal newlines inside strings.
# We'll do this by finding all strings and escaping newlines within them.
# The regex r'"(.*?)"' with re.DOTALL will find all double-quoted strings.
def fix_string(match):
    s = match.group(0)
    # Escape literal newlines within the string
    return s.replace('\n', '\\n')

# We use a non-greedy match for strings to avoid matching from the start of one string to the end of another.
final_content = re.sub(r'"(.*?)"', fix_string, clean_content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Final cleanup and escaping complete.")
