"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export const MusicNav = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [musicData, setMusicData] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);

  // Filter categories
  const filterCategories = ["All", "Relax", "Focus", "Sleep", "Energy"];

  const mockMusicData = [
    {
      id: 1,
      title: "Have relax1",
      artist: "jvi",
      music_file: "http://localhost:8000/media/music/peace-375599.mp3",
      banner: "http://10.10.12.53:8000/media/music_banners/OLGOEQ0.jpg",
      uploaded_at: "2025-07-17T20:51:31.660435Z",
      category: "Relax",
    },
    {
      id: 2,
      title: "Focus Music",
      artist: "jvi",
      music_file: "http://localhost:8000/media/music/focus-123.mp3",
      banner: "http://10.10.12.53:8000/media/music_banners/focus.jpg",
      uploaded_at: "2025-07-17T20:51:31.660435Z",
      category: "Focus",
    },
  ];

  useEffect(() => {
    // Initialize with mock data - replace with API call
    setMusicData(mockMusicData);
    setFilteredMusic(mockMusicData);
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);

    if (category === "All") {
      setFilteredMusic(musicData);
    } else {
      const filtered = musicData.filter(
        (music) =>
          music.category?.toLowerCase() === category.toLowerCase() ||
          music.title.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredMusic(filtered);
    }
  };

  return (
    <div className="py-5">
      {/* Navigation Bar */}
      <div className="bg-[#0e1c33] flex gap-3 text-white  rounded-lg mb-6">
        {filterCategories.map((category) => (
          <div
            key={category}
            className={`rounded-md px-5 py-4 cursor-pointer transition-all duration-300 ${
              activeFilter === category
                ? "bg-primary"
                : "bg-transparent hover:bg-primary/20"
            }`}
            onClick={() => handleFilterChange(category)}
          >
            <h1 className="font-medium">{category}</h1>
          </div>
        ))}
      </div>

      {/* Music Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMusic.map((music) => (
          <MusicCard key={music.id} music={music} />
        ))}
      </div>

      {filteredMusic.length === 0 && (
        <div className="text-center text-white/70 py-12">
          <p className="text-lg">
            No music found for "{activeFilter}" category
          </p>
        </div>
      )}
    </div>
  );
};

const MusicCard = ({ music }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative group bg-white rounded-xl ">
      <div className=" pb-7">
        <Image className=" rounded-xl w-11/12 mx-auto h-40 mt-3.5" src={music.banner} width={500} height={300} />
      </div>

      <div className=" flex justify-center gap relative">
        <div className=" text-center ">
          <h1 className=" font-semibold text-lg text-[#001B4B] ">{music.title}</h1>
          <p className=" text-sm text-[#001B4B]/70">{music.artist}</p>
        </div>
        <div className="absolute bottom-4 right-9">
          {isPlaying ? (
            <div className="flex  items-end space-x-1 h-8">
              {/* Animated Music Bars */}
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-1"
                style={{ height: "12px" }}
              ></div>
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-2"
                style={{ height: "24px" }}
              ></div>
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-3"
                style={{ height: "28px" }}
              ></div>
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-4"
                style={{ height: "16px" }}
              ></div>
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-5"
                style={{ height: "20px" }}
              ></div>
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-6"
                style={{ height: "14px" }}
              ></div>
              <div
                className="w-1 bg-[#001B4B] rounded-full animate-music-bar-7"
                style={{ height: "26px" }}
              ></div>
            </div>
          ) : (
            <button
              className="bg-primary text-white px-4 py-2 rounded-md mt-2"
              onClick={handlePlayPause}
            >
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
