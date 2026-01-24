/**
 * @file ScrollingImages.js
 * @description Component that renders multiple layers of scrolling images with parallax effects, including animated text. This component is usd is 'SaveTheDate'.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useRef } from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const ScrollingImages = () => {
  const ref = useRef(null); // Reference for the framer motion animation

  // Use useScroll with a ref to the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for different layers using scrollYProgress
  const layer1X = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer2X = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const layer3X = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Parallax effect for text
  const textX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Group for first layer of images
  const group1 = [
    images.g_1_1,
    images.g_1_2,
    images.g_1_3,
    images.g_1_4,
    images.g_1_5,
    images.g_1_6,
  ];

  // Group for second layer of images
  const group2 = [
    images.g_2_1,
    images.g_2_2,
    images.g_2_3,
    images.g_2_4,
    images.g_2_5,
    images.g_2_6,
  ];

  // Group for third layer of images
  const group3 = [
    images.g_3_1,
    images.g_3_2,
    images.g_3_3,
    images.g_3_4,
    images.g_3_5,
    images.g_3_6,
  ];

  return (
    <div
      ref={ref}
      className="relative w-full flex flex-col items-center mt-12 sm:mt-16 lg:mt-20 z-[2] overflow-hidden"
    >
      {/* Image Layers */}
      <div className="w-full relative flex flex-col justify-center gap-2 md:gap-6 xl:gap-8 z-[2]">
        {/* Layer 1 */}
        <motion.div
          className="w-full flex justify-center gap-2 md:gap-6 xl:gap-8"
          style={{ x: layer1X }}
        >
          {group1.map((img, i) => (
            <div
              key={i}
              className="relative group flex-shrink-0 w-auto h-[120px] md:h-[160px] lg:h-[200px] xl:h-[230px]"
            >
              <Image
                src={img}
                alt={`image ${i + 1}`}
                width={400}
                height={400}
                quality={100}
                className="w-auto h-full object-cover object-center"
              />
            </div>
          ))}
        </motion.div>

        {/* Layer 2 */}
        <motion.div
          className="flex justify-center gap-2 md:gap-6 xl:gap-8"
          style={{ x: layer2X }}
        >
          {group2.map((img, i) => (
            <div
              key={i}
              className="relative group flex-shrink-0 w-auto h-[120px] md:h-[160px] lg:h-[200px] xl:h-[230px]"
            >
              <Image
                src={img}
                alt={`image ${i + 1}`}
                width={400}
                height={400}
                quality={100}
                className="w-auto h-full object-cover object-center"
              />
            </div>
          ))}
        </motion.div>

        {/* Layer 3 */}
        <motion.div
          className="flex justify-center gap-2 md:gap-6 xl:gap-8"
          style={{ x: layer3X }}
        >
          {group3.map((img, i) => (
            <div
              key={i}
              className="relative group flex-shrink-0 w-auto h-[120px] md:h-[160px] lg:h-[200px] xl:h-[230px]"
            >
              <Image
                src={img}
                alt={`image ${i + 1}`}
                width={400}
                height={400}
                quality={100}
                className="w-auto h-full object-cover object-center"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated Text */}
      <motion.div
        className="absolute bottom-[-12%]  md:bottom-[-15%] lg:bottom-[-16%] xl:bottom-[-18%] right-0 z-[3] flex items-center opacity-90"
        style={{ x: textX }}
      >
        <h1 className="text-gold font-bold text-[180px] md:text-[280px] lg:text-[380px] xl:text-[480px] drop-shadow-lg">
          N
        </h1>
        <FaHeart className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] text-gold mx-2 drop-shadow-lg animate-bounce" />
        <h1 className="text-gold font-bold text-[180px] md:text-[280px] lg:text-[380px] xl:text-[480px] drop-shadow-lg">
          Q
        </h1>
      </motion.div>
    </div>
  );
};

export default ScrollingImages;
