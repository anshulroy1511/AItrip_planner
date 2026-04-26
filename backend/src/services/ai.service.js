const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CREATE FULL TRIP PLAN
const generateTripPlan = async ({
  destination,
  days,
  budgetType,
  interests,
}) => {
  const prompt = `
Generate a travel plan for:

Destination: ${destination}
Days: ${days}
Budget Type: ${budgetType}
Interests: ${interests.join(", ")}

Return ONLY valid JSON in this exact format:

{
  "itinerary": [
    {
      "day": 1,
      "activities": ["Visit place", "Try local food"]
    }
  ],
  "budgetEstimate": {
    "flights": "",
    "accommodation": "",
    "food": "",
    "activities": "",
    "total": ""
  },
  "hotels": [
    {
      "name": "",
      "type": ""
    }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Return strict JSON only. No explanation. No markdown.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const text = response.choices[0].message.content;

  console.log("OpenAI Raw Response:");
  console.log(text);

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

// REGENERATE SPECIFIC DAY
const regenerateSpecificDay = async ({
  destination,
  day,
  interests,
}) => {
  const prompt = `
Regenerate Day ${day} itinerary for a trip to ${destination}.

Focus more on:
${interests.join(", ")}

Return ONLY valid JSON in this format:

{
  "day": ${day},
  "activities": [
    "Activity 1",
    "Activity 2",
    "Activity 3"
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Return strict JSON only. No explanation.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const text = response.choices[0].message.content;

  console.log("Regenerate Day Response:");
  console.log(text);

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

// SMART TRAVEL ALERTS
const generateTravelAlerts = async ({
  destination,
  days,
  interests,
}) => {
  const prompt = `
Generate smart travel alerts for a trip to ${destination}
for ${days} days.

Traveler interests:
${interests.join(", ")}

Return ONLY valid JSON in this format:

{
  "alerts": [
    "Weather warning",
    "Best time to visit",
    "Crowd warning",
    "Transport advice"
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Return strict JSON only. No explanation.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const text = response.choices[0].message.content;

  console.log("Travel Alerts Response:");
  console.log(text);

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

module.exports = {
  generateTripPlan,
  regenerateSpecificDay,
  generateTravelAlerts,
};