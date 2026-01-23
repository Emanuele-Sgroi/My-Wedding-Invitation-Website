/**
 * @file page.js
 * @description Homepage structure including various sections like welcome, save the date, RSVP, and more for the wedding website.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SplashScreen,
  Navbar,
  WelcomeSection,
  SaveTheDate,
  ScheduleSection,
  InfoSection,
  RSVPSection,
  RegistrySection,
  AttendingGuestsSection,
  BackgroundAudio,
} from "@/components";
import { useState as useReactState } from "react";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";

export default function Home() {
  const [language, setLanguage] = useState("vi"); // Set default Language to Vietnamese
  const [splashDone, setSplashDone] = useReactState(false);
  const audioRef = useRef(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detect the browser's language and set it if supported, else default to English
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.userLanguage;
    const supportedLanguages = ["vi", "en"];
    const detectedLanguage = supportedLanguages.includes(browserLanguage.slice(0, 2))
      ? browserLanguage.slice(0, 2)
      : "vi";
    setLanguage(detectedLanguage);
  }, []);

  return (
    <main className={`relative w-full h-full`}>
      {/* Splash Screen */}
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} audioRef={audioRef} />}
      {/* BackgroundAudio luôn tồn tại, chỉ hiện nút play/pause khi đã vào thiệp */}
      <BackgroundAudio ref={audioRef} showButton={splashDone} />
      {/* Only render main content after splash is done */}
      {splashDone && (
        <>
          <LanguageDetector />
          <Navbar
            language={language}
            detectedLanguage={language}
            setLanguage={setLanguage}
          />
          <WelcomeSection language={language} />
          <div className="relative z-10">
            <SaveTheDate language={language} />
            <ScheduleSection language={language} />
            <InfoSection language={language} />
            <RSVPSection language={language} />
            <RegistrySection language={language} />
            <AttendingGuestsSection language={language} />
          </div>
        </>
      )}
    </main>
  );
}
