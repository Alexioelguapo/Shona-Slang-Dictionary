import { GoogleGenAI, Type } from "@google/genai";
import type { SlangDefinition } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    term: { type: Type.STRING, description: "The slang term itself." },
    definition: { type: Type.STRING, description: "A clear and concise definition of the slang term." },
    exampleShona: { type: Type.STRING, description: "An example sentence in Shona demonstrating the usage of the term." },
    exampleEnglish: { type: Type.STRING, description: "The English translation of the example sentence." },
  },
  required: ['term', 'definition', 'exampleShona', 'exampleEnglish'],
};

const SYSTEM_INSTRUCTION = `You are an expert on Zimbabwean Shona slang. Your role is to provide clear, concise, and authentic definitions and usage examples. You must respond ONLY with a valid JSON object that conforms to the provided schema. Do not wrap the JSON in markdown fences like \`\`\`json. If you don't know a term, make a best-effort guess or provide a structured response indicating the term is unknown within the JSON format.`;

const callGemini = async (prompt: string, temperature: number): Promise<SlangDefinition> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
                temperature,
            },
        });
        
        const parsedData = JSON.parse(response.text) as SlangDefinition;
        
        if (!parsedData || !parsedData.definition) {
            throw new Error(`Could not find a definition. The term might be incorrect or not widely known.`);
        }
        
        return parsedData;

    } catch (error) {
        console.error("Error processing Gemini response:", error);
        if (error instanceof Error && error.message.includes('JSON')) {
             throw new Error("The AI returned an invalid format. Please try again.");
        } else if (error instanceof Error) {
            throw new Error(`An API error occurred: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching the definition.");
    }
}

export const fetchSlangDefinition = async (term: string): Promise<SlangDefinition> => {
    const prompt = `Provide a definition and usage example for the Shona slang term: "${term}".`;
    return callGemini(prompt, 0.5);
};

export const fetchFeaturedSlang = async (): Promise<SlangDefinition> => {
    const prompt = "Provide a popular and interesting Shona slang term, its definition, and a usage example. Pick a common but interesting term like 'dhuterere', 'pfee', or 'blaz'.";
    return callGemini(prompt, 0.8);
};
