
import os

file_path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx'
with open(file_path, 'r') as f:
    lines = f.readlines()

# Target corrupted lines with EXACT spacing from cat -e
target_block = [
    ' ' * 80 + 'opacity="0.6"\n',
    ' ' * 81 + ')}\n',
    ' ' * 60 + '</div>\n'
]

replacement_block = [
    ' ' * 81 + 'opacity="0.6"\n',
    ' ' * 77 + '/>\n',
    ' ' * 77 + '<text x="70" y="70" fontFamily="serif" fontSize="12" fill="currentColor" opacity="0.8" className="tracking-widest rotate-6">Reggie</text>\n',
    ' ' * 73 + '</svg>\n',
    ' ' * 73 + '<div className="text-[10px] text-[#c85a3f]/60 font-mono text-center mt-1 tracking-widest uppercase">Verified</div>\n',
    ' ' * 69 + '</div>\n',
    ' ' * 65 + ')}\n',
    ' ' * 61 + '</div>\n'
]

# Find the block
found = False
for i in range(len(lines) - len(target_block) + 1):
    if lines[i:i+len(target_block)] == target_block:
        lines[i:i+len(target_block)] = replacement_block
        found = True
        break

if found:
    with open(file_path, 'w') as f:
        f.writelines(lines)
    print("Successfully patched Archives.tsx")
else:
    print("Could not find the target block")
    # Debug: print first few chars of lines[1346:1349]
    if len(lines) > 1348:
        print(f"Line 1347 length: {len(lines[1346])}, start: '{lines[1346][:5]}', end: '{lines[1346][-10:]}'")
        print(f"Line 1348 length: {len(lines[1347])}, start: '{lines[1347][:5]}', end: '{lines[1347][-10:]}'")
        print(f"Line 1349 length: {len(lines[1348])}, start: '{lines[1348][:5]}', end: '{lines[1348][-10:]}'")
