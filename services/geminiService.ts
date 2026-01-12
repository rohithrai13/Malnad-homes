
import { GoogleGenAI } from "@google/genai";

// Guideline: Always use a new instance with the direct process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' reference
// and create right before making an API call where possible.

export const generateListingDescription = async (
  propertyName: string,
  features: string,
  vibe: string
): Promise<string> => {
  // Always use the latest API key from environment variable directly in the constructor
  // DO NOT define or check for existence of API_KEY manually as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'FAKE_API_KEY_FOR_DEVELOPMENT' });
  
  try {
    const prompt = `
      You are an expert rental property copywriter for "Malnad Homes", an agency helping students and professionals find housing in Malnad/Puttur.
      
      Write a clear, inviting, and practical property listing description (max 100 words) for a rental unit with these details:
      Property Name: ${propertyName}
      Key Features: ${features}
      Target Tenant Vibe: ${vibe}
      
      Focus on what matters to tenants: commute, comfort, internet, and safety.
      Format the output as a clean paragraph. Do not use markdown bolding.
    `;

    // Guideline: Use the recommended model for basic text tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Guideline: Access response.text directly (property, not a method).
    return response.text || "Could not generate description at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description. Please try again later.";
  }
};
