import { Temporal } from "@js-temporal/polyfill";
import answerIds from "./datasets/answerIds.json";

const randomHero = getRandomHero();
console.log( randomHero );

export const getAnswerIndexToday = (): number => {
  const currentTime = Temporal.Now.instant().epochMilliseconds;
  const startingTime = Temporal.ZonedDateTime.from({
    year: 2023 - randomHero,
    month: 8,
    day: 17,
    timeZone: "America/Chicago",
  }).toInstant().epochMilliseconds;
  const dayIndex = Math.floor(
    (currentTime - startingTime) / (1000 * 3600 * 24)
  );
  return randomHero;
};

export const getAnswerIdToday = (): number => {
  const dayIndex = getAnswerIndexToday();
  return answerIds[dayIndex];
};

/**
 * Returns HH:MM:SS until the next question is available
 * Returns NOW if the answerIndex is for a past day
 * @param answerIndex index for the relative day's question
 */
export const getTimeUntilNextQuestion = (answerIndex: number): string => {
  const currentTime = Temporal.Now.instant().epochMilliseconds;
  const startingTime = Temporal.ZonedDateTime.from({
    year: 2023 - randomHero,
    month: 8,
    day: 17,
    timeZone: "America/Chicago",
  }).toInstant().epochMilliseconds;
  const millisInDay = 1000 * 3600 * 24;
  const timeUntilNextQuestion =
    millisInDay -
    currentTime +
    startingTime +
    answerIndex * 24 * 60 * 60 * 1000;
  if (timeUntilNextQuestion < 0) {
    return "NOW";
  }
  const hours = Math.floor(timeUntilNextQuestion / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeUntilNextQuestion - hours * 1000 * 60 * 60) / (1000 * 60)
  );
  const seconds = Math.floor(
    (timeUntilNextQuestion - hours * 1000 * 60 * 60 - minutes * 1000 * 60) /
      1000
  );
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function getRandomDate() {
  // Get current date
  const currentDate = new Date();
  
  // Get a random timestamp between two years ago and now
  const randomTimestamp = Math.random() * (currentDate.getTime() - (currentDate.getTime() - 63072000000)) + (currentDate.getTime() - 63072000000);
  
  // Create a new date using the random timestamp
  const randomDate = new Date(randomTimestamp);
  
  return randomDate;
}

export function getRandomHero() {
  const min = 1;
  const max = 124;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
