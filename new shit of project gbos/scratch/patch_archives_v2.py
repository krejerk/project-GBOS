
import sys

file_path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

# Remove lines 1147, 1148, 1149 (1-indexed: 1147-1149)
# In 0-indexed list, these are 1146, 1147, 1148.
# But wait, I should verify the content of these lines first.

if '1147:                                                                         </>' in f"{1147}: {lines[1146]}":
    print("Verification successful. Removing lines 1147-1149.")
    del lines[1146:1149]
else:
    print(f"Verification failed. Line 1147 is: {lines[1146]}")
    sys.exit(1)

with open(file_path, 'w') as f:
    f.writelines(lines)

print("Done.")
