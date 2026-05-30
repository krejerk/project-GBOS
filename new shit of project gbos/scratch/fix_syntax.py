# -*- coding: utf-8 -*-
import os

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the missing bracket for clipping_22 content
content = content.replace('"content": \n                "【图森先驱报】', '"content": [\n                "【图森先驱报】')

# Fix the broken clue in clipping_22
# The text was: 图森市郊的[第4警务站。
# It should be: 图森市郊的第4警务站。
content = content.replace('图森市郊的[第4警务站。', '图森市郊的第4警务站。')

# Check if there are other missing opening brackets
# A common pattern would be "content": followed by a string instead of [
# But let's look for '"content": \n                "'
content = content.replace('"content": \n                "', '"content": [\n                "')

# Fix any other unclosed brackets from the regex fail
# If we have [ followed by some text and no ]
# But that's harder to find. Let's just fix the known one.

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Manual fix complete.")
