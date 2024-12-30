import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAiResponse = async (
  question: string
): Promise<string | null> => {
  try {
    if (!process.env.GEMNAI) {
      throw new Error("Google Generative AI key (GEMNAI) is not defined.");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMNAI as string);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);

    if (result && result.response.text()) {
      return result.response.text();
    } else {
      throw new Error("No content returned by the generative model.");
    }
  } catch (err: any) {
    console.error("Error generating AI response:", err.message);
    return null;
  }
};
