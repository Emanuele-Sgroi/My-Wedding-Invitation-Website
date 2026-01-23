/**
 * @file countdownHelper.js
 * @description Helper function to calculate the countdown to the wedding date for the welcome section.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

export const getCountdown = () => {
  // Target wedding datetime (local): 2026-02-06 09:00
  const weddingDate = new Date(2026, 1, 6, 9, 0, 0); // month is 0-indexed -> 1 = February
  //const weddingDate = new Date("2025-07-15T20:53:00"); // Test

  const now = new Date(); // Get the current date and time

  const totalSeconds = (weddingDate - now) / 1000; // Calculate the total remaining time in seconds

  // If the countdown is over, return a message indicating the wedding happened
  if (totalSeconds <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "We got Married",
    };
  }

  // Calculate days, hours, minutes, and seconds left
  const days = Math.floor(totalSeconds / 86400); // 1 day = 86400 seconds
  const hours = Math.floor((totalSeconds % 86400) / 3600); // 1 hour = 3600 seconds
  const minutes = Math.floor((totalSeconds % 3600) / 60); // 1 minute = 60 seconds
  const seconds = Math.floor(totalSeconds % 60); // Remaining seconds

  // Return the calculated countdown values with an empty message
  return { days, hours, minutes, seconds, message: "" };
};
