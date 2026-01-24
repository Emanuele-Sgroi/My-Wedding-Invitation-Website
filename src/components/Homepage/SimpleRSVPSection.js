/**
 * @file SimpleRSVPSection.js
 * @description Simple public RSVP form: guests just fill in their name,
 *              choose attendance and optionally leave a note.
 *              No need to search existing guest list or use any password.
 */

"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sendEmail from "@/utils/send-email";
import { motion } from "framer-motion";
import translations from "@/utils/translations";
import images from "@/utils/imagesImport";
import Image from "next/image";

const SimpleRSVPSection = ({ language }) => {
  // Translations
  const {
    top_title,
    title,
    description_1,
    description_2,
    single_guest_2,
    answers,
    note_placeholder,
    rsvp_success,
    error_enter_name,
    error_submitting,
    button,
  } = translations[language].rsvp_section;

  // Form state
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("Yes");
  const [specialRequests, setSpecialRequests] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  const { width } = useWindowSize();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Calculate page height for confetti
  useEffect(() => {
    const updatePageHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      setPageHeight(height);
    };

    updatePageHeight();
    window.addEventListener("resize", updatePageHeight);

    return () => window.removeEventListener("resize", updatePageHeight);
  }, []);

  const resetForm = () => {
    setGuestName("");
    setAttendance("Yes");
    setSpecialRequests("");
  };

  const handleSubmit = async () => {
    if (!guestName.trim()) {
      setErrorMessage(error_enter_name);
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // Save RSVP as a new document in "guests" collection
      await addDoc(collection(db, "guests"), {
        name: guestName.trim(),
        attending: attendance,
        note: specialRequests || "",
        createdFromSite: true,
        createdAt: new Date().toISOString(),
      });

      // Prepare email notification
      const emailContent = `A new RSVP has been submitted from the website.\n\nRSVP Information:\n\n- Name: ${guestName.trim()}\n- Attending: ${attendance}\n- Notes: ${
        specialRequests || "None"
      }\n`;

      const emailData = {
        subject: `New RSVP from ${guestName.trim() || "Guest"}`,
        message: emailContent || "No content provided",
      };

      // Fire-and-forget email; errors are logged only
      sendEmail(emailData).catch((error) => {
        console.error("Error sending email:", error);
      });

      setIsLoading(false);
      setSubmitted(true);

      if (attendance === "Yes") {
        setShowConfetti(true);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving RSVP:", error);
      setErrorMessage(error_submitting);
      setIsLoading(false);
    }
  };

  return (
    <section
      id="rsvp-section"
      className="relative w-full flex flex-col items-center pt-16 lg:pt-20 z-10 bg-cream overflow-hidden"
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-wrapper">
          <Confetti
            width={width}
            height={pageHeight}
            colors={["#dcb46d"]}
            numberOfPieces={900}
            recycle={false}
            gravity={0.1}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        </div>
      )}

      {/* Top banner (desktop) */}
      <div
        className="max-md:hidden relative w-full h-[500px] brightness-95 bg-cover bg-center bg-no-repeat md:bg-fixed flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage: `url(${images.collage.src})`,
        }}
      >
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.4 }}
          translate="no"
          className="absolute left-1/2 transform -translate-x-1/2 z-20 transition-transform text-9xl text-gold"
        >
          {top_title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <div className="overlay z-0"></div>
      </div>

      {/* Top banner (mobile) */}
      <div className="md:hidden relative w-full h-[500px] overflow-hidden">
        <Image
          src={images.collage}
          alt="Collage"
          width={500}
          height={700}
          quality={100}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.4 }}
          translate="no"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-transform text-7xl text-gold"
        >
          {top_title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <div className="overlay z-0"></div>
      </div>

      {/* Main section */}
      <div className="w-full flex flex-col items-center px-4 z-10">
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-20 lg:gap-24 mt-12 sm:mt-16 lg:mt-20 px-4 max-w-[1400px]">
          {/* Left part - Title and Description */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-end">
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right max-w-[500px]">
              <div className="flex flex-col items-center sm:items-end">
                <h3 translate="no" className="font-bold z-20">
                  {title.main}
                </h3>
                <h3
                  translate="no"
                  className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
                >
                  {title.sub}
                </h3>
              </div>
              <p translate="no" className="text-center sm:text-right">
                {description_1.map((item, index) =>
                  typeof item === "string" ? (
                    item
                  ) : (
                    <span key={index} className="font-bold">
                      {item.text}
                    </span>
                  )
                )}
              </p>
              <p translate="no" className="text-center sm:text-right">
                {description_2}
              </p>
            </div>
          </div>

          {/* Right part - Simple RSVP Form */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start">
            <div className="w-full max-w-[500px] flex flex-col items-center sm:items-start gap-6">
              {/* Name */}
              <div className="w-full flex flex-col items-center sm:items-start">
                <label
                  translate="no"
                  className="font-semibold mb-2 text-center sm:text-left font-cormorant"
                >
                  Họ tên / Name *
                </label>
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded-md bg-white/90 backdrop-blur-sm border border-gold/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300 font-cormorant text-base"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  translate="no"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              {/* Attendance */}
              <div className="w-full flex flex-col items-center sm:items-start">
                <p translate="no" className="font-semibold mb-2 text-center sm:text-left font-cormorant">
                  {single_guest_2}
                </p>
                <Select
                  value={attendance}
                  onValueChange={(value) => setAttendance(value)}
                >
                  <SelectTrigger className="w-full sm:w-[230px] px-4 rounded-md bg-white/90 backdrop-blur-sm border border-gold/30 focus:ring-2 focus:ring-gold/50 transition-all duration-300 font-cormorant">
                    <SelectValue
                      translate="no"
                      placeholder={answers.unknown}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes" translate="no">
                      {answers.yes}
                    </SelectItem>
                    <SelectItem value="No" translate="no">
                      {answers.no}
                    </SelectItem>
                    <SelectItem value="Unknown" translate="no">
                      {answers.unknown}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Note */}
              <div className="w-full flex flex-col items-center sm:items-start">
                <textarea
                  placeholder={note_placeholder}
                  className="w-full p-3 rounded-md bg-white/90 backdrop-blur-sm border border-gold/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300 font-cormorant text-base min-h-[100px] resize-y"
                  value={specialRequests}
                  translate="no"
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                translate="no"
                className="btn2 w-full sm:w-auto mb-4 sm:mb-6"
              >
                {isLoading ? button.loading : button.submit}
              </button>

              {/* Error */}
              {errorMessage && (
                <p
                  translate="no"
                  className="text-red-500 mt-2 text-center sm:text-left font-cormorant"
                >
                  {errorMessage}
                </p>
              )}

              {/* Thank you */}
              {submitted && !errorMessage && (
                <div className="mt-4 w-full flex flex-col items-center sm:items-start">
                  <p translate="no" className="text-center sm:text-left font-cormorant">
                    <span className="font-bold">{rsvp_success.thanks}</span>{" "}
                    {rsvp_success.submitted}
                  </p>
                  <p translate="no" className="text-center sm:text-left font-cormorant mt-2">
                    {rsvp_success.change_by.map((item, index) =>
                      typeof item === "string" ? (
                        item
                      ) : (
                        <span key={index} className="font-bold">
                          {item.text}
                        </span>
                      )
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleRSVPSection;

