import re
import json

with open("constants/registry.ts", "r") as f:
    content = f.read()

# Extract GLOBAL_KEYWORD_MAP
map_text = re.search(r'export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = \{(.*?)\};', content, re.DOTALL)
if map_text:
    try:
        # Very hacky JSON parse
        obj_text = "{" + map_text.group(1) + "}"
        obj = json.loads(obj_text)
    except Exception as e:
        print("Parse error:", e)
        # Let's extract manually
        obj = {}
        for line in map_text.group(1).split('\n'):
            if 'id:' in line:
                # '"詹妮弗": { "id": "jennifer", "type": "person" }'
                pass

# Let's just do a simpler test.
GLOBAL_KEYWORD_MAP = {
    "米尔谷": {"id": "mill_valley"},
    "记者": {"id": "reporter"}
}

queryRemainder = "米尔谷 记者"
detectedKeywordIds = []
sortedAliases = sorted(GLOBAL_KEYWORD_MAP.keys(), key=len, reverse=True)

for alias in sortedAliases:
    lowerAlias = alias.lower()
    if lowerAlias in queryRemainder:
        detectedKeywordIds.append(GLOBAL_KEYWORD_MAP[alias]["id"])
        queryRemainder = (" " * len(lowerAlias)).join(queryRemainder.split(lowerAlias))

print("Detected:", detectedKeywordIds)
print("Remainder:", repr(queryRemainder))

cleanRemainder = re.sub(r'[\s,，.。!！?？;；:：、\-_/\\|]', '', queryRemainder)
print("Clean Remainder:", repr(cleanRemainder))
print("isRemainderClean:", len(cleanRemainder) == 0)
