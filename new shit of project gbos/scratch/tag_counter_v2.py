
import re

file_path = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx"

with open(file_path, 'r') as f:
    lines = f.readlines()

div_stack = []
errors = []

# Improved regex to handle self-closing tags and specific tag names
# Matches <div ... > but NOT <div ... />
re_div_open = re.compile(r'<(div)(\s+[^>]*?|(?=>))(?!/>)>')
re_div_close = re.compile(r'</div\s*>')
re_motion_open = re.compile(r'<motion\.div(\s+[^>]*?|(?=>))(?!/>)>')
re_motion_close = re.compile(r'</motion\.div>')

for i, line in enumerate(lines):
    line_num = i + 1
    
    # We must process tags in the order they appear in the line
    # A simple way is to find all tag positions and sort them
    tags_in_line = []
    for m in re_motion_open.finditer(line): tags_in_line.append((m.start(), 'motion.open', line_num))
    for m in re_motion_close.finditer(line): tags_in_line.append((m.start(), 'motion.close', line_num))
    for m in re_div_open.finditer(line): tags_in_line.append((m.start(), 'div.open', line_num))
    for m in re_div_close.finditer(line): tags_in_line.append((m.start(), 'div.close', line_num))
    
    tags_in_line.sort()
    
    for pos, type, ln in tags_in_line:
        if type == 'div.open':
            div_stack.append(('div', ln))
        elif type == 'div.close':
            if not div_stack:
                errors.append(f"Unexpected </div> at line {ln}")
            elif div_stack[-1][0] != 'div':
                errors.append(f"Unexpected </div> at line {ln} (expected closure for {div_stack[-1][0]} from line {div_stack[-1][1]})")
            else:
                div_stack.pop()
        elif type == 'motion.open':
            div_stack.append(('motion.div', ln))
        elif type == 'motion.close':
            if not div_stack:
                errors.append(f"Unexpected </motion.div> at line {ln}")
            elif div_stack[-1][0] != 'motion.div':
                errors.append(f"Unexpected </motion.div> at line {ln} (expected closure for {div_stack[-1][0]} from line {div_stack[-1][1]})")
            else:
                div_stack.pop()

print("--- IMPROVED TAG AUDIT REPORT ---")
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
