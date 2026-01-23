/**
 * @file index.js
 * @description Exports all components used in the homepage for easy imports in other files.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import dynamic from "next/dynamic";

export { default as SplashScreen } from "./Homepage/SplashScreen";
export { default as WelcomeSection } from "./Homepage/WelcomeSection";
export { default as SaveTheDate } from "./Homepage/SaveTheDate";
export { default as ScheduleSection } from "./Homepage/ScheduleSection";
export { default as InfoSection } from "./Homepage/InfoSection";
export { default as RSVPSection } from "./Homepage/RSVPSection";
export { default as RegistrySection } from "./Homepage/RegistrySection";
export { default as MusicSection } from "./Homepage/MusicSection";
export { default as Navbar } from "./Homepage/Navbar";
export { default as Footer } from "./Homepage/Footer";
export const BackgroundAudio = dynamic(() => import("./BackgroundAudio/BackgroundAudio.jsx"), { ssr: false });
