"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import images from "@/utils/imagesImport";
import { Input } from "@/components/ui/input";
import { VscSearch } from "react-icons/vsc";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components";
import { motion } from "framer-motion";

const MusicSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const resultsRef = useRef(null);
  const audioRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [progress, setProgress] = useState(0);
  const [musicSpin, setMusicSpin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Function to fetch search results from the API
  const searchTracks = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/search-music?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.tracks.items);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setIsLoading(false);
    }
  };

  // Handle typing in the input field
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchTracks(value);
    setIsFocused(true); // Ensure it's focused when typing
  };

  // Handle clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setResults([]); // Close search results when clicking outside
        setIsFocused(false); // Reset focus state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to play or stop the song preview
  const handlePlayPreview = (previewUrl, trackId) => {
    if (currentlyPlaying === trackId) {
      // Stop current song
      setCurrentlyPlaying(null);
      setMusicSpin(false);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to start
      }
      setProgress(0);
    } else {
      // Play the selected song
      setCurrentlyPlaying(trackId);
      setMusicSpin(true);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = previewUrl;
        audioRef.current.play().catch((error) => {
          console.error("Audio play error:", error);
        });
      }
    }
  };

  // Handle the progress of the song preview
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  // When the song preview ends, reset the button to the play icon
  const handleAudioEnd = () => {
    setCurrentlyPlaying(null);
    setProgress(0);
    setMusicSpin(false);
    setIsPlaying(false);
  };

  // function to add songs to the playlist
  const addTrackToPlaylist = async (trackUri) => {
    try {
      setIsAddingTrack(true);
      const response = await fetch("/api/add-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackUri }),
      });

      const data = await response.json();

      if (response.ok) {
        //success toast
        toast({
          variant: "success",
          title: "Song Added to the Playlist",
          description: "Would you like to add another song?",
        });
        setIsAddingTrack(false);
      } else {
        console.error("Failed to add track to playlist:", data);
        toast({
          variant: "destructive",
          title: "Unable to Add Song",
          description:
            "We're sorry, but something went wrong on our end. Please try again later.",
        });
        setIsAddingTrack(false);
      }
    } catch (error) {
      console.error("Error adding track to playlist:", error);
      toast({
        variant: "destructive",
        title: "Unable to Add Song",
        description:
          "We're sorry, but something went wrong on our end. Please try again later.",
      });
      setIsAddingTrack(false);
    }
  };

  // speed up the background video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // (130% speed)
      videoElement.playbackRate = 1.3;
    }
  }, []);

  return (
    <section
      id="music-section"
      className="relative w-full h-[120svh] md:h-svh bg-center bg-no-repeat bg-cover flex flex-col justify-start overflow-hidden"
      style={{
        backgroundImage: `url(${images.musicsect.src})`,
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
            className=" sm:text-7xl font-bold z-20  -mr-5 sm:-mr-8 text-white"
          >
            OUR
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-9xl alex-brush z-10 transform font-light"
          >
            Playlist
          </h3>
        </div>
        <p translate="no" className="md:max-w-[750px] text-white font-medium">
          Help us shape the perfect soundtrack! Share your favorite songs for
          background vibes or dance floor fun, and we&apos;ll add them to our
          wedding playlist.
        </p>

        {/* Music Input */}
        <div
          ref={containerRef}
          className="relative max-w-[500px] w-full h-14 bg-slate-50 rounded-md flex justify-center items-center mt-2 md:mt-8 py-2 px-3"
        >
          <Image
            src={images.spotify}
            alt="spotify"
            width={95}
            height={95}
            quality={100}
            className={`w-[35px] h-auto ${
              musicSpin ? "animate-spin-music" : ""
            }`}
          />
          <Input
            translate="no"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Type the song name"
            className="bg-slate-50 font-serif h-10 mb-4 focus:outline-none focus:ring-0 text-lg border-none mt-4 "
          />
          <button
            onClick={() => {
              if (query.trim() !== "") {
                searchTracks(query);
                setIsFocused(true);
              }
            }}
            className="transform active:scale-[0.98]"
          >
            <BsFillSearchHeartFill
              size={30}
              className="transform scale-x-[-1] text-neutral-500 "
            />
          </button>
          {/* Display spinner */}
          {loading && (
            <div className="absolute right-[-40px]">
              <Image
                src={images.spinner}
                alt="Searching..."
                width={30}
                height={30}
                quality={100}
                className="animate-spin w-[30px] h-[30px]"
              />
            </div>
          )}
        </div>

        {/* Display search results */}
        {isFocused && results.length > 0 && (
          <div
            ref={resultsRef}
            className="max-w-[500px] max-h-[400px] w-full bg-slate-50 rounded-lg mt-1 py-3 px-4 overflow-auto"
          >
            <p
              translate="no"
              className="text-[10px] md:text-sm font-serif font-extralight text-green-500"
            >
              * Some songs can&apos;t play here, but you can still add them.
            </p>
            <ul className="w-full flex flex-col justify-center items-start gap-2">
              {results.map((track) => (
                <li
                  key={track.id}
                  className="w-full flex justify-between items-center border-b last:border-none gap-2"
                >
                  <div>
                    <p translate="no" className="text-left">
                      {track.artists[0].name} - {track.name}
                    </p>
                  </div>
                  <div className="relative mb-3 flex justify-start items-center">
                    {/* Conditionally render the play button only if preview_url exists */}
                    {track.preview_url && (
                      <button
                        className="mr-2 flex justify-center items-center"
                        onClick={() =>
                          handlePlayPreview(track.preview_url, track.id)
                        }
                      >
                        {currentlyPlaying === track.id ? (
                          <FaStop
                            size={15}
                            className="text-neutral-500 mr-[6px]"
                          />
                        ) : (
                          <IoPlay size={25} className="text-neutral-500" />
                        )}
                      </button>
                    )}

                    {/* Add Button */}
                    <button
                      disabled={isAddingTrack}
                      onClick={() => addTrackToPlaylist(track.uri)}
                      className="transform active:scale-[0.95]"
                    >
                      <IoIosAddCircle
                        size={35}
                        className={`${
                          isAddingTrack ? "text-green-300" : "text-green-500"
                        }`}
                      />
                    </button>

                    {/* Progress Bar (positioned below the buttons) */}
                    {currentlyPlaying === track.id && (
                      <div
                        className="absolute bottom-[-5px] left-0 h-[2px] bg-neutral-500 transition-all duration-300 ease-linear"
                        style={{ width: `${progress}%` }}
                      ></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display fixed stop button and progress */}
        {isPlaying && (
          <div className="fixed top-24 right-4 w-[40px] h-[40px]">
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-20 ml-[3px]"
              onClick={() => handlePlayPreview(null, currentlyPlaying)}
            >
              <FaStop size={22} className=" text-gold mr-[6px]" />
            </button>
            <CircularProgressbar
              value={progress}
              strokeWidth={3}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              styles={buildStyles({
                strokeLinecap: "butt",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(220, 180, 109)`,
                trailColor: `transparent`,
              })}
            />
          </div>
        )}
      </motion.div>

      {/* Background */}
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-blue via-[#0c142c5e] z-10"></div>
      <div className="w-full h-full overlay z-[1] md:backdrop-blur-[2px]"></div>
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover object-center opacity-40 md:opacity-20 mix-blend-screen z-0 ${
            musicSpin ? "animate-pulse duration-1000" : ""
          }`}
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src="/videos/bg_particles.webm" type="video/webm" />
        </video>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnd}
      />
      <Footer />
    </section>
  );
};

export default MusicSection;
