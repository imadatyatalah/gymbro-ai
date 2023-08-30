// Inspired by by https://github.com/Nutlope/twitterbio/blob/main/app/api/chat/route.ts

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export const POST = async (req: Request) => {
  const { muscleGroup, numberOfExercises, timeInMinutes } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: `
Generate a gym workout for the following specifications:

Muscle Group: ${muscleGroup}
Workout Time: ${timeInMinutes} minutes
Number of Exercises: ${numberOfExercises}

Please provide a workout that includes exercises focusing on the specified muscle group. Each exercise should have 3 instructions only & have the following format exactly:

1. "Exercise name", difficulty [Specify a difficulty rating on a scale of 1 to 10].
- [Provide step-by-step instructions for performing the exercise]
- [Provide step-by-step instructions for performing the exercise]
- [Provide step-by-step instructions for performing the exercise]

also add a random advice at the end of the workout.

note: don't generate anything but the exercises and the advice.
        `,
      },
    ],
  });

  // // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
};
