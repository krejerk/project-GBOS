import re
import os

file_path = "constants/archive_data.ts"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
# Patterns to match string literals that start with Source:, Date:, Headline:, Author:, From:
skip_patterns = [
    re.compile(r'^\s*"Source:\s*'),
    re.compile(r'^\s*"Date:\s*'),
    re.compile(r'^\s*"Headline:\s*'),
    re.compile(r'^\s*"Author:\s*'),
    re.compile(r'^\s*"From:\s*'),
]

for line in lines:
    should_skip = False
    for pat in skip_patterns:
        if pat.search(line):
            should_skip = True
            break
    if not should_skip:
        new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done cleaning archive_data.ts")
