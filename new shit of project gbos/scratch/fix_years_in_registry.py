import re

path = 'constants/registry.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find years as strings in keywords arrays
# e.g. "1967", "1977"
# We exclude "id": "1967" etc.
# We look for years that are NOT preceded by "id": or "year_" and are not in a key position like "1967": {

def replace_year(match):
    year = match.group(1)
    # Check if it's already prefixed
    if year.startswith('year_'):
        return match.group(0)
    return f'"{year}"'.replace(f'"{year}"', f'"year_{year}"')

# More specific regex: find strings consisting only of 4 digits, inside quotes, 
# that are NOT keys (followed by :) and NOT preceded by "id":
# And are likely in a list
new_content = re.sub(r'(?<!id": )(?<!year_)"(19[0-9]{2})"(?!:)', r'"year_\1"', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated years in registry.ts")
