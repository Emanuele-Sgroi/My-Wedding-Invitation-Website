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
    { year: 2018, text: story_1, img: images.met },
    { year: 2022, text: story_2, img: images.engaged },
    {
      year: 2025,
      text: countdown.message ? story_3_past : story_3_future,
      img: images.marry,
    },
  ];

  return (
    <section
      id="savethedate-section"
      className="relative w-full flex flex-col items-center pt-16 lg:pt-20 z-10 bg-cream overflow-hidden"
    >
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
            className="mb-4 "
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center items-center"
        >
          <h3 translate="no" className=" font-bold z-20 ">
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
          className="sloop-script tracking-wider text-black mt-4"
        >
          {date}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
        >
          {place}
        </motion.p>
      </div>

      <div className="w-full flex flex-col sm:flex-row  justify-center items-center gap-8 md:gap-20 lg:gap-24 mt-12 sm:mt-16 lg:mt-20 px-4 z-10">
        {story.map((item, index) => (
          <div
            key={`${item.year} ${index}`}
            className="flex flex-col justify-center items-center z-10"
          >
            <motion.h4
              initial="hidden"
              whileInView="visible"
              variants={quartaryVariants}
              viewport={{ once: true, amount: 0.2 }}
              translate="no"
              className="max-sm:hidden"
            >
              {item.year}
            </motion.h4>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={tertiaryVariants}
              viewport={{ once: true, amount: 0.2 }}
              className="w-[140px] sm:w-[160px] h-[140px] sm:h-[160px] border-4 border-gold rounded-full flex justify-center items-center mb-3"
            >
              <Image
                src={item.img}
                alt={item.text}
                width={85}
                height={85}
                quality={100}
                className={`w-[80px] sm:w-[100px] h-[80px] sm:h-[100px]   z-10`}
              />
            </motion.div>
            <motion.h4
              initial="hidden"
              whileInView="visible"
              variants={quartaryVariants}
              viewport={{ once: true, amount: 0.2 }}
              translate="no"
              className="sm:hidden mb-0"
            >
              {item.year}
            </motion.h4>
            <motion.p
              initial="hidden"
              whileInView="visible"
              variants={quartaryVariants}
              viewport={{ once: true, amount: 0.2 }}
              translate="no"
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
        className={`max-md:hidden absolute max-md:w-[300px] max-lg:w-[220px] max-xl:w-[350px] max-2xl:w-[450px] max-md:bottom-[900px] md:top-72 right-0 md:right-16 z-0 opacity-10`}
      />
      <Image
        src={images.la1}
        alt={`Line art 1`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden absolute max-lg:w-[250px] max-xl:w-[350px] top-72 left-16 z-0 opacity-10 transform scale-x-[-1]`}
      />
    </section>
  );
};

export default SaveTheDate;
