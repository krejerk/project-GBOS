import re

with open('constants/archive_data.ts', 'r', encoding='utf-8') as f:
    archive_content = f.read()
ids_in_archive = re.findall(r'"id": "(clipping_[0-9]+)"', archive_content)

with open('constants/registry.ts', 'r', encoding='utf-8') as f:
    registry_content = f.read()
ids_in_registry = re.findall(r'"targetId": "(clipping_[0-9]+)"', registry_content)

missing = set(ids_in_archive) - set(ids_in_registry)
print(f"Missing in registry: {sorted(list(missing))}")
