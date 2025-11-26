"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

interface Props {
  animal: "cat" | "dog" | "fox" | "hamster" | "horse";
  onRetake: () => void;
}

export function QuizResult({ animal, onRetake }: Props) {
  const animalImages: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const animalNames: Record<string, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  const animalFoods: Record<string, string> = {
    cat: "fish",
    dog: "bones",
    fox: "berries",
    hamster: "seeds",
    horse: "carrots",
  };

  const animalVoices: Record<string, string> = {
    cat: "meow",
    dog: "bark",
    fox: "screech",
    hamster: "squeak",
    horse: "neigh",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">
        You’re most like a {animalNames[animal]}! (likes {animalFoods[animal]})
      </h2>
      <img
        src={animalImages[animal]}
        alt={animalNames[animal]}
        width={512}
        height={512}
        className="rounded"
      />
      <Share text={`I’m most like a ${animalNames[animal]}! Likes ${animalFoods[animal]} ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        onClick={onRetake}
      >
        Retake Quiz
      </button>
    </div>
  );
}
