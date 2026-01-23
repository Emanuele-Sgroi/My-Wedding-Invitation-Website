/**
 * @file NotFoundComponent.js
 * @description Renders a 404 error, use in the not-found page. Multilingual!
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";
import translations from "@/utils/translations";

export default function NotFoundComponent() {
  const [language, setLanguage] = useState("vi"); // Default language (Vietnamese)

  // Detect language
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const supportedLanguages = ["vi", "en"];
    const detectedLanguage = supportedLanguages.includes(
      browserLanguage.slice(0, 2)
    )
      ? browserLanguage.slice(0, 2)
      : "vi";

    setLanguage(detectedLanguage);
  }, []);

  // Destructure translation strings
  const { message, button } = translations[language].not_found;

  return (
    <>
      {/* Detect Language */}
      <LanguageDetector />
      <div className="w-full h-svh bg-blue p-6 flex flex-col justify-center items-center">
        {/* Error 404 message */}
        <h1 className="uppercase text-center text-gold mb-4">
          Oops!{" "}
          <span className="font-serif font-bold text-5xl sm:text-9xl">404</span>
        </h1>
        <h3 className="uppercase text-center text-white mb-6">{message}</h3>
        {/* Link to return to the homepage */}
        <Link href="/" className="btn btn-gold">
          {button}
        </Link>
      </div>
    </>
  );
}
