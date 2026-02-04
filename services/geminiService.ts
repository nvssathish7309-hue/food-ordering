
import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from '../types';

const API_KEY = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getFoodRecommendations = async (userInput: string, menu: FoodItem[]) => {
  try {
    const menuContext = menu.map(item => `- ${item.name} (ID: ${item.id}): ${item.description} ($${item.price}, Category: ${item.category})`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful food concierge for 'GourmetDash AI'. 
      Based on the following menu, recommend up to 3 items that best match the user's request.
      
      Menu:
      ${menuContext}
      
      User Request: "${userInput}"
      
      Respond only with a JSON array of objects, each having:
      - id: the matching item ID from the menu
      - reason: a short, appetizing 1-sentence reason why this matches their request.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ['id', 'reason']
          }
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return [];
  }
};

export const getSmartSearchFeedback = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize what the user is looking for in 5 words or less: "${query}"`,
    });
    return response.text.trim();
  } catch (error) {
    return "";
  }
};
