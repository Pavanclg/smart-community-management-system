const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSuggestion = async (data) => {
    try {
        console.log("Calling Gemini...");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash" // ✅ Updated model name
        });


        const prompt = `
            Water Usage: ${data.water}
            Electricity Usage: ${data.electricity}
            Waste Generated: ${data.waste}

            Give exactly 5 short suggestions.

            Format:
                1.
                2.
                3.
                4.
                5.

                Keep the response under 50 words.
                `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
    console.log("Gemini Error Full:", error);
    return "AI suggestion unavailable";
    }
};

module.exports = getSuggestion;