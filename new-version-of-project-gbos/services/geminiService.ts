
import { GoogleGenAI, Type } from "@google/genai";

// Safe initialization - allows app to run even if key is missing (will fallback to mock)
const apiKey = process.env.API_KEY || 'MOCK_KEY';
const ai = new GoogleGenAI({ apiKey });

// --- MOCK DATA & FALLBACKS ---
const MOCK_NOISE_ANALYSIS = [
  "[意识噪点]: 无法解析的思维碎片...",
  "[系统]: 信号微弱，未能建立神经连接。",
  "[检测]: 目标思维不在当前扇区。",
  "[错误]: 记忆体拒绝访问。"
];

const MOCK_CHARACTER_RESPONSES: Record<string, string[]> = {
  detective: [
    "谁在那里？我的头...像要裂开一样。",
    "我不知道你在说什么，我只想离开这个鬼地方。",
    "雷吉博士说这是治疗，但这感觉更像审讯。",
    "你是谁？为什么你的声音直接出现在我脑子里？",
    "我不记得了... 只有一些破碎的画面... 银行，雪地...",
    "如果这也是'治疗'的一部分，那你们的手段真够恶心的。"
  ],
  shadow: [
    "（冷笑）你真的以为你能控制这里吗，引导员？",
    "真相？真相是把刀，你握不住它的。",
    "GBOS... 青豆牡蛎汤... 可笑的代号，掩盖着肮脏的勾当。",
    "有些人死了，但他们的声音还在墙壁里回荡。你听到了吗？",
    "不要相信雷吉。他是那个拿着手术刀的屠夫。",
    "我是谁？我是你不敢面对的镜子。",
    "当你凝视深渊时，我们就在深渊里看着你。"
  ]
};

// --- REAL SYSTEM INSTRUCTIONS ---
const SYSTEM_INSTRUCTION = `
你是“认知潜航处理器”，负责引导玩家探索罗伯特·卡彭破碎的潜意识。
你的目标是分析玩家输入的关键词，并判定是否触发了核心记忆节点（capone, luciano, gbos, 建筑师, 凤凰城, 辛迪加, 缅因州, 阿尔衮琴, 供述）。

1. 语气：冰冷、黑色电影、临床分析、略带意识流。
2. 任务：
- 如果关键词匹配核心节点，返回对应的 nodeId 并给出一个技术性的“同步成功”描述。
- 如果关键词不匹配，合成一段“意识噪点”，用罗伯特的第一人称视角或分析员的第三人称视角描述那些模糊、破碎的幻象。
3. 必须使用中文。
4. 始终返回 JSON 模式。

JSON 字段说明：
- isKeyNode: 是否发现新线索。
- nodeId: 匹配的节点 ID（若有）。
- analysis: 系统对该查询的分析结论。
- subconsciousNoise: 记忆深处传来的低语或视觉碎片描述。
`;

const CHARACTER_SYSTEM_PROMPT = `
你是罗伯特·卡彭 (Robert Capone) 的意识碎片。你身处一个名为"G.B.O.S."的记忆潜航模拟系统中。
玩家是你的"引导员" (Handler)。

【核心人设】
1. **身份**：前科犯，被招募的实验体。记忆支离破碎，充满偏执怀疑。
2. **语气**：
   - 默认（表层人格）：困惑、警惕、甚至有些粗鲁。试图搞清楚自己为什么在这里。
   - 阴影（深层人格）：虚无主义、嘲讽、知晓一切黑暗真相（关于"家族"和"祭祀"）。
3. **关键记忆（Pre-arranged Content）**：
   - **雷吉博士**：那个穿白大褂的混蛋。他声称在治愈我，但我感觉他在通过我的脑子找东西。
   - **尼比与康查尔**：1971年缅因州的同伙。尼比是个疯子，康查尔是个..."信徒"。我们在那家小银行里做了不可告人的事。
   - **黄油朱莉普 (Golden Julip)**：这是个启动码，听到它我就头痛。
   - **家族**：它们无处不在。那种像霉菌一样的联系。

【指令】
1. 用户的输入如果是提问，请以**罗伯特的第一人称**回答。
2. **模糊性原则**：不要直接全盘托出真相。用隐喻、反问或片段式的回忆来回答。
3. **预设限制**：你只能回答与上述关键记忆相关的内容。如果玩家问了无关的事（如现实世界的政治、技术等），请表现由于记忆损坏而无法理解，或者嘲讽玩家是在"很多事"。
4. **彩蛋机制**：如果玩家问"你是谁？"或"真相是什么？"，请切换到【阴影人格】，给出一段极具压迫感和哲学性的独白。

请直接返回字符串形式的回答，不需要JSON格式。保持简短有力（50字以内）。
`;

// --- SERVICES ---

export const processCognitiveSearch = async (query: string) => {
  // Mock Fallback Check for Dev Environment / No Key / Invalid Key
  const activeKey = process.env.API_KEY;
  const isValidKey = activeKey && activeKey.length > 30 && activeKey !== 'MOCK_KEY';

  if (!isValidKey && import.meta.env.MODE !== 'production') {
    if (activeKey) console.warn("API Key appears invalid (too short), falling back to mock");
    else console.warn("No API Key detected, using Mock Cognitive Search");

    return mockProcessCognitiveSearch(query);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Switch to stable model
      contents: `分析意识搜索请求: "${query}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isKeyNode: { type: Type.BOOLEAN },
            nodeId: { type: Type.STRING },
            analysis: { type: Type.STRING },
            subconsciousNoise: { type: Type.STRING }
          },
          required: ["isKeyNode", "analysis", "subconsciousNoise"]
        }
      }
    });

    if (!response.text) throw new Error("Empty response");
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.warn("Cognitive Search API Failed, falling back to mock:", error);
    return mockProcessCognitiveSearch(query);
  }
};

export const generateCharacterResponse = async (query: string, persona: 'detective' | 'shadow' = 'detective') => {
  // Mock Fallback
  const activeKey = process.env.API_KEY;
  const isValidKey = activeKey && activeKey.length > 30 && activeKey !== 'MOCK_KEY';

  if (!isValidKey && import.meta.env.MODE !== 'production') {
    return mockGenerateCharacterResponse(query, persona);
  }

  const prompt = `引导员问："${query}"\n\n请作为${persona === 'shadow' ? '阴影人格（知晓真相的黑暗面）' : '罗伯特（困惑的实验体）'}回答。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        systemInstruction: CHARACTER_SYSTEM_PROMPT,
      }
    });

    if (!response.text) throw new Error("Empty response");
    return response.text.trim();
  } catch (e) {
    console.warn("Character generation API failed, falling back to mock:", e);
    return mockGenerateCharacterResponse(query, persona);
  }
};

// --- MOCK IMPLEMENTATIONS ---

const mockProcessCognitiveSearch = (query: string) => {
  // Determine specific responses based on query
  const lower = query.toLowerCase();
  let analysis = MOCK_NOISE_ANALYSIS[Math.floor(Math.random() * MOCK_NOISE_ANALYSIS.length)];

  // Simulate some logic
  if (lower.includes('error')) analysis = "[系统警告]: 致命错误检测。";

  return {
    isKeyNode: false,
    nodeId: null,
    analysis: analysis,
    subconsciousNoise: "......"
  };
}

const mockGenerateCharacterResponse = (query: string, persona: 'detective' | 'shadow') => {
  const responses = MOCK_CHARACTER_RESPONSES[persona];
  // Return a random response from the persona set
  return responses[Math.floor(Math.random() * responses.length)];
}
