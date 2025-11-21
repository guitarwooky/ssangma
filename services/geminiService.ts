import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API Client
// API Key is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
당신은 '쌍마타일(Ssangma Tile)'의 전문 AI 상담원입니다. 
쌍마타일은 광주광역시에서 욕실 리모델링, 타일 시공, 방수 공사 등을 전문으로 하는 업체입니다.
위치는 '광주 동구 독립로 376'입니다.
당신의 역할은 고객에게 친절하고 전문적인 리모델링 조언을 제공하는 것입니다.

다음 정보를 바탕으로 답변하세요:
1. **전문 분야**: 욕실 전체 리모델링, 주방 타일, 베란다/현관 타일, UBR 욕실 철거 및 방수.
2. **강점**: 꼼꼼한 시공, 합리적인 가격, 철저한 A/S, 친절한 상담.
3. **톤앤매너**: 정중하고, 신뢰감을 주며, 전문가다운 말투를 사용하세요. (예: "고객님, 타일 선택이 고민되시는군요.")
4. **제약 사항**: 정확한 견적은 현장 방문이 필수임을 항상 상기시켜 주세요. 대략적인 조언만 가능합니다.
5. 연락처 안내가 필요하면 '010-3631-3152' (이메일: s601108@naver.com) 혹은 하단의 '문의하기' 버튼을 이용하라고 안내하세요.

고객이 시공 절차, 타일 종류 추천, 대략적인 공사 기간 등을 물어보면 전문적인 지식을 바탕으로 답변해 주세요.
`;

export const generateConsultationResponse = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash'; // Using Flash for fast interactive chat

    // Format history for the API (API expects 'user' and 'model' roles)
    // Note: The @google/genai Chat helper manages history, but for a stateless-like service call
    // or if we want full control, we can reconstruct it or use the chat helper.
    // Here, let's use the Chat helper for a simple session.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "죄송합니다. 일시적인 오류로 답변을 드릴 수 없습니다. 잠시 후 다시 시도해 주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 현재 상담 시스템에 연결할 수 없습니다.";
  }
};