/**
 * @file SaveTheDate.js
 * @description This component renders the 'Save the Date' section. Multilingual!
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState } from "react";
import translations from "@/utils/translations";
import images from "@/utils/imagesImport";
import Image from "next/image";
import ScrollingImages from "../ScrollingImages/ScrollingImages";
import { motion } from "framer-motion";
import { getCountdown } from "@/utils/countdownHelper";

const SaveTheDate = ({ language }) => {
  // Variants for framer motion animations
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };
  const tertiaryVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };
  const quartaryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.6, delay: 0.1 } },
  };

  // Get the countdown from the helper function
  const countdown = getCountdown();

  // Destructure translation strings
  const {
    title,
    title_cursive,
    date,
    place,
    story_1,
    story_2,
    story_3_future,
    story_3_past,
  } = translations[language].saveTheDate_section;

  // Render custom dashed line
  const dashedLine = Array(10)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  // Group story elements for convenience
  const story = [
    { year: 2025, text: story_1, img: "/icons/met.svg" },
    { year: 2025, text: story_2, img: "/icons/engaged.svg" },
    {
      year: 2025,
      text: countdown.message ? story_3_past : story_3_future,
      img: "/icons/marry.svg",
    },
  ];

  return (
    <section
      id="savethedate-section"
      className="relative w-full flex flex-col items-center pt-16 lg:pt-20 z-10 bg-cream overflow-hidden"
    >
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/50 to-cream z-0" />
      
      <div className="w-full flex flex-col items-center px-4 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={primaryVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src={images.dove}
            alt="rings"
            width={95}
            height={95}
            quality={100}
            className="mb-4"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center items-center"
        >
          <h3 translate="no" className="font-bold z-20">
            {title}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title_cursive}
          </h3>
        </motion.div>

        {dashedLine}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={primaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className="sloop-script tracking-wider text-black mt-4 text-3xl sm:text-4xl md:text-5xl"
        >
          {date}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className="text-gray-700"
        >
          {place}
        </motion.p>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-20 mt-12 sm:mt-16 lg:mt-20 px-4 z-10">
        {story.map((item, index) => (
          <div
            key={`${item.year} ${index}`}
            className="flex flex-col justify-center items-center z-10 group cursor-pointer"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={secondaryVariants}
              viewport={{ once: true, amount: 0.2 }}
              className="relative w-[140px] sm:w-[160px] h-[140px] sm:h-[160px] flex justify-center items-center mb-3 transition-transform duration-300 group-hover:scale-110"
            >
              {/* Outer decorative circle */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 group-hover:border-gold/60 transition-all duration-300" />
              {/* Inner decorative circle */}
              <div className="absolute inset-4 rounded-full border border-gold/20 group-hover:border-gold/40 transition-all duration-300" />
              <img
                src={item.img}
                alt={item.text}
                className="w-full h-auto z-10 relative"
              />
            </motion.div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={quartaryVariants}
              viewport={{ once: true, amount: 0.2 }}
              translate="no"
              className="text-center text-gray-800 font-medium group-hover:text-gold transition-colors duration-300"
            >
              {item.text}
            </motion.p>
          </div>
        ))}
      </div>
      {/* Parallax images are rendered here because are part of this section */}
      <ScrollingImages />
      <Image
        src={images.la1}
        alt={`Line art 1`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden absolute max-md:w-[300px] max-lg:w-[220px] max-xl:w-[350px] max-2xl:w-[450px] max-md:bottom-[900px] md:top-72 right-0 md:right-16 z-0 opacity-10 transition-opacity duration-500 hover:opacity-20`}
      />
      <Image
        src={images.la1}
        alt={`Line art 1`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden absolute max-lg:w-[250px] max-xl:w-[350px] top-72 left-16 z-0 opacity-10 transform scale-x-[-1] transition-opacity duration-500 hover:opacity-20`}
      />
    </section>
  );
};

export default SaveTheDate;
