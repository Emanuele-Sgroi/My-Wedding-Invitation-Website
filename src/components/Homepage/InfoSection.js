/**
 * @file InfoSection.js
 * @description This component renders the information section of the homepage,
 * including wedding details, accommodations, and travel information. Multilingual!
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import Link from "next/link";
import React from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion } from "framer-motion";
import translations from "@/utils/translations";

const InfoSection = ({ language }) => {
  // Variants for framer motion animation
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  // Destructure translation strings
  const { title, details, accommodations, travel_transport, contact } =
    translations[language].info_section;

  //Extract couple contacts from env
  const coupleEmail = process.env.NEXT_PUBLIC_EMAIL;
  const herNumber = process.env.NEXT_PUBLIC_K_NUM;
  const hisNumberUk = process.env.NEXT_PUBLIC_E_NUM_UK;
  const hisNumberIt = process.env.NEXT_PUBLIC_E_NUM_IT;

  return (
    <section
      id="info-section"
      className="bg-cream px-4 sm:px-12 py-12 flex flex-col relative"
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12"
      >
        <Image
          src={images.bell}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <div className="flex justify-center items-start">
          <h3 translate="no" className=" font-bold z-20  -mr-8">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      <div
        translate="no"
        className=" w-full text-center flex flex-col items-center gap-8 md:gap-12 z-10"
      >
        {/* Top Detail*/}
        <div className="flex flex-col justify-center items-center">
          <h5 translate="no" className="mb-4">
            {details.when_where}
          </h5>
          <p translate="no">
            {details.dates.map((item, index) =>
              typeof item === "string" ? (
                item
              ) : (
                <span key={index} className="font-bold">
                  {item.text}
                </span>
              )
            )}
          </p>
          <p translate="no" className="mt-[-16px]">
            {details.location.map((item, index) =>
              typeof item === "string" ? (
<<<<<<< HEAD
                <span
                  key={index}
                
             
                >
                  {item}
                </span>
=======
                <span key={index}>{item}</span>
>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))
              ) : (
                <span key={index} className="font-bold">
                  {item.text}
                </span>
              )
            )}
          </p>

          <Link
<<<<<<< HEAD
                  href={`https://przypatykach.pl/`}
                  target="_blank"
                  className="flex justify-center items-center gap-1 border border-gold rounded-lg px-2 py-1 mt-2 font-light text-sm"
                >
                  <Image src={images.location} alt="Location" className="w-auto h-[25px]"/>{details.button_loc}
                </Link>

        </div>
        
     
=======
            href={`https://przypatykach.pl/`}
            target="_blank"
            className="flex justify-center items-center gap-1 border border-gold rounded-lg px-2 py-1 mt-2 font-light text-sm"
          >
            <Image
              src={images.location}
              alt="Location"
              className="w-auto h-[25px]"
            />
            {details.button_loc}
          </Link>
        </div>
>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))

        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />

        {/* Middle Details (Left & Right) */}
        <div className="w-full flex flex-col md:flex-row md:justify-evenly max-md:items-center gap-8 md:gap-20">
          {/* Left Detail */}
          <div className="w-full md:w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
            <h5 translate="no" className="mb-4">
              {accommodations.title}
            </h5>
            <p translate="no">
              {accommodations.description_1.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
            <p translate="no" className=" mt-3">
              {accommodations.breakfast.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
<<<<<<< HEAD
          </div>
          <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
=======
            <p translate="no" className=" mt-3">
              {accommodations.checkout.map((item, index) =>
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
          <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />

>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))
          {/* Right Detail */}
          <div className="w-full md:w-1/2 max-w-[700px] flex flex-col justify-start items-center text-center">
            <h5 translate="no" className="mb-4">
              {travel_transport.title}
            </h5>

            <p translate="no">
              {travel_transport.description_1.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
            </p>
<<<<<<< HEAD
            <p translate="no">
=======

            <p translate="no" className="font-bold mb-1">
              {travel_transport.transport_details.arrival.title}
            </p>

            <p translate="no" className="mb-1">
              {travel_transport.transport_details.arrival.desc1.map(
                (item, index) =>
                  typeof item === "string" ? (
                    item
                  ) : (
                    <span key={index} className="font-bold">
                      {item.text}
                    </span>
                  )
              )}
            </p>
            <p translate="no">
              {travel_transport.transport_details.arrival.desc2.map(
                (item, index) =>
                  typeof item === "string" ? (
                    item
                  ) : (
                    <span key={index} className="font-bold">
                      {item.text}
                    </span>
                  )
              )}
            </p>

            <p translate="no" className="font-bold mb-1">
              {travel_transport.transport_details.departure.title}
            </p>

            <p translate="no">
              {travel_transport.transport_details.departure.desc1.map(
                (item, index) =>
                  typeof item === "string" ? (
                    item
                  ) : (
                    <span key={index} className="font-bold">
                      {item.text}
                    </span>
                  )
              )}
            </p>

            {/* <p translate="no">
>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))
              {travel_transport.description_2.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
<<<<<<< HEAD
            </p>
            <p translate="no">
=======
            </p> */}
            {/* <p translate="no">
>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))
              {travel_transport.description_3.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
<<<<<<< HEAD
            </p>
            <p translate="no">
=======
            </p> */}
            {/* <p translate="no">
>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))
              {travel_transport.description_4.map((item, index) =>
                typeof item === "string" ? (
                  item
                ) : (
                  <span key={index} className="font-bold">
                    {item.text}
                  </span>
                )
              )}
<<<<<<< HEAD
            </p>
=======
            </p> */}
>>>>>>> 6122174 (Made few changes, as the wedding date is getting closer :))
          </div>
        </div>
        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
        {/* bottom Detail*/}
        <div className=" max-w-[700px] flex flex-col justify-center items-center">
          <h5 translate="no" className="mb-4">
            {contact.title}
          </h5>
          <p translate="no" className="max-sm:flex max-sm:flex-col">
            <span className="font-bold">Email: </span>{" "}
            <a
              href={`mailto:${coupleEmail}`}
              target="_blank"
              className="underline underline-offset-4 decoration-1"
            >
              {coupleEmail}
            </a>
          </p>
          <p translate="no" className="max-sm:flex max-sm:flex-col">
            <span className="font-bold">Karolina: </span>{" "}
            <a href={`tel:${herNumber.replace(/\s+/g, "")}`} target="_blank">
              {herNumber}
            </a>
          </p>
          <p translate="no" className="max-sm:flex max-sm:flex-col">
            <span className="font-bold">Emanuele: </span>{" "}
            <span>
              <a
                href={`tel:${hisNumberUk.replace(/\s+/g, "")}`}
                target="_blank"
              >
                {hisNumberUk}
              </a>{" "}
              {"(UK)"}
              <span className="max-sm:hidden">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
            </span>
            <span>
              <a
                href={`tel:${hisNumberIt.replace(/\s+/g, "")}`}
                target="_blank"
              >
                {hisNumberIt}
              </a>{" "}
              {"(IT)"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
