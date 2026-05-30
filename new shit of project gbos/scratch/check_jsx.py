
import re

file_path = 'components/Archives.tsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    # Very crude regex to find JSX tags
    # Matches <div, <motion.div, </div, </motion.div, <>, </>
    tags = re.findall(r'<(div|motion\.div|AnimatePresence|motion\.img|button|span|svg|path|circle|text|h2|p|rect|/div|/motion\.div|/AnimatePresence|/motion\.img|/button|/span|/svg|/path|/circle|/text|/h2|/p|/rect|/|)>', line)
    
    for tag in tags:
        if tag == '': # Opening fragment <>
            stack.append(('<>', i+1))
        elif tag == '/': # Closing fragment </>
            if stack and stack[-1][0] == '<>':
                stack.pop()
            else:
                print(f"Error: </> at line {i+1} has no match. Top of stack: {stack[-1] if stack else 'None'}")
        elif tag.startswith('/'): # Closing tag </...
            t = tag[1:]
            if stack and stack[-1][0] == t:
                stack.pop()
            else:
                print(f"Error: </{t}> at line {i+1} has no match. Top of stack: {stack[-1] if stack else 'None'}")
        else: # Opening tag <...
            # Ignore self-closing tags (crudely)
            if not line.strip().endswith('/>') and not '/>' in line[line.find('<'+tag):]:
                stack.append((tag, i+1))

print("\nFinal stack (should be empty):")
for s in stack:
    print(s)
