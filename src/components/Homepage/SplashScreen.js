/**
 * @file SplashScreen.js
 * @description This component renders the Splash Screen, visible when opening/reloading the website.
 * @author D Skaly
 * @date 20 February 2026
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Homepage.module.scss";

const SplashScreen = ({ onDone, audioRef }) => {
  const [showButton, setShowButton] = useState(false);
  const [hideSplash, setHideSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState([]);

  // Generate random particles for background effect
  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Simulate loading process
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Show button after splash animation
    const btnTimer = setTimeout(() => setShowButton(true), 2500);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(btnTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOpenInvite = async () => {
    // Play audio directly when button is clicked
    // Try multiple times to ensure audioRef is available
    let audioElement = null;
    let attempts = 0;
    const maxAttempts = 20; // Increased from 10 to 20
    const delay = 100; // Increased from 50ms to 100ms
    
    console.log("[SplashScreen] Starting to look for audio ref...");
    
    while (attempts < maxAttempts && !audioElement) {
      console.log("[SplashScreen] Attempt", attempts + 1, "audioRef.current:", audioRef.current);
      
      if (audioRef.current) {
        console.log("[SplashScreen] audioRef.current exists, checking audioRef:", audioRef.current.audioRef);
        
        if (audioRef.current.audioRef) {
          console.log("[SplashScreen] audioRef.current.audioRef exists, checking current:", audioRef.current.audioRef.current);
          
          if (audioRef.current.audioRef.current) {
            audioElement = audioRef.current.audioRef.current;
            console.log("[SplashScreen] Audio ref found on attempt", attempts + 1);
            break;
          }
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
      attempts++;
    }
    
    if (audioElement) {
      // Unmute first
      if (audioRef.current.setMuted) {
        audioRef.current.setMuted(false);
        console.log("[SplashScreen] Unmuted via setMuted");
      }
      
      // Ensure audio is unmuted on the element itself
      audioElement.muted = false;
      console.log("[SplashScreen] Unmuted audio element");
      
      // Wait for audio to be ready
      if (audioElement.readyState < 2) {
        console.log("[SplashScreen] Waiting for audio to be ready...");
        await new Promise((resolve) => {
          const checkReady = setInterval(() => {
            if (audioElement.readyState >= 2) {
              clearInterval(checkReady);
              console.log("[SplashScreen] Audio ready");
              resolve();
            }
          }, 100);
          
          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkReady);
            console.log("[SplashScreen] Audio ready timeout");
            resolve();
          }, 5000);
        });
      }
      
      // Try to play the audio
      if (typeof audioElement.play === 'function') {
        try {
          await audioElement.play();
          console.log("[SplashScreen] Audio playing successfully");
        } catch (err) {
          console.error("[SplashScreen] Audio play error:", err);
          
          // If autoplay is blocked, try to play with user gesture simulation
          if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
            console.log("[SplashScreen] Audio autoplay blocked. Trying alternative method...");
            
            // Try to play again after a short delay
            setTimeout(async () => {
              try {
                await audioElement.play();
                console.log("[SplashScreen] Audio playing after retry");
              } catch (retryErr) {
                console.error("[SplashScreen] Audio still not playing:", retryErr);
              }
            }, 100);
          }
        }
      }
    } else {
      console.warn("[SplashScreen] Audio ref not available after", maxAttempts, "attempts");
      console.log("[SplashScreen] Final audioRef.current:", audioRef.current);
    }
    
    setHideSplash(true);
    document.body.style.overflow = "auto";
    if (typeof onDone === "function") onDone();
  };

  // Hide splash screen with smooth transition
  if (hideSplash) {
    return null;
  }

  return (
    <div className={styles.splashScreen}>
      {/* Background particles */}
      <div className={styles.particles}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/* Main content */}
      <div className={styles.content}>
        {/* Desktop: Side by side layout */}
        <div className={styles.desktopText}>
          {["Xin Chào", "Hello"].map((text, index) => (
            <div key={index} className={styles.textContainer}>
              <p translate="no" className={`${styles.word} alex-brush`}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Stacked layout */}
        <div className={styles.mobileText}>
          {["Xin Chào", "Hello"].map((text, index) => (
            <p
              key={index}
              translate="no"
              className={`${styles.word_mobile} alex-brush`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Open Invitation Button */}
        {showButton && (
          <button
            onClick={handleOpenInvite}
            className={styles.openInviteBtn}
          >
            <span className="alex-brush">Mở Thiệp / Open Invitation</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
