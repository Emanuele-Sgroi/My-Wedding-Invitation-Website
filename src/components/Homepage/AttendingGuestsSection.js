/**
 * @file AttendingGuestsSection.js
 * @description This component displays a list of guests who will attend the wedding, fetched from Firestore.
 * Multilingual!
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import images from "@/utils/imagesImport";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { motion } from "framer-motion";
import translations from "@/utils/translations";
import { Footer } from "@/components";

const AttendingGuestsSection = ({ language }) => {
  // Variants for framer motion animation
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Destructure translation strings
  const {
    title,
    description,
    loading_text,
    no_guests,
    total_attending,
  } = translations[language].attending_guests_section;

  const [attendingGuests, setAttendingGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attending guests from Firestore
  useEffect(() => {
    const fetchAttendingGuests = async () => {
      try {
        setLoading(true);
        // Get a reference to the "guests" collection
        const guestsCollectionRef = collection(db, "guests");

        // Fetch all guests first
        const querySnapshot = await getDocs(guestsCollectionRef);

        const guestsArray = [];
        querySnapshot.forEach((doc) => {
          const guestData = { id: doc.id, ...doc.data() };
          // Only include guests who are attending
          if (guestData.attending === "Yes") {
            guestsArray.push(guestData);
          }
        });

        // Sort by name alphabetically
        guestsArray.sort((a, b) => {
          const nameA = a.name?.toLowerCase() || "";
          const nameB = b.name?.toLowerCase() || "";
          return nameA.localeCompare(nameB);
        });

        setAttendingGuests(guestsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attending guests:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAttendingGuests();
  }, []);

  // Group guests by guestSide if needed
  const groupGuestsBySide = () => {
    const grouped = {
      her: [],
      him: [],
      other: [],
    };

    attendingGuests.forEach((guest) => {
      const side = guest.guestSide?.toLowerCase() || "";
      if (side.includes("karolina") || side.includes("quỳnh") || side.includes("her")) {
        grouped.her.push(guest);
      } else if (side.includes("emanuele") || side.includes("nhi") || side.includes("him")) {
        grouped.him.push(guest);
      } else {
        grouped.other.push(guest);
      }
    });

    return grouped;
  };

  const groupedGuests = groupGuestsBySide();

  return (
    <section
      id="attending-guests-section"
      className="relative w-full min-h-[120svh] md:min-h-svh bg-center bg-no-repeat bg-cover flex flex-col justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${images.collage.src})`,
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-full z-20 flex flex-col justify-start items-center px-4 md:px-12 pb-12 pt-32 md:pt-48"
      >
        <div className="flex justify-center items-start">
          <h3
            translate="no"
            className="sm:text-7xl font-bold z-20 -mr-5 sm:-mr-8 text-white"
          >
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-9xl alex-brush z-10 transform font-light"
          >
            {title.sub}
          </h3>
        </div>
        <p translate="no" className="md:max-w-[750px] text-white font-medium text-center">
          {description}
        </p>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 flex flex-col items-center">
            <div className="animate-spin w-[40px] h-[40px] border-4 border-gold border-t-transparent rounded-full"></div>
            <p translate="no" className="text-white mt-4">
              {loading_text}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 text-center">
            <p translate="no" className="text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* Guests List */}
        {!loading && !error && (
          <div className="w-full max-w-[900px] mt-8">
            {/* Total Count */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <p translate="no" className="text-white text-lg md:text-xl font-semibold">
                {total_attending}: <span className="text-gold">{attendingGuests.length}</span>
              </p>
            </motion.div>

            {/* No Guests */}
            {attendingGuests.length === 0 && (
              <div className="text-center mt-8">
                <p translate="no" className="text-white text-lg">
                  {no_guests}
                </p>
              </div>
            )}

            {/* Guests List */}
            {attendingGuests.length > 0 && (
              <div className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto bg-cream/90 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-gold/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {attendingGuests.map((guest, index) => (
                    <motion.div
                      key={guest.id || index}
                      initial="hidden"
                      whileInView="visible"
                      variants={itemVariants}
                      viewport={{ once: true }}
                      className="bg-white/90 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gold/20 hover:border-gold/50 hover:scale-[1.02]"
                    >
                      <p translate="no" className="text-gray-800 font-semibold text-sm md:text-base">
                        {guest.name}
                      </p>
                      {guest.guestSide && (
                        <p translate="no" className="text-gray-600 text-xs md:text-sm mt-1 italic">
                          {guest.guestSide}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Background */}
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-blue via-[#193b355e] z-10"></div>
      <div className="w-full h-full overlay z-[1] md:backdrop-blur-[2px]"></div>

      {/* Footer */}
      <Footer language={language} />
    </section>
  );
};

export default AttendingGuestsSection;
