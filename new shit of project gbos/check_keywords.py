import os
import yaml

keywords_file = "content/metadata/keywords.md"
defined_keywords = set()
with open(keywords_file, "r") as f:
    for line in f:
        if line.startswith("|") and not "关键词(ID)" in line and not "---" in line:
            parts = [p.strip() for p in line.split("|")]
            if len(parts) > 2:
                defined_keywords.add(parts[1])

used_keywords = set()
for root, dirs, files in os.walk("content"):
    for file in files:
        if file.endswith(".md") and "keywords.md" not in file:
            path = os.path.join(root, file)
            with open(path, "r") as f:
                content = f.read()
                if "---" in content:
                    frontmatter = content.split("---")[1]
                    try:
                        data = yaml.safe_load(frontmatter)
                        if data and isinstance(data, dict):
                            for key in ["trigger", "revealed", "trigger_persons"]:
                                if key in data and isinstance(data[key], list):
                                    for item in data[key]:
                                        used_keywords.add(item)
                    except Exception as e:
                        print("Error parsing", path, e)

missing = used_keywords - defined_keywords
print("Missing keywords:")
for m in sorted(list(missing)):
    print(m)
