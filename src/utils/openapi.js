import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "./constant";

const genai = new GoogleGenerativeAI(AI_KEY)
const openai = genai.getGenerativeModel({ model: "gemini-1.5-flash"})

export default openai