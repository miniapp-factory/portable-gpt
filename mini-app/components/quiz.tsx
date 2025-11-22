"use client";

import { useState } from "react";
import { QuizResult } from "./quiz-result";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: { text: string; animal: Animal }[];
}

const questions: Question[] = [
  {
    text: "What’s your favorite type of activity?",
    options: [
      { text: "Chasing things", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring the woods", animal: "fox" },
      { text: "Nibbling on snacks", animal: "hamster" },
      { text: "Racing around", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend a weekend?",
    options: [
      { text: "Reading a book", animal: "cat" },
      { text: "Going for a walk", animal: "dog" },
      { text: "Hiking", animal: "fox" },
      { text: "Staying cozy at home", animal: "hamster" },
      { text: "Riding a bike", animal: "horse" },
    ],
  },
  {
    text: "What’s your ideal snack?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Carrots", animal: "horse" },
    ],
  },
  {
    text: "Which trait describes you best?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Curious", animal: "fox" },
      { text: "Energetic", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    text: "What’s your favorite environment?",
    options: [
      { text: "Quiet home", animal: "cat" },
      { text: "Open park", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Small cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
  };

  if (showResult) {
    const maxScore = Math.max(...Object.values(scores));
    const bestAnimals = Object.entries(scores)
      .filter(([, s]) => s === maxScore)
      .map(([a]) => a as Animal);
    const resultAnimal = bestAnimals[0]; // pick first in case of tie
    return <QuizResult animal={resultAnimal} onRetake={resetQuiz} />;
  }

  const question = questions[current];
  const shuffledOptions = shuffleArray(question.options);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
