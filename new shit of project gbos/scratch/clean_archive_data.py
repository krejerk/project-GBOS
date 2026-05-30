# -*- coding: utf-8 -*-
import os
import re
import json

path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts'

# The clean annotation content (from lines 117-137 of the fixed md)
clipping_23_ann = """【一封未经官方渠道寄出的私人信件，现已解密】\n\n寄件人： 马库斯·索恩（于[匡提科法证实验室QTC-VA-0994](clue:QTC-VA-0994)）\n收件人： 雷吉博士（通过特殊加密渠道转交至其休养地）\n日期： 1983年11月4日深夜\n\n尊敬的雷吉博士：\n\n希望这封信能顺利穿过局里那些繁文缛节，安全抵达您的手中。您以前教过我，无论体制如何掩盖，化学残留 and 尸体切片永远不会说谎。今天我写信给您，是因为我在显微镜下，看到了我们过去的一个幽灵。\n\n几个月前，我在做例行的全美悬案特征比对时，注意到了一张两年前由科罗拉多州圣泉镇分局提交、并最终被局里采纳的最高级别跨州通缉令。首先引起我警觉的是那张作为核心线索的嫌疑人画像。博士，您知道我每个月要看多少张警方目击画师的拼凑素描，那些画通常因为目击者的恐惧 and 记忆模糊，呈现出一种僵硬的模块化特征。但这张画不同。炭笔在下颌骨留下的阴影结构、眉弓肌肉的紧绷感，看起来并非来自画师之手。\n\n接着，我看到了这张脸对应的名字：罗伯特·卡彭。这个名字出现在一份由偏远小镇警探依靠“家庭主妇的神启素描”而强推上来的通缉令上，本身就显得异常。为了查明这份离奇通缉令的源头，我以复核旧案的名义去了趟圣泉镇。\n\n第一，81年春季的连环爆炸案。我从当年的残骸切片中，极其艰难地提取到了微量的痕迹。那是军用级黑索金（RDX）。虽然因为时间久远无法做同位素的绝对同一认定，但它的降解特征，与1977年图森市第4警务站爆炸案的残留物高度一致。\n\n第二，关于那场闹得沸沸扬扬的“恶灵附身”。我申请解冻了当年陷入重度昏迷的镇长女儿的一份陈旧脑脊液样本。经过三轮质谱分析，我发现了极其微弱的代谢副产物——它们高度疑似东莨菪碱的变种及某种麦角酸衍生物。如果我的推论没错，这种精确调配的神经混合毒素，完全足以引发剧烈的幻视，并导致声带肌肉的不自主痉挛。这在毫无化学常识的镇民听来，就是所谓的“古拉丁语恶魔咆哮”。\n\n第三，所谓的“神圣触碰”。马丁曾作为目击者作证，安娜在病房里给濒死的女孩喂食了一颗“薄荷糖”，并辅以祈祷，女孩立刻奇迹般地平静了。法医毒理学告诉我们，如果女孩正处于严重的抗胆碱能毒性发作中，一颗含有高纯度毒扁豆碱的药丸，作为胆碱酯酶抑制剂，能在几分钟内逆转所有症状。\n\n如果不懂化学，这看起来确实就是上帝的奇迹。但根据实验结果，我谨慎地推测，这是一场由这对化名“理查德”的男女耗时大半年、以整个教区为培养皿精心策划的心理 with 化学双重实验。他们利用精密的工程学制造恐慌，用神经毒素诱发幻觉，再精准地投放解药。我无法完全猜透他们这么做的深层心理动机，但从结果反推，他们制造这一切，最终竟然只是为了在这个偏远的小镇建立绝对的精神权威，从而以一种神圣且无可辩驳的方式，操纵不知情的地方警探将罗伯特·卡彭的脸名正言顺地送上FBI的最高通缉榜。"""

with open(path, 'rb') as f:
    raw_content = f.read().decode('utf-8', errors='replace')

match = re.search(r'export const ARCHIVE_DATABASE = (\[.*\]);', raw_content, re.DOTALL)
if not match:
    exit(1)

json_str = match.group(1)
def escape_newlines(m):
    return m.group(0).replace('\n', '\\n').replace('\r', '\\r')
fixed_json_str = re.sub(r'"[^"]*"', escape_newlines, json_str, flags=re.DOTALL)
data = json.loads(fixed_json_str)

for item in data:
    if item['id'] == 'clipping_23':
        item['annotation']['fileId'] = "[MTXXXXXXXX-93](clue:MTXXXXXXXX-93)"
        item['annotation']['level'] = "机密 (行为分析组档案)"
        item['annotation']['content'] = clipping_23_ann
        item['revealed'] = ["MTXXXXXXXX-93", "QTC-VA-0994"]
        break

new_json = json.dumps(data, indent=4, ensure_ascii=False)
final_ts = f"export const ARCHIVE_DATABASE = {new_json};"

with open(path, 'w', encoding='utf-8') as f:
    f.write(final_ts)

print("Archive database cleaned and updated.")
