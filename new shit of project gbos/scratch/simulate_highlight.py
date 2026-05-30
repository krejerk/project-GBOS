import json

text = """你是想问倒霉的[里奇·德莱弗斯](clue:richie_dreyfuss)吧，想问他是不是被我或者康查尔干掉的。

老实说，我也不知道这笔账应该算在谁头上。

里奇是我们还在费城的时候被康查尔招募的，但当时我并不知道这件事，直到[1977年](clue:year_1977)，当房车一路开到圣路易斯时，我才在远亲中注意到一张略微熟悉的脸。几次相处下来，我意识到他觊觎瓦妮莎，想上车并取代我的位置，而康查尔对此不置可否，我想他未必不曾考虑过这件事，不然为什么会选择带上里奇前往达文波特，而不是我呢？

里奇的死发生在我们在罗克福德市汇合后的某个夜晚。里奇的住在一个公路旅馆里，那天晚上，康查尔同我，还有里奇，每个人都喝了不少。尤其是里奇，因为我记得，话头是他自己先说起来的。"""

# simulate keyword map
keyword_map = {
    "里奇·德莱弗斯": "richie_dreyfuss",
    "1977": "year_1977"
}

# auto keywords
keywords = sorted(list(keyword_map.keys()), key=len, reverse=True)

print("Keywords:", keywords)

import re

# build pattern
escaped = [re.escape(k) for k in keywords]
pattern = r'\[.+?\]\(clue:.+?\)|' + '|'.join(escaped)

print("Pattern:", pattern)

regex = re.compile(f'({pattern})')

parts = regex.split(text)

for p in parts:
    if not p: continue
    if p.startswith('['):
        print(f"[MANUAL] {p}")
    elif p in keywords:
        print(f"[AUTO] {p}")

