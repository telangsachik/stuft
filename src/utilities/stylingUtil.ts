import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const getRandomTailwindTextColor = (hashingWord?: string) => {
  const colors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
  ];

  if (!hashingWord)
    return colors[Math.floor(Math.random() * (colors.length - 1))];

  const primeBase = 37;
  let number = 0;
  const upperCasedHashingWord = hashingWord.toUpperCase();
  for (let i = 0; i < upperCasedHashingWord.length; i++) {
    number =
      number * primeBase +
      (upperCasedHashingWord.charCodeAt(i) - "A".charCodeAt(0) + 1);
  }

  return colors[number % colors.length];
};

export { cn, getRandomTailwindTextColor };
