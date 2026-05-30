import re
import os

filepath = "/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts"
with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Pattern to find the mess from the first clipping_08 to just before clipping_11
pattern = r'\{\s+"id": "clipping_08",.*?\}\n\s+\{\s+"id": "clipping_11"'

new_block = r'''{
        "id": "clipping_08",
        "title": "1973年辛辛那提少女冻死案",
        "triggers": {
            "year": "1973",
            "person": [
                "julie",
                "朱莉",
                "Julie Walsh"
            ]
        },
        "revealed": [],
        "newspaper": {
            "source": "《辛辛那提询问报》(The Cincinnati Enquirer)",
            "date": "1973年1月14日",
            "headline": "警局门前的致命疏忽：六岁少女冻死分局阶梯，警方陷入信用危机",
            "content": [
                "Source: 《辛辛那提询问报》(The Cincinnati Enquirer)",
                "Date: 1973年1月14日",
                "Headline: 警局门前的致命疏忽：六岁少女冻死分局阶梯，警方陷入信用危机",
                "（本报讯） 针对本月初“朱莉·沃尔什失踪案”的调查于昨日宣告终结，辛辛那提警方正式承认这是一起由“极端管理疏忽”导致的悲剧。",
                "1月5日清晨，失踪三日的六岁少女朱莉（Julie Walsh）被发现冻死在第四分局的大门前，身上仅裹着一层单薄的毛毯。初步尸检显示，死因为长时间暴露于极寒环境导致的体温过低。由于新年假期期间警队休假人数过多，分局内部人员严重短缺，值班警员在漫长的深夜值班中竟完全忽略了门前的动态。"
            ]
        },
        "annotation": {
            "fileId": "CIN-1973-01-REV",
            "date": "1973年1月20日",
            "level": "机密 (CONFIDENTIAL)",
            "author": "雷吉博士 (Dr. Reggie)",
            "template": "REGGIE",
            "content": "(待校对)"
        }
    },
    {
        "id": "clipping_09",
        "title": "1973年纳什维尔警局军械库窃案",
        "triggers": {
            "year": "1973",
            "person": [
                "juvell_chambers",
                "朱维尔·钱伯斯",
                "Jewel Chambers"
            ]
        },
        "revealed": [],
        "newspaper": {
            "source": "《纳什维尔旗帜报》(Nashville Banner)",
            "date": "1973年8月22日",
            "headline": "警局军械库遭劫，争议警员钱伯斯获无罪判决：正义还是妥协？",
            "content": [
                "Source: 《纳什维尔旗帜报》(Nashville Banner)",
                "Date: 1973年8月22日",
                "Headline: 警局军械库遭劫，争议警员钱伯斯获无罪判决：正义还是妥协？",
                "（本报讯） 纳什维尔地方法院昨日人声鼎沸。经过长达三个月的审理，大陪审团最终宣布，因“证据链存在严重瑕疵且存在过度执法嫌疑”，正式撤销对非裔警员朱维尔·钱伯斯（Jewel Chambers）的控诉。",
                "去年发生的“灵魂厨房”系列犯罪波及周边数城，最终在伯克斯维尔达到高潮。当时，一伙蒙面暴徒在混乱中洗劫了第三分局的军械库，包括 12 支泵动式散弹枪及大量弹药在内的警用物资失窃。由于钱伯斯是当晚唯一的库房守卫，且现场发现了与黑人民权组织相关的非法印刷品，警方内部坚称钱伯斯是“内鬼”，旨在为激进分子输送武装。"
            ]
        },
        "annotation": {
            "fileId": "NAS-1979-102-REV",
            "date": "1979年5月14日",
            "level": "最高机密 (EYES ONLY / CLASSIFIED)",
            "author": "阿尔特曼 (Altman)，FBI 高级特别探员",
            "template": "REGGIE",
            "content": "(待校对)"
        }
    },
    {
        "id": "clipping_10",
        "title": "1973年伯克斯维尔威士忌劫案",
        "triggers": {
            "year": "1973",
            "person": [
                "boris_smirnov",
                "鲍里斯·斯米尔诺夫",
                "boris smirnov"
            ]
        },
        "revealed": [],
        "newspaper": {
            "source": "《路易斯维尔信使日报》(The Louisville Courier-Journal)",
            "date": "1973年12月28日",
            "headline": "坎伯兰河上的蓝色炼狱：威士忌大劫案震惊肯塔基",
            "content": [
                "Source: 《路易斯维尔信使日报》(The Louisville Courier-Journal)",
                "Date: 1973年12月28日",
                "Headline: 坎伯兰河上的蓝色炼狱：威士忌大劫案震惊肯塔基",
                "昨天凌晨三点，一伙自称“老肯塔基爱国者”的武装暴徒劫持了三辆满载高纯度波本原浆的重型油罐车，并将其横停在横跨坎伯兰河的主桥中央。领头的一名有着东欧口音、自称“鲍里斯”的男子通过无线电向警方发出最后通牒：如果警方试图靠近，他将把数千加仑的酒精倾倒入河并点燃。"
            ]
        },
        "annotation": {
            "fileId": "FBI-1975-11-MEMO",
            "date": "1975年11月12日",
            "level": "绝密 (TOP SECRET) / 阅后即焚",
            "author": "特别主管 (SAC) 艾萨克·阿尔特曼 (I. Altman)",
            "template": "REGGIE",
            "content": "(待校对)"
        }
    },
    {
        "id": "clipping_11"'''

fixed_content = re.sub(pattern, new_block, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Replacement complete!")
