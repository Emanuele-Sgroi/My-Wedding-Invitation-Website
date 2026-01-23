/**
 * @file SplashScreen.js
 * @description This component renders the Splash Screen, visible when opening/reloading the website.
 * @author D Skaly
 * @date 20 February 2026
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Homepage.module.scss";
// import BackgroundAudio from "../BackgroundAudio/BackgroundAudio";

const SplashScreen = ({ onDone, audioRef }) => {

  const [showButton, setShowButton] = useState(false);
  const [hideSplash, setHideSplash] = useState(false);
  // Nhận audioRef từ props, không tạo mới

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Show button after splash animation (e.g., 3.5s)
    const btnTimer = setTimeout(() => setShowButton(true), 3500);
    return () => {
      clearTimeout(btnTimer);
      document.body.style.overflow = "auto";
    };
  }, []);


  const handleOpenInvite = () => {
    // Play audio trực tiếp khi bấm nút, đảm bảo tương thích trình duyệt
    if (audioRef.current && audioRef.current.audioRef && audioRef.current.audioRef.current) {
      const a = audioRef.current.audioRef.current;
      if (audioRef.current.setMuted) {
        audioRef.current.setMuted(false);
      }
      if (typeof a.play === 'function') {
        a.play().then(() => {
          console.log("[SplashScreen] audio.play() success");
        }).catch((err) => {
          console.error("[SplashScreen] audio.play() error", err);
        });
      }
    } else {
      console.warn("[SplashScreen] audioRef not ready", audioRef.current);
    }
    setHideSplash(true);
    document.body.style.overflow = "auto";
    if (typeof onDone === "function") onDone();
  };

  // Chỉ ẩn splash và chữ Xin Chào/Hello sau khi bấm nút
  if (hideSplash) {
    return null;
  }

  return (
    <>
      <div className={styles.splashScreen}>
        {/* Vietnamese and English */}
        {["Xin Chào", "Hello"].map((text, index) => (
          <div key={index} className={styles.textContainer}>
            <p translate="no" className={`${styles.word} alex-brush`}>
              {text}
            </p>
          </div>
        ))}
        {/* Vietnamese  and English */}
        {["Xin Chào", "Hello"].map((text, index) => (
          <p
            key={index}
            translate="no"
            className={`${styles.word_mobile} alex-brush`}
          >
            {text}
          </p>
        ))}
        {showButton && (
          <button
            onClick={handleOpenInvite}
            className={
              `${styles.openInviteBtn} absolute bottom-12 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full z-50`
            }
            style={{ minWidth: 180 }}
          >
            <span className="alex-brush">Mở Thiệp / Open Invitation</span>
          </button>
        )}
      </div>
    </>
  );
};

export default SplashScreen;
