# -*- coding: utf-8 -*-
import os
import re

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'

with open(path, 'rb') as f:
    content = f.read().decode('utf-8', errors='replace')

# 1. Remove [Text](clue:id) -> Text
content = re.sub(r'\[([^\]]+)\]\(clue:[^\)]+\)', r'\1', content)

# 2. Fix the \\n issue. We want single-escaped \n.
# We'll replace all instances of \\n with \n. 
# In Python, to represent the literal \n (two chars) in a string, we use '\\n'.
# To represent the literal \\n (four chars), we use '\\\\n'.
content = content.replace('\\\\n', '\\n')

# 3. Fix literal newlines in double-quoted strings
# This regex finds double-quoted strings and handles newlines within them.
def escape_newlines(match):
    s = match.group(0)
    # Replace literal newline with \n (the characters \ and n)
    return s.replace('\n', '\\n').replace('\r', '\\r')

# Match double-quoted strings, non-greedy, allowing across multiple lines
content = re.sub(r'"(.*?)"', escape_newlines, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Final cleanup successful.")
