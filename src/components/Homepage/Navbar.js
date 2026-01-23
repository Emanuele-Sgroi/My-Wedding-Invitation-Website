/**
 * @file Navbar.js
 * @description Optimized Navbar component with enhanced performance, accessibility, and UX.
 * Includes responsive mobile menu with smooth animations and multilingual support.
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 * @version 2.0
 */

"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import translations from "@/utils/translations";
import { Link as ScrollLink } from "react-scroll";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";

// Constants for better maintainability
const SCROLL_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 1024;
const DESKTOP_DURATION = 1900;
const MOBILE_DURATION = 2500;
const DESKTOP_OFFSET = -62;
const MOBILE_OFFSET = -50;
const MOBILE_MENU_OFFSET = -51;
const DESKTOP_MENU_OFFSET = -63;
const SCROLL_THROTTLE_MS = 100;
const RESIZE_THROTTLE_MS = 150;

// Section IDs for navigation
const SECTION_IDS = {
  WELCOME: "welcome-section",
  SAVE_THE_DATE: "savethedate-section",
  SCHEDULE: "schedule-section",
  INFO: "info-section",
  RSVP: "rsvp-section",
  REGISTRY: "gift-section",
  MUSIC: "music-section",
};

/**
 * Navbar Component
 * @param {Object} props - Component props
 * @param {string} props.language - Current language
 * @param {string} props.detectedLanguage - Detected language
 * @param {Function} props.setLanguage - Function to set language
 */
const Navbar = ({ language, detectedLanguage, setLanguage }) => {
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Refs for DOM elements
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // SSR safety check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized translation strings
  const translationsData = useMemo(() => {
    if (!isClient || !translations[language]) return {};
    return translations[language].navbar;
  }, [language, isClient]);

  // Memoized navigation elements
  const navElements = useMemo(() => {
    if (!translationsData) return [];

    const { welcome, save_the_date, schedule, info, rsvp, registry, music } =
      translationsData;

    return [
      { name: welcome, link: SECTION_IDS.WELCOME },
      { name: save_the_date, link: SECTION_IDS.SAVE_THE_DATE },
      { name: schedule, link: SECTION_IDS.SCHEDULE },
      { name: info, link: SECTION_IDS.INFO },
      { name: rsvp, link: SECTION_IDS.RSVP },
      { name: registry, link: SECTION_IDS.REGISTRY },
      { name: music, link: SECTION_IDS.MUSIC },
    ];
  }, [translationsData]);

  // Memoized scroll configuration
  const scrollConfig = useMemo(
    () => ({
      duration: isMobile ? MOBILE_DURATION : DESKTOP_DURATION,
      offset: isMobile ? MOBILE_OFFSET : DESKTOP_OFFSET,
      menuOffset: isMobile ? MOBILE_MENU_OFFSET : DESKTOP_MENU_OFFSET,
    }),
    [isMobile]
  );

  // Throttled resize handler
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      const isMobileScreen = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileScreen);
    }
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled(isScrolled);
    }
  }, []);

  // Setup resize listener
  useEffect(() => {
    if (!isClient) return;

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient, handleResize]);

  // Setup scroll listener
  useEffect(() => {
    if (!isClient) return;

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient, handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isClient) return;

    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobile, isClient]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    },
    [isMenuOpen]
  );

  // Setup keyboard listener
  useEffect(() => {
    if (!isClient) return;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isClient, handleKeyDown]);

  // Toggle menu with focus management
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      if (newState) {
        // Focus close button when opening
        setTimeout(() => closeButtonRef.current?.focus(), 100);
      } else {
        // Focus menu button when closing
        menuButtonRef.current?.focus();
      }
      return newState;
    });
  }, [menuButtonRef, closeButtonRef]);

  // Close menu handler
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, [menuButtonRef]);

  // Handle link click with menu close
  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      closeMenu();
    }
  }, [isMobile, closeMenu]);

  // Memoized nav link props
  const navLinkProps = useMemo(
    () => ({
      smooth: true,
      duration: scrollConfig.duration,
      className: "cursor-pointer tracking-widest hover:text-gold transition-colors duration-300",
    }),
    [scrollConfig.duration]
  );

  // Render desktop navigation
  const renderDesktopNav = useMemo(
    () => (
      <ul className="w-full hidden lg:flex justify-center max-[1130px]:justify-start px-4 gap-5 xl:gap-8">
        {navElements.map((el) => (
          <li key={el.link}>
            <ScrollLink
              translate="no"
              to={el.link}
              {...navLinkProps}
              offset={scrollConfig.offset}
              className={`${navLinkProps.className} max-xl:text-[18px]`}
            >
              {el.name}
            </ScrollLink>
          </li>
        ))}
      </ul>
    ),
    [navElements, navLinkProps, scrollConfig.offset]
  );

  // Render mobile menu
  const renderMobileMenu = useMemo(
    () => (
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-cream transition-transform duration-700 ease-in-out z-50 lg:hidden ${
          !isMenuOpen ? "-translate-y-full" : "translate-y-0"
        } overflow-y-auto`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="relative w-full h-full flex flex-col items-center pt-6">
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={closeMenu}
            className="absolute top-4 text-black focus:outline-none focus:ring-2 focus:ring-gold rounded"
            aria-label="Close Menu"
          >
            <TfiClose size={24} />
          </button>

          {/* Navigation Links */}
          <ul className="w-full h-full flex flex-col gap-8 justify-center items-center px-6">
            {navElements.map((el) => (
              <li key={el.link}>
                <ScrollLink
                  onClick={handleLinkClick}
                  to={el.link}
                  {...navLinkProps}
                  offset={scrollConfig.menuOffset}
                  className={`${navLinkProps.className} text-lg`}
                >
                  {el.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    [
      isMenuOpen,
      navElements,
      navLinkProps,
      scrollConfig.menuOffset,
      closeMenu,
      handleLinkClick,
    ]
  );

  // Render loading state for SSR
  if (!isClient || !translationsData) {
    return (
      <nav className="w-full fixed top-0 z-20 flex justify-center items-center py-4 bg-transparent text-white">
        <div className="w-full hidden lg:flex justify-center px-4 gap-5 xl:gap-8">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-6 w-20 bg-white/20 rounded animate-pulse" />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`w-full fixed top-0 z-20 flex justify-center items-center py-4 transition-colors duration-300 ${
        isScrolled
          ? "bg-cream text-black shadow-md"
          : "bg-transparent text-white"
      } max-lg:bg-cream max-lg:text-black`}
      role="navigation"
      aria-label="Main navigation"
    >
      {renderDesktopNav}

      {/* Mobile Menu Button */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="lg:hidden text-black focus:outline-none focus:ring-2 focus:ring-gold rounded p-2"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle mobile menu"
      >
        <RxHamburgerMenu size={18} />
      </button>

      {/* Language Dropdown */}
      <LanguageDropdown
        detectedLanguage={detectedLanguage}
        setLanguage={setLanguage}
      />

      {/* Mobile Menu */}
      {renderMobileMenu}
    </nav>
  );
};

export default Navbar;
