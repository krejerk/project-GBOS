# -*- coding: utf-8 -*-
import os
import re

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/content/archives/chapter8/clipping_23.md'

with open(path, 'rb') as f:
    lines = f.read().decode('utf-8', errors='replace').splitlines()

# Surgical replacements in the frontmatter
new_lines = []
for line in lines:
    if line.startswith('annotation_fileId:'):
        new_lines.append('annotation_fileId: "MTXXXXXXXX-93"')
    elif line.startswith('annotation_level:'):
        new_lines.append('annotation_level: "机密 (行为分析组档案)"')
    elif line.startswith('revealed:'):
        new_lines.append('revealed:')
        new_lines.append('  - MTXXXXXXXX-93')
        new_lines.append('  - QTC-VA-0994')
        # Skip the next few lines if they were the old revealed words
        continue 
    elif line.strip() in ['- holy_springs', '- wanted_poster', '- SV-1983-LOG']:
        continue
    else:
        # Text replacements in the content
        line = line.replace('SV-1983-LOG', '[MTXXXXXXXX-93](clue:MTXXXXXXXX-93)')
        line = line.replace('QTC-VA-0994', '[QTC-VA-0994](clue:QTC-VA-0994)')
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print("Surgical update complete.")
