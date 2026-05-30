import os
import re

def extract_md_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split frontmatter and body
    parts = re.split(r'^---$', content, flags=re.MULTILINE)
    if len(parts) < 3:
        return None
    
    frontmatter = parts[1]
    body = parts[2]
    
    # Extract sections (SURFACE, DEEP, CORE)
    sections = {}
    current_section = None
    lines = body.split('\n')
    for line in lines:
        if line.startswith('# SURFACE'):
            current_section = 'surface'
            sections[current_section] = []
        elif line.startswith('# DEEP'):
            current_section = 'deep'
            sections[current_section] = []
        elif line.startswith('# CORE'):
            current_section = 'core'
            sections[current_section] = []
        elif current_section:
            sections[current_section].append(line)
            
    for k in sections:
        sections[k] = '\n'.join(sections[k]).strip().replace('"', '\\"').replace('\n', '\\n')
        
    # Extract metadata keywords
    revealed = []
    rev_match = re.search(r'revealed[：:]\s*\n((?:\s*- .*\n?)+)', frontmatter)
    if not rev_match:
        # Try finding trigger keywords
        rev_match = re.search(r'trigger_persons: \[(.*)\]', frontmatter)
        if rev_match:
            revealed.extend([x.strip().strip('"').strip("'") for x in rev_match.group(1).split(',')])
    else:
        revealed.extend([line.strip().strip('- ').strip() for line in rev_match.group(1).strip().split('\n')])

    # Extract ID
    id_match = re.search(r'id:\s*(\w+)', frontmatter)
    node_id = id_match.group(1) if id_match else None
    
    return {
        'id': node_id,
        'sections': sections,
        'revealed': revealed
    }

def sync_chapter(chapter_num, project_root):
    ts_path = os.path.join(project_root, f'constants/chapters/chapter{chapter_num}.ts')
    md_dir = os.path.join(project_root, f'content/chapters/chapter{chapter_num}')
    
    if not os.path.exists(ts_path) or not os.path.exists(md_dir):
        return
        
    with open(ts_path, 'r', encoding='utf-8') as f:
        ts_content = f.read()
        
    for md_file in os.listdir(md_dir):
        if not md_file.endswith('.md'):
            continue
        
        md_data = extract_md_content(os.path.join(md_dir, md_file))
        if not md_data:
            continue
            
        node_id = md_data['id']
        
        # Only sync 20-23 as requested
        if node_id not in ["confession_20", "confession_21", "confession_22", "confession_23"]:
            continue
        
        # Sync layers in TS
        for layer in ['surface', 'deep', 'core']:
            if layer.upper() in ts_content and node_id in ts_content:
                # This is a bit regex heavy, let's find the node block
                node_pattern = rf'id:\s*"{node_id}".*?layers:\s*\{{(.*?)\}}'
                node_match = re.search(node_pattern, ts_content, re.DOTALL)
                if node_match:
                    layers_block = node_match.group(1)
                    layer_key = f'MemoryLayer.{layer.upper()}'
                    layer_pattern = rf'\[{layer_key}\]:\s*\{{\s*event:\s*".*?",'
                    layer_match = re.search(layer_pattern, layers_block, re.DOTALL)
                    if layer_match:
                        replacement = f'[{layer_key}]: {{ event: "{md_data["sections"].get(layer, "")}",'
                        ts_content = ts_content.replace(node_match.group(0), node_match.group(0).replace(layer_match.group(0), replacement))

        # Sync revealedKeywords in TS
        rev_pattern = rf'id:\s*"{node_id}".*?revealedKeywords:\s*\[(.*?)\]'
        rev_match = re.search(rev_pattern, ts_content, re.DOTALL)
        if rev_match:
            new_revealed = ", ". join([f'"{k}"' for k in md_data['revealed']])
            ts_content = ts_content.replace(rev_match.group(0), rev_match.group(0).replace(rev_match.group(1), new_revealed))

    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)

# Main work
root = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos"
sync_chapter(6, root)
print("Done syncing chapter 6.")
