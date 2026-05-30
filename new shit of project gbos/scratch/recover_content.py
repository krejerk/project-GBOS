import re
import json

def extract_v3():
    files = ['../dump_near_dc1967.txt', '../archives_extended_dump.txt', '../arthur_dawson_dump.txt']
    
    keywords = {
        "clipping_08": "致命疏忽",
        "clipping_09": "军械库",
        "clipping_10": "威士忌",
        "clipping_14": "德克萨卡纳",
        "clipping_15": "沙丘公园",
        "clipping_16": "费城酒吧",
        "clipping_20": "血色迷幻"
    }
    
    results = {}
    
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            for cid, kw in keywords.items():
                if results.get(cid): continue # Already found
                
                title_pos = content.find(kw)
                if title_pos != -1:
                    # Search for the annotation content after this title
                    # Look for content:`...`
                    match = re.search(r'annotation:\{.*?content:`(.*?)`', content[title_pos:title_pos+5000], re.DOTALL)
                    if match:
                        text = match.group(1).replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
                        # Only accept if it contains clue tags
                        if '(clue:' in text:
                            results[cid] = text
                        else:
                            # If no clue tags, save it as a candidate but keep searching
                            if not results.get(cid):
                                results[cid] = "Candidate (No Clues): " + text[:100] + "..."
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    with open('scratch/final_recovery.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    extract_v3()
