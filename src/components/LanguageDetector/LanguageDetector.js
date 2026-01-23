/**
 * @file LanguageDetector.js
 * @description Detects the user's browser language and limits it to supported languages (Vietnamese, English).
 *              Defaults to Vietnamese if the detected language is not supported.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import { useState, useEffect } from "react";

const LanguageDetector = () => {
  const [language, setLanguage] = useState("vi"); // Default language is Vietnamese

  useEffect(() => {
    // Detect browser language
    const browserLanguage = navigator.language || navigator.userLanguage;

    // Only support Vietnamese and English
    const supportedLanguages = ["vi", "en"];
    const detectedLanguage = supportedLanguages.includes(browserLanguage.slice(0, 2))
      ? browserLanguage.slice(0, 2)
      : "vi"; // Default to Vietnamese if unsupported

    setLanguage(detectedLanguage);
  }, []);

  return null;
};

export default LanguageDetector;
