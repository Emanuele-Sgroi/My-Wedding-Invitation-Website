/**
 * @file LanguageDropdown.js
 * @description A component that displays a language selection dropdown, allowing users to switch between supported languages (Vietnamese, English).
 *              This component handles its own dropdown menu and selection behavior without using Shadcn.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import images from "@/utils/imagesImport";

const LanguageDropdown = ({ detectedLanguage, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false); // State that listel to scroll behavior for changing the styles

  // useEffect for handling scrolling behaviour for changing the styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group drop down elements for convenience (only Vietnamese and English)
  const languages = [
    { code: "vi", label: "Tiếng Việt", flag: images.vietnam },
    { code: "en", label: "English", flag: images.english },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(null); // Initially null
  const [isOpen, setIsOpen] = useState(false); // if true, the drop down menu is open

  // Set the selected language based on detectedLanguage when it's available
  useEffect(() => {
    const initialLanguage = languages.find(
      (lang) => lang.code === detectedLanguage
    );
    setSelectedLanguage(initialLanguage);
  }, [detectedLanguage]);

  // Handle language change
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang); // Update the selected language in the dropdown
    setLanguage(lang.code); // Update the language in the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  if (!selectedLanguage) {
    return null; // Prevent rendering until language is set
  }

  return (
    <div className="absolute right-4 inline-block text-left z-[9999]">
      {/* The Select (Closed Menu) */}
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.label}
          width={25}
          height={25}
          className="brightness-95"
        />
        <FaChevronDown
          size={12}
          className={`ml-2 ${
            isScrolled ? "text-black" : "text-white"
          } max-lg:text-black`}
        />
      </div>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 w-40 bg-cream shadow-lg drop-shadow-2xl rounded-md p-2"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gold gap-2 my-1 ${
                selectedLanguage.code === lang.code ? "bg-gold" : ""
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={25}
                height={25}
                className="brightness-95"
              />
              <span className={`ml-2 text-black`}>{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
