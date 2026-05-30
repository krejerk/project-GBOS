
import sys

file_path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

# Indentification: 
# Line 1140: </div>
# Line 1141: </div>
# These were likely the ones that closed 984 and 983 too early.

if '</div>' in lines[1139] and '</div>' in lines[1140]:
    print("Removing redundant </div>s at 1140-1141.")
    del lines[1139:1141]
else:
    print(f"Mismatch. Line 1140: {lines[1139].strip()}, Line 1141: {lines[1140].strip()}")
    # sys.exit(1)

with open(file_path, 'w') as f:
    f.writelines(lines)

print("Done.")
