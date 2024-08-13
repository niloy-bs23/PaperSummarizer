const { GoogleGenerativeAI ,Content} = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBDaz7IM2HQWnD6EtzUTzdT-gHMBk1poDY");

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",systemInstruction: "You act like a you know all about research"});

// ...

export default model


