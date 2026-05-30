import os
import re

mapping = {
    'me_1971': 'clipping_01',
    'oh_1968': 'clipping_02',
    'dc_1967': 'clipping_03',
    'il_1985': 'clipping_04',
    'nv_1971': 'clipping_05',
    'va_1972': 'clipping_06',
    'cin_1973': 'clipping_07',
    'nas_1973': 'clipping_08',
    'ky_1973': 'clipping_09',
    'sf_1976': 'clipping_10',
    'kan_1976': 'clipping_11',
    'kc_1965': 'clipping_12',
    'ia_1976': 'clipping_13',
    'archive_15': 'clipping_14',
    'archive_16': 'clipping_15',
    'va_1990': 'clipping_16',
    'archive_18': 'clipping_17',
    'archive_19': 'clipping_18',
    'frank_rollins_report': 'clipping_19',
    'archive_felipe': 'clipping_20',
    'libby_1967': 'clipping_21',
    'confession_30': 'clipping_22'
}

# Directories to process
content_dirs = [
    'content/chapters',
    'content/archives',
    'content/metadata'
]
app_file = 'App.tsx'

def replace_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old_id, new_id in mapping.items():
        # Match ID in frontmatter or in clue: links
        # Regex to match the ID specifically in contexts like id: me_1971 or (clue:me_1971)
        # We also need to be careful with keywords.md ID column which is | ID |
        content = re.sub(r'(\b)' + re.escape(old_id) + r'(\b)', r'\1' + new_id + r'\2', content)
        
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

# Process content directories
for cdir in content_dirs:
    for root, dirs, files in os.walk(cdir):
        for f in files:
            if f.endswith('.md'):
                replace_in_file(os.path.join(root, f))

# Process App.tsx
if os.path.exists(app_file):
    replace_in_file(app_file)
