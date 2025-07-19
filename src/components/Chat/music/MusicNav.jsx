"use client";
import { useAxios } from "@/providers/AxiosProvider";

import { useState, useEffect, useRef } from "react";
import { MusicCard } from "./MusicCard";

export const MusicNav = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [musicData, setMusicData] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [favoritesUpdated, setFavoritesUpdated] = useState(0); 
  const axios = useAxios();
 
  

  const [filterCategories, setCategories] = useState(["All", "Favorites"]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get("/api/music");
        console.log("Fetched music data:", response.data);
        response.data?.map((item) => {
          console.log(item.category, item.id);

          setCategories((prev) => [
            ...new Set([
              ...prev,
              item.category.charAt(0).toUpperCase() +
                item.category.slice(1).toLowerCase(),
            ]),
          ]);
        });
        setMusicData(response.data);
        setFilteredMusic(response.data);
      } catch (error) {
        console.error("Error fetching music data:", error);
        setMusicData([]);
        setFilteredMusic([]);
      }
    };

    fetchData();
  }, []);

  // Effect to refresh favorites when favoritesUpdated changes
  useEffect(() => {
    if (activeFilter === "Favorites" && favoritesUpdated > 0) {
      handleFilterChange("Favorites");
    }
  }, [favoritesUpdated]);

  const handleFilterChange = async (category) => {
    setActiveFilter(category);

    if (category === "All") {
      setFilteredMusic(musicData);
    } else if (category === "Favorites") {
      // Fetch user's favorite music
      const UserId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
      if (!UserId) {
        console.error("User not logged in");
        setFilteredMusic([]);
        return;
      }

      try {
        const response = await axios.get(`/api/music/favorites/`);
        console.log("Fetched favorites data:", response.data);
        setFilteredMusic(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setFilteredMusic([]);
      }
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
      <div className="bg-[#0e1c33] flex gap-3 text-white rounded-lg mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {filteredMusic.map((music) => (
          <MusicCard 
            key={music.id} 
            music={music} 
            onFavoritesUpdate={() => setFavoritesUpdated(prev => prev + 1)}
          />
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
