/**
 * @file RSVPSection.js
 * @description This component manages the RSVP section of the wedding website. It allows guests to search their names, select attendance options, and submit special
 *              requests. The data is retrieved and updated in Firebase Firestore, and email notifications are sent upon submission. Multilingual!
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useState, useEffect, useRef } from "react";
import images from "@/utils/imagesImport";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import sendEmail from "@/utils/send-email";
import { motion, useScroll, useTransform } from "framer-motion";
import translations from "@/utils/translations";
import Image from "next/image";

const RSVPSection = ({ language }) => {
  // Destructure translation strings
  const {
    top_title,
    title,
    description_1,
    description_2,
    label,
    placeholder,
    no_found,
    multiple_guests_1,
    multiple_guests_2,
    single_guest_1,
    single_guest_2,
    answers,
    note_placeholder,
    rsvp_success,
    error_enter_name,
    error_submitting,
    button,
  } = translations[language].rsvp_section;

  const [searchTerm, setSearchTerm] = useState(""); // For the search input
  const [guestsList, setGuestsList] = useState([]); // Initialise empty array to store the guest list
  const [filteredGuests, setFilteredGuests] = useState([]); // Initialise empty array to store the filtered guest list
  const [selectedGuest, setSelectedGuest] = useState(null); // If null no guest is selected
  const [specialRequests, setSpecialRequests] = useState(""); // to store special requests
  const [guestsToRsvp, setGuestsToRsvp] = useState([]); // Initialise empty array to store the guests to rsvp
  const [errorMessage, setErrorMessage] = useState(""); // Error message string
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to check submission of rsvp
  const [showConfetti, setShowConfetti] = useState(false); // State to show confetti after submission
  const [pageHeight, setPageHeight] = useState(0); // State to store the height of the page
  const { width, height } = useWindowSize(); // Retrieve width and height from useWindowSize

  // Variants for framer motion animation
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

  const ref = useRef(null); // reference for framer motion animation

  // Use useScroll with a ref to the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for collage image for mobile
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  // Fetch guests from Firestore on component mount
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        // Get a reference to the "guests" collection
        const guestsCollectionRef = collection(db, "guests");

        // Fetch the documents
        const querySnapshot = await getDocs(guestsCollectionRef);

        const guestsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGuestsList(guestsArray);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    fetchGuests();
  }, [submitted]);

  // Filter the guests based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = guestsList.filter((guest) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests([]);
    }
  }, [searchTerm, guestsList]);

  // calculate page height for confetti
  useEffect(() => {
    const updatePageHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      setPageHeight(height);
    };

    // Initial height calculation
    updatePageHeight();

    // Update height on window resize
    window.addEventListener("resize", updatePageHeight);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updatePageHeight);
  }, []);

  // Handle searching the guest list
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // If the search term changes, reset the selected guest and related states
    if (selectedGuest) {
      setSelectedGuest(null);
      setGuestsToRsvp([]);
      setSubmitted(false);
      setErrorMessage("");
      setSpecialRequests("");
    }
  };

  // Handle guest selection from search results
  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    setSearchTerm("");
    setSubmitted(false);
    setErrorMessage("");
    setSpecialRequests("");

    // Set the main guest and related guests in the state, including attending
    const relatedGuests = guestsList.filter((g) =>
      guest.relationshipIds.includes(g.id)
    );

    const guestsWithAttending = [guest, ...relatedGuests].map((g) => ({
      ...g,
      attending: g.attending || "Unknown",
    }));

    setGuestsToRsvp(guestsWithAttending);
  };

  // Check if at least one guest is attending
  const hasAttendingGuests = () => {
    return (
      selectedGuest?.attending === "Yes" ||
      guestsToRsvp.some((guest) => guest.attending === "Yes")
    );
  };

  // Handle submitting the RSVP
  const handleSubmit = async () => {
    if (!isAnyCheckboxSelected()) {
      setErrorMessage(error_enter_name);
    } else {
      setErrorMessage("");
      setIsLoading(true);

      try {
        // Loop through the selected guests to update Firestore
        for (let guest of guestsToRsvp) {
          const guestDocRef = doc(db, "guests", String(guest.id));

          // Add special request or set note if RSVP done for related guests
          let note = specialRequests || "";

          if (guestsToRsvp.length > 1) {
            note = `${note} ---> RSVP done by ${selectedGuest?.name}`.trim();
          }

          await updateDoc(guestDocRef, {
            attending: guest.attending,
            note: note,
          });
        }

        // After successful Firestore update, check if we need to send an email
        const shouldSendEmail = guestsToRsvp.some(
          (guest) => guest.attending === "Yes" || guest.attending === "No"
        );

        if (shouldSendEmail) {
          // Construct the email content
          let emailContent = `${
            selectedGuest.name
          } submitted an RSVP from the website.\n\nRSVP Information:\n\nGuest who submitted the RSVP:\n- Name: ${
            selectedGuest.name
          }\n- Attending: ${guestsToRsvp[0]?.attending}\n- Notes: ${
            specialRequests || "None"
          }\n`;

          // If there are related guests, add their information
          if (guestsToRsvp.length > 1) {
            emailContent += `\nRelated Guests:\n`;
            guestsToRsvp.slice(1).forEach((guest) => {
              emailContent += `- Name: ${guest.name}\n  - Attending: ${guest.attending}\n\n`;
            });
          }

          // Prepare the email data
          const emailData = {
            subject: `New RSVP from ${selectedGuest?.name || "Guest"}`,
            message: emailContent || "No content provided",
          };

          // Send the email using EmailJS
          sendEmail(emailData)
            .then((result) => {
              console.log("Email sent successfully:", result.text);
            })
            .catch((error) => {
              console.error("Error sending email:", error);
              // Do not set error message for the user
            });
        }

        setIsLoading(false);
        setSubmitted(true);

        if (hasAttendingGuests()) {
          setShowConfetti(true);
        }
      } catch (error) {
        setErrorMessage(error_submitting);
        console.error("Error updating Firestore:", error);
        setIsLoading(false);
      }
    }
  };

  // Check if at least one checkbox is selected
  const isAnyCheckboxSelected = () => {
    return (
      (selectedGuest?.attending !== null &&
        selectedGuest?.attending !== undefined) ||
      guestsToRsvp.some(
        (guest) => guest.attending !== null && guest.attending !== undefined
      )
    );
  };

  // Helper function to format names
  const formatNames = (names) => {
    if (names.length === 0) {
      return "";
    } else if (names.length === 1) {
      return (
        <>
          {multiple_guests_1.and} <span className="font-bold">{names[0]}</span>
        </>
      );
    } else if (names.length === 2) {
      return (
        <>
          <span className="font-bold">{names[0]}</span> {multiple_guests_1.and}
          <span className="font-bold">{names[1]}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="font-bold">{names.slice(0, -1).join(", ")},</span>{" "}
          {multiple_guests_1.and}{" "}
          <span className="font-bold">{names[names.length - 1]}</span>
        </>
      );
    }
  };

  return (
    <section
      id="rsvp-section"
      className="relative flex flex-col w-full bg-cream"
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="confetti-wrapper">
          <Confetti
            width={width}
            height={pageHeight}
            colors={["#dcb46d"]}
            numberOfPieces={1250}
            recycle={false}
            gravity={0.1}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        </div>
      )}

      {/* Top section */}
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

      {/* Top section - Mobile */}
      <div className="md:hidden relative w-full h-[500px] overflow-hidden">
        <motion.div
          ref={ref}
          className="absolute w-full h-full"
          style={{ scale }}
        >
          <Image
            src={images.collage}
            alt="Collage"
            width={500}
            height={700}
            quality={100}
            className="absolute top-0 left-0 w-full h-full object-cover transform "
          />
        </motion.div>

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

      {/* main section */}
      <div className="w-full py-12 px-4 sm:px-6 xl:px-12 bg-cream flex flex-col lg:flex-row justify-center gap-4 lg:gap-12 xl:gap-44">
        {/* left part*/}
        <div className="w-full lg:w-1/2 flex justify-start lg:justify-end">
          <div className="flex flex-col items-start relative w-full max-w-full lg:max-w-lg text-left gap-0 lg:gap-6">
            <div className="flex flex-col items-start max-sm:w-full max-sm:items-center">
              <h3 translate="no" className=" font-bold z-20 ml-6 sm:ml-16">
                {title.main}
              </h3>
              <h3
                translate="no"
                className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-10"
              >
                {title.sub}
              </h3>
            </div>
            <p translate="no" className="text-left">
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
            <p translate="no" className="text-left">
              {description_2}
            </p>
          </div>
        </div>
        {/* right part*/}
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-start">
          <div className="w-full lg:max-w-[500px] flex flex-col justify-start items-start">
            <p translate="no">- {label}</p>
            {/* Search Input */}
            <input
              type="text"
              placeholder={placeholder}
              className="border py-2 px-3 rounded w-full max-lg:max-w-[500px] mb-4 focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
              autoComplete="on"
              translate="no"
            />

            {/* Display search results */}
            {searchTerm && filteredGuests.length > 0 && (
              <ul className="border p-2 w-full max-lg:max-w-[500px] rounded">
                {filteredGuests.map((guest) => (
                  <li
                    key={guest.id}
                    translate="no"
                    className="cursor-pointer hover:bg-gray-200 p-2 flex justify-start items-center gap-4"
                    onClick={() => handleGuestSelect(guest)}
                  >
                    {guest.name}
                  </li>
                ))}
              </ul>
            )}

            {/* If no guests are found */}
            {searchTerm && filteredGuests.length === 0 && (
              <p translate="no">{no_found}</p>
            )}

            {/* RSVP Form: Only visible after a guest is selected */}
            {selectedGuest && (
              <div className="mt-4 w-full flex flex-col justify-start items-start">
                {selectedGuest.relationshipIds.length === 0 ? (
                  <p translate="no" className="text-xl mb-6 text-left">
                    {single_guest_1.hi}
                    <span className="font-bold">{selectedGuest.name}!</span>
                    {single_guest_1.are_invited}
                  </p>
                ) : (
                  <p translate="no" className="text-xl mb-6 text-left">
                    {multiple_guests_1.hi}{" "}
                    <span className="font-bold">{selectedGuest.name}!</span>
                    {multiple_guests_1.you}
                    {formatNames(
                      guestsList
                        .filter((g) =>
                          selectedGuest.relationshipIds.includes(g.id)
                        )
                        .map((g) => g.name)
                    )}
                    {multiple_guests_1.are_invited}
                  </p>
                )}

                {/* Main Guest */}
                <div className=" flex flex-col items-start">
                  {selectedGuest.relationshipIds.length === 0 ? (
                    <p
                      translate="no"
                      className="font-semibold text-lg text-left"
                    >
                      {single_guest_2}
                    </p>
                  ) : (
                    <p
                      translate="no"
                      className="font-semibold text-lg text-left"
                    >
                      {multiple_guests_2}
                    </p>
                  )}

                  <div className="w-full flex justify-between  flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-4  max-sm:mb-6 pr-6">
                    <h2
                      translate="no"
                      className="text-xl font-bold text-left sm:mt-3"
                    >
                      {selectedGuest.name}
                    </h2>
                    <Select
                      // value={guestsToRsvp[0]?.attending}
                      onValueChange={(value) => {
                        // Update the attending value for the main guest in guestsToRsvp
                        setGuestsToRsvp((prevGuests) => {
                          const updatedGuests = [...prevGuests];
                          updatedGuests[0] = {
                            ...updatedGuests[0],
                            attending: value,
                          };
                          return updatedGuests;
                        });
                      }}
                    >
                      <SelectTrigger className="w-[215px] px-4 rounded-md bg-neutral-100">
                        <SelectValue
                          className="p-0"
                          translate="no"
                          placeholder={
                            guestsToRsvp[0]?.attending === "Unknown" ||
                            guestsToRsvp[0]?.attending === "unknown"
                              ? answers.unknown
                              : guestsToRsvp[0]?.attending === "Yes"
                              ? answers.yes
                              : answers.no
                          }
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
                  {/* Relatives or Group Members */}
                  {guestsToRsvp.slice(1).map((guest) => (
                    <div
                      key={guest.id}
                      className="w-full flex justify-between  flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-4  max-sm:mb-6 pr-6"
                    >
                      <h2
                        translate="no"
                        className="text-xl font-bold text-left sm:mt-3"
                      >
                        {guest.name}
                      </h2>
                      <Select
                        // value={guest.attending}
                        onValueChange={(value) => {
                          // Update the attending value for this guest
                          setGuestsToRsvp((prevGuests) =>
                            prevGuests.map((g) =>
                              g.id === guest.id ? { ...g, attending: value } : g
                            )
                          );
                        }}
                      >
                        <SelectTrigger
                          value={
                            guest.attending === "Unknown" ||
                            guest.attending === "unknown"
                              ? answers.unknown
                              : guest.attending === "Yes"
                              ? answers.yes
                              : answers.no
                          }
                          className="w-[215px] px-4 rounded-md bg-neutral-100"
                        >
                          <SelectValue
                            className="p-0"
                            translate="no"
                            placeholder={
                              guest.attending === "Unknown" ||
                              guest.attending === "unknown"
                                ? answers.unknown
                                : guest.attending === "Yes"
                                ? answers.yes
                                : answers.no
                            }
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
                  ))}
                </div>

                {/* Textarea for special requests */}
                <textarea
                  placeholder={note_placeholder}
                  className="border p-2 rounded w-full max-lg:max-w-[500px] sm:my-4 focus:outline-none"
                  value={specialRequests}
                  translate="no"
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  translate="no"
                  className="btn2 max-sm:mt-4"
                >
                  {isLoading ? button.loading : button.submit}
                </button>
                {/* Error Message */}
                {errorMessage && (
                  <p
                    translate="no"
                    className="text-red-500 mt-4 text-left text-lg"
                  >
                    {errorMessage}
                  </p>
                )}

                {/* Thank You Message */}
                {submitted && errorMessage.length === 0 && (
                  <div className="mt-4 w-full flex flex-col justify-start items-start">
                    <p translate="no" className="text-left">
                      <span className="font-bold">{rsvp_success.thanks}</span>{" "}
                      {rsvp_success.submitted}
                    </p>
                    <p translate="no" className="text-left text-lg -mt-4">
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
