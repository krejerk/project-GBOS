#!/usr/bin/env python3
"""
Image Audit Script for Project GBOS
Checks every image in public/images/ to see:
1. Whether it's referenced in any source file (TS/TSX)
2. Whether that reference includes a caption (alt text / caption field / label)
"""

import os
import re
import sys

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(PROJECT_ROOT, "public", "images")

# Source directories to scan
SOURCE_DIRS = [
    os.path.join(PROJECT_ROOT, "components"),
    os.path.join(PROJECT_ROOT, "constants"),
    os.path.join(PROJECT_ROOT, "utils"),
    os.path.join(PROJECT_ROOT, "App.tsx"),
]
SOURCE_EXTS = {".ts", ".tsx"}

# Known background/avatar images that don't need to be linked to documents
EXEMPT_IMAGES = {
    "aged_photo_card_texture.png",   # texture
    "capone-split-personality.jpg",  # protagonist avatar
    "fbi-symbol.png",               # UI element
    "signature.png",                # UI signature element
    "reference_locket_base.png",    # UI element
}

def collect_images():
    images = set()
    for f in os.listdir(IMAGES_DIR):
        if os.path.isfile(os.path.join(IMAGES_DIR, f)):
            if not f.startswith("."):
                images.add(f)
    return images

def collect_source_files():
    files = []
    for source in SOURCE_DIRS:
        if os.path.isfile(source):
            files.append(source)
        elif os.path.isdir(source):
            for root, dirs, filenames in os.walk(source):
                dirs[:] = [d for d in dirs if d not in {"node_modules", "dist", ".git"}]
                for fn in filenames:
                    if os.path.splitext(fn)[1] in SOURCE_EXTS:
                        files.append(os.path.join(root, fn))
    return files

def read_file(path):
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except Exception as e:
        print(f"  [WARN] Cannot read {path}: {e}", file=sys.stderr)
        return ""

def find_image_contexts(content, img_filename, filepath):
    """
    Find all occurrences of the image filename in the file content.
    For each occurrence, extract surrounding context (~5 lines) and
    check if a caption is present.
    """
    results = []
    lines = content.splitlines()
    
    for i, line in enumerate(lines):
        if img_filename in line:
            # Get context window (5 lines before and after)
            start = max(0, i - 5)
            end = min(len(lines), i + 6)
            context = lines[start:end]
            context_str = "\n".join(context)
            
            # Check for caption patterns:
            has_caption = False
            caption_text = None
            
            # Pattern 1: caption: "..." field (ClueLibrary style)
            m = re.search(r'caption\s*:\s*["`\']([^`\'"]+)[`\'"]\s*,?', context_str)
            if m:
                has_caption = True
                caption_text = m.group(1).strip()
            
            # Pattern 2: alt text in JSX <img alt="..." />
            if not has_caption:
                m = re.search(r'alt\s*=\s*["{`]([^"}`]+)["`}]', context_str)
                if m:
                    has_caption = True
                    caption_text = f'[alt] {m.group(1).strip()}'
            
            # Pattern 3: label: "..." field
            if not has_caption:
                m = re.search(r'label\s*:\s*["`\']([^`\'"]+)[`\'"]\s*,?', context_str)
                if m:
                    has_caption = True
                    caption_text = f'[label] {m.group(1).strip()}'
                    
            # Pattern 4: title: "..." field near image
            if not has_caption:
                m = re.search(r'title\s*:\s*["`\']([^`\'"]+)[`\'"]\s*,?', context_str)
                if m:
                    has_caption = True
                    caption_text = f'[title] {m.group(1).strip()}'

            rel_path = os.path.relpath(filepath, PROJECT_ROOT)
            results.append({
                "file": rel_path,
                "line": i + 1,
                "has_caption": has_caption,
                "caption_text": caption_text,
                "context": context_str,
            })
    
    return results

def main():
    images = collect_images()
    source_files = collect_source_files()
    
    print(f"Found {len(images)} images in public/images/")
    print(f"Scanning {len(source_files)} source files...\n")
    
    # Build a map: image_filename -> list of references
    image_refs = {img: [] for img in images}
    
    file_contents = {}
    for sf in source_files:
        content = read_file(sf)
        file_contents[sf] = content
    
    for img in images:
        for sf, content in file_contents.items():
            if img in content:
                refs = find_image_contexts(content, img, sf)
                image_refs[img].extend(refs)
    
    # --- Categorize ---
    exempt = []
    referenced_with_caption = []
    referenced_no_caption = []
    not_referenced = []
    
    for img in sorted(images):
        if img in EXEMPT_IMAGES:
            exempt.append(img)
            continue
        
        refs = image_refs[img]
        if not refs:
            not_referenced.append(img)
        else:
            any_caption = any(r["has_caption"] for r in refs)
            if any_caption:
                referenced_with_caption.append((img, refs))
            else:
                referenced_no_caption.append((img, refs))
    
    # --- Report ---
    print("=" * 70)
    print("AUDIT REPORT: Image Association & Caption Check")
    print("=" * 70)
    
    print(f"\n✅ EXEMPT (backgrounds/avatars/UI): {len(exempt)}")
    for img in exempt:
        print(f"   - {img}")
    
    print(f"\n✅ REFERENCED WITH CAPTION: {len(referenced_with_caption)}")
    for img, refs in referenced_with_caption:
        captions = [r["caption_text"] for r in refs if r["has_caption"]]
        files = list(set(r["file"] for r in refs))
        print(f"   - {img}")
        print(f"       文件: {', '.join(files)}")
        print(f"       图注: {captions[0]}")
    
    print(f"\n⚠️  REFERENCED BUT NO CAPTION: {len(referenced_no_caption)}")
    for img, refs in referenced_no_caption:
        files = list(set(r["file"] for r in refs))
        print(f"   - {img}")
        print(f"       文件: {', '.join(files)}")
        # Show a snippet of the usage context
        for r in refs[:1]:
            snippet = r["context"].strip().replace("\n", " | ")[:120]
            print(f"       上下文: {snippet}")
    
    print(f"\n❌ NOT REFERENCED IN ANY SOURCE FILE: {len(not_referenced)}")
    for img in not_referenced:
        print(f"   - {img}")
    
    print("\n" + "=" * 70)
    print(f"SUMMARY:")
    print(f"  Total images:              {len(images)}")
    print(f"  Exempt:                    {len(exempt)}")
    print(f"  Referenced + has caption:  {len(referenced_with_caption)}")
    print(f"  Referenced, NO caption:    {len(referenced_no_caption)}")
    print(f"  Not referenced at all:     {len(not_referenced)}")
    print("=" * 70)

if __name__ == "__main__":
    main()
