
import re

file_path = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx"

with open(file_path, 'r') as f:
    lines = f.readlines()

div_stack = []
errors = []

# Regex patterns to match EXACTLY what we want
# <div (but not <motion.div)
re_div_open = re.compile(r'<(div)(\s|>)')
re_div_close = re.compile(r'</div\s*>')
re_motion_open = re.compile(r'<motion\.div')
re_motion_close = re.compile(r'</motion\.div>')

for i, line in enumerate(lines):
    line_num = i + 1
    
    # Check for motion.div first to avoid partial matches
    for m in re_motion_open.finditer(line):
        div_stack.append(('motion.div', line_num))
    for m in re_motion_close.finditer(line):
        if not div_stack or div_stack[-1][0] != 'motion.div':
            errors.append(f"Unexpected </motion.div> at line {line_num}")
        else:
            div_stack.pop()
            
    # Now check for regular div
    for m in re_div_open.finditer(line):
        div_stack.append(('div', line_num))
    for m in re_div_close.finditer(line):
        if not div_stack or div_stack[-1][0] != 'div':
            errors.append(f"Unexpected </div> at line {line_num}")
        else:
            div_stack.pop()

print("--- TAG AUDIT REPORT ---")
if errors:
    print("\nERRORS FOUND:")
    for err in errors:
        print(err)
else:
    print("\nNo misplaced closing tags found.")

if div_stack:
    print("\nORPHANED OPENING TAGS (Not closed):")
    for tag, line in div_stack:
        print(f"{tag} opened at line {line}")
else:
    print("\nAll opening tags are balanced.")
