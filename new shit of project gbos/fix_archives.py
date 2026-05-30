import re

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix authors
content = re.sub(r'"author":\s*"马库斯·索恩"', '"author": "马库斯·索恩 (Marcus Thorne)"', content)
content = re.sub(r'"author":\s*"霍华德·贝克"', '"author": "霍华德·贝克 (Howard Baker)"', content)

# Fix templates
content = re.sub(r'"author":\s*"马库斯·索恩 \(Marcus Thorne\).*?",\s*"template":\s*"REGGIE"', '"author": "马库斯·索恩 (Marcus Thorne)",\n            "template": "THORNE"', content)
content = re.sub(r'"author":\s*"马库斯·索恩 \(Marcus Thorne\)，FBI 实验室总证物官",\s*"template":\s*"REGGIE"', '"author": "马库斯·索恩 (Marcus Thorne)，FBI 实验室总证物官",\n            "template": "THORNE"', content)
content = re.sub(r'"author":\s*"霍华德·贝克 \(Howard Baker\)",\s*"template":\s*"REGGIE"', '"author": "霍华德·贝克 (Howard Baker)",\n            "template": "BAKER"', content)
content = re.sub(r'"author":\s*"代理协调员 艾萨克·阿特尔曼 \(Isaac Alterman\)",\s*"template":\s*"REGGIE"', '"author": "代理协调员 艾萨克·阿特尔曼 (Isaac Alterman)",\n            "template": "ALTERMAN"', content)
content = re.sub(r'"author":\s*"托马斯·克兰 \(Thomas Crane\)",\s*"template":\s*"REGGIE"', '"author": "托马斯·克兰 (Thomas Crane)",\n            "template": "CRANE"', content)
content = re.sub(r'"author":\s*"大卫·霍克 \(David Hawke\)",\s*"template":\s*"REGGIE"', '"author": "大卫·霍克 (David Hawke)",\n            "template": "HAWKE"', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
