"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Dropdown from "@/components/Dropdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const muscleGroups = [
  "chest",
  "back",
  "shoulders",
  "arms",
  "legs",
  "full body",
] as const;
type TMuscleGroup = (typeof muscleGroups)[number];

const numberOfExercises = ["1", "2", "3", "4", "5", "6"] as const;
type TNumberOfExercises = (typeof numberOfExercises)[number];

const timeInMinutes = ["30", "45", "60", "75", "90", "105", "120"] as const;
type TTimeInMinutes = (typeof timeInMinutes)[number];

const Home = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroup>(
    muscleGroups[0]
  );
  const [selectedNumberOfExercises, setSelectedNumberOfExercises] =
    useState<TNumberOfExercises>(numberOfExercises[3]);
  const [selectedTimeInMinutes, setSelectedTimeInMinutes] =
    useState<TTimeInMinutes>(timeInMinutes[1]);

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        muscleGroup: selectedMuscleGroup,
        numberOfExercises: selectedNumberOfExercises,
        timeInMinutes: selectedTimeInMinutes,
      },
    });

  // TODO: Update this count
  const gymWorkoutsGeneratedCount = 1494;

  const lastMessage = messages[messages.length - 1];
  const generatedWorkout =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <>
      <Header />

      <main className="px-4 sm:px-0 flex min-h-[calc(100vh-4rem-6.25rem)] max-w-[36rem] mx-auto py-8 justify-center">
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-5xl font-extrabold">
              Generate your next gym workout using chatGPT
            </h2>

            <p className="font-medium text-gray-500">
              {gymWorkoutsGeneratedCount} gym workouts generated so far...
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <fieldset>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type anything to start..."
                className="rounded-full w-full border border-black focus:ring-0 focus:border-black"
                required
              />
            </fieldset>

            <div className="flex space-x-2">
              <Dropdown
                items={muscleGroups}
                selectedItem={selectedMuscleGroup}
                setSelectedItem={setSelectedMuscleGroup as () => void}
                label="Muscle group"
              />

              <Dropdown
                items={numberOfExercises}
                selectedItem={selectedNumberOfExercises}
                setSelectedItem={setSelectedNumberOfExercises as () => void}
                label="Number of exercises"
              />

              <Dropdown
                items={timeInMinutes}
                selectedItem={selectedTimeInMinutes}
                setSelectedItem={setSelectedTimeInMinutes as () => void}
                label="Time in minutes"
              />
            </div>

            <button
              disabled={isLoading}
              className="bg-black rounded-full text-white font-medium px-4 py-2 border-black border hover:bg-opacity-80 w-full transition-all duration-200"
              type="submit"
            >
              {isLoading
                ? "Hold on gymbro, We're generating your next workout..."
                : "Generate your next gym workout"}
            </button>
          </form>

          {generatedWorkout ? (
            <ReactMarkdown
              className="prose break-words"
              remarkPlugins={[remarkGfm]}
            >
              {generatedWorkout}
            </ReactMarkdown>
          ) : null}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
