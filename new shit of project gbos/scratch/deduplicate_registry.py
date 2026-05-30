import sys
import re

def deduplicate_map(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    start_line = -1
    for i, line in enumerate(lines):
        if 'export const GLOBAL_KEYWORD_MAP' in line:
            start_line = i
            break
    
    if start_line == -1:
        print("Could not find GLOBAL_KEYWORD_MAP")
        return

    # Extract the map part
    map_lines = lines[start_line:]
    
    # Simple regex to find keys like "key": {
    # We want to keep track of seen keys
    seen_keys = set()
    new_lines = []
    
    # We copy lines before the map
    result = lines[:start_line]
    
    # Skip until we find the first key
    i = 0
    while i < len(map_lines):
        line = map_lines[i]
        match = re.search(r'^\s+"([^"]+)":\s*{', line)
        if match:
            key = match.group(1)
            if key in seen_keys:
                print(f"Skipping duplicate key: {key}")
                # Skip this block
                i += 1
                while i < len(map_lines) and not re.search(r'^\s+},', map_lines[i]):
                    i += 1
                i += 1 # skip the }, line
                continue
            else:
                seen_keys.add(key)
                new_lines.append(line)
        else:
            new_lines.append(line)
        i += 1
        
    result.extend(new_lines)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(result)

if __name__ == "__main__":
    deduplicate_map(sys.argv[1])
