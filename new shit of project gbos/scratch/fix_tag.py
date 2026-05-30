import os

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the incorrect </motion.img> with />
target = '</motion.img>'
if target in content:
    content = content.replace(target, '/>')
    print("Successfully replaced </motion.img> with />")
else:
    # Try with possible whitespace differences
    import re
    new_content, count = re.subn(r'\s*</motion\.img>', ' />', content)
    if count > 0:
        content = new_content
        print(f"Successfully replaced using regex: {count} times")
    else:
        print("Target not found in file")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
