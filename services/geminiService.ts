

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const processCognitiveSearch = async (query: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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

  return JSON.parse(response.text.trim());
};
