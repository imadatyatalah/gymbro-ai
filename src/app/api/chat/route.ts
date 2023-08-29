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

Please provide a workout that includes only exercises focusing on the specified muscle group. For each exercise, include only the following details:

1. "Exercise name", difficulty [Specify a difficulty rating on a scale of 1 to 10] (should be 4 instructions maximum)
- [Provide step-by-step instructions for performing the exercise]
- [Provide step-by-step instructions for performing the exercise]
- [Provide step-by-step instructions for performing the exercise]
- [Provide step-by-step instructions for performing the exercise]
        `,

        // content: `
        // Generate a ${muscleGroup} workout that contains ${numberOfExercises} exercises and is ${timeInMinutes} minutes long.

        // The response should look like this:

        // 1. "Exercise name", difficulty 5/10
        // - This is how the exercise should be done
        // - This is how the exercise should be done
        // - This is how the exercise should be done
        // - This is how the exercise should be done
        // `,
      },
    ],
  });

  // // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
};

// Make sure each generated workout is less than 1000 characters.
// Make sure to generate only the exercise names and nothing else. Each exercise should have a list of 4 sentences describing how the exercise should be done.
