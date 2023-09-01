"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Dropdown from "@/components/Dropdown";

const muscleGroups = ["chest", "back", "shoulders", "arms", "legs"] as const;
type TMuscleGroup = (typeof muscleGroups)[number];

const numberOfExercises = ["1", "2", "3", "4", "5", "6"] as const;
type TNumberOfExercises = (typeof numberOfExercises)[number];

const timeInMinutes = ["30", "45", "60", "75", "90", "105", "120"] as const;
type TTimeInMinutes = (typeof timeInMinutes)[number];

const GenerateWorkoutForm = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<TMuscleGroup>(
    muscleGroups[0],
  );
  const [selectedNumberOfExercises, setSelectedNumberOfExercises] =
    useState<TNumberOfExercises>(numberOfExercises[3]);
  const [selectedTimeInMinutes, setSelectedTimeInMinutes] =
    useState<TTimeInMinutes>(timeInMinutes[1]);

  const { handleSubmit, isLoading, messages, setInput } = useChat({
    body: {
      muscleGroup: selectedMuscleGroup,
      numberOfExercises: selectedNumberOfExercises,
      timeInMinutes: selectedTimeInMinutes,
    },
    // the form can't submit if `input` is empty, so we set it to a space
    initialInput: " ",
  });

  const lastMessage = messages[messages.length - 1];
  const generatedWorkout =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:space-x-2">
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
          // the form can't submit if `input` is empty, so we set it to a space
          onClick={() => setInput(" ")}
          className="w-full rounded-full border border-black bg-black px-4 py-2 font-medium text-white transition-all duration-200 hover:bg-opacity-80"
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
    </>
  );
};

export default GenerateWorkoutForm;
