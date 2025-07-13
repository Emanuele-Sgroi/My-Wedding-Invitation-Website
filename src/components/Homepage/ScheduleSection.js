/**
 * @file ScheduleSection.js
 * @description This component renders the Schedule section, which is a timeline of the wedding. Multilingual!
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion } from "framer-motion";
import translations from "@/utils/translations";

const ScheduleSection = ({ language }) => {
  // Variants for framer motion animations
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };
  const tertiaryVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Destructure translation strings
  const { title, description, day_1, day_2 } =
    translations[language].schedule_section;

  // Group timeline data for convenience
  const timelineData = [
    {
      day: day_1.title,
      events: [
        {
          time: day_1.events.ceremony.time,
          title: day_1.events.ceremony.title,
          icon: "/icons/ceremony.svg",
        },
        {
          time: day_1.events.dinner.time,
          title: day_1.events.dinner.title,
          icon: "/icons/dinner.svg",
        },
        // {
        //   time: day_1.events.dance.time,
        //   title: day_1.events.dance.title,
        //   icon: "/icons/dance.svg",
        // },
        {
          time: day_1.events.photo.time,
          title: day_1.events.photo.title,
          icon: "/icons/photobooth.svg",
        },
        {
          time: day_1.events.cake_cutting.time,
          title: day_1.events.cake_cutting.title,
          icon: "/icons/cake.svg",
        },
        {
          time: day_1.events.pig.time,
          title: day_1.events.pig.title,
          icon: "/icons/dish.svg",
        },
        {
          time: day_1.events.games.time,
          title: day_1.events.games.title,
          icon: "/icons/games.svg",
        },
        {
          time: day_1.events.party.time,
          title: day_1.events.party.title,
          icon: "/icons/repeat1.svg",
        },
      ],
    },
    {
      day: day_2.title,
      events: [
        {
          time: day_2.events.after.time,
          title: day_2.events.after.title,
          icon: "/icons/after.svg",
        },
        {
          time: day_2.events.vespa.time,
          title: day_2.events.vespa.title,
          icon: "/icons/vespa.svg",
        },
        {
          time: day_2.events.party_continues.time,
          title: day_2.events.party_continues.title,
          icon: "/icons/repeat2.svg",
        },
        {
          time: day_2.events.end.time,
          title: day_2.events.end.title,
          icon: "/icons/end.svg",
        },
      ],
    },
  ];

  return (
    <section
      id="schedule-section"
      className="py-12 px-4 sm:px-6 bg-blue relative flex justify-center items-center flex-col overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10"
      >
        <Image
          src={images.glasses}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-white font-bold z-20 ">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title.sub}
          </h3>
        </div>
        <p translate="no" className=" text-center text-white ">
          {description}
        </p>
      </motion.div>
      {/* Timeline */}
      <div className="relative w-full flex flex-col items-center gap-8 mt-12">
        <div className="absolute  top-0 w-px h-[100%] border border-gold border-dashed z-0"></div>
        {timelineData.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="w-full flex flex-col items-center gap-8 z-10"
          >
            <div className="w-[103px] h-[103px] md:w-[128px] md:h-[128px] lg:w-[148px] lg:h-[148px] flex justify-center items-center rounded-full border border-gold bg-blue">
              <h3 translate="no" className="alex-brush mt-2 text-white">
                {day.day}
              </h3>
            </div>
            {day.events.map((ev, evIndex) => (
              <div
                key={evIndex}
                className="w-full flex flex-col max-md:bg-blue max-md:pt-4"
              >
                <div
                  className={`flex justify-center items-center max-md:flex-col-reverse ${
                    evIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-[50%] xl:w-[600px] flex ${
                      evIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    } items-center`}
                  >
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      variants={
                        evIndex % 2 === 0 ? tertiaryVariants : secondaryVariants
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      className={`flex flex-1 flex-col ${
                        evIndex % 2 === 0
                          ? "md:items-end md:mr-6"
                          : "md:items-start md:ml-6"
                      } max-md:items-center justify-start max-md:pt-4`}
                    >
                      <p
                        translate="no"
                        className="md:hidden text-center bg-white text-blue rounded-xl px-2 flex justify-center items-center"
                      >
                        {ev.time}
                      </p>

                      <h5
                        translate="no"
                        className="leading-3 text-gold max-md:mb-4"
                      >
                        {ev.title}
                      </h5>
                    </motion.div>
                    <div
                      className={`max-lg:hidden h-px w-[50px] xl:w-[120px] bg-gold flex items-center ${
                        evIndex % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div className="h-[7px] w-[7px] rounded-full bg-gold"></div>
                    </div>
                  </div>
                  <div className="relative w-[140px] h-[140px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px]  xl:w-[190px] xl:h-[190px] flex justify-center items-center p-4 xl:p-6">
                    <div className="w-full h-full  absolute  z-[1] bg-white border-4 border-gold rounded-full" />
                    <img
                      src={ev.icon}
                      alt={ev.title}
                      className="w-full h-auto z-10 "
                    />
                  </div>

                  <div
                    className={`max-md:hidden w-[50%] xl:w-[600px] ${
                      evIndex % 2 === 0 ? "items-start" : "items-end"
                    }`}
                  >
                    <p
                      translate="no"
                      className={`font-semibold text-white ${
                        evIndex % 2 !== 0 ? "text-right mr-4" : "text-left ml-4"
                      } m-0`}
                    >
                      {ev.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
