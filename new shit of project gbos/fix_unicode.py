import re
import codecs

with open('constants/registry.ts', 'r', encoding='utf-8') as f:
    text = f.read()

def unescape(m):
    escaped_str = m.group(1)
    decoded = codecs.decode(escaped_str, 'unicode_escape')
    return '"' + decoded + '":'

new_text = re.sub(r'"(\\\\u[^"]+)":', unescape, text)

with open('constants/registry.ts', 'w', encoding='utf-8') as f:
    f.write(new_text)
print('Fixed unicode escapes!')
