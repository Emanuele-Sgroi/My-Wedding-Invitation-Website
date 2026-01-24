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
  NavbarSection,
  WelcomeSection,
  SaveTheDate,
  ScheduleSection,
  InfoSection,
  RSVPSection,
  GiftSection,
  AttendingGuestsSection,
  BackgroundAudio,
} from "@/components";

export default function Home() {
  const [language, setLanguage] = useState("vi"); // Set default Language to Vietnamese
  const [splashDone, setSplashDone] = useState(false);
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
          <NavbarSection
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
            <GiftSection language={language} />
            <AttendingGuestsSection language={language} />
          </div>
        </>
      )}
    </main>
  );
}
