import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useAxios } from "@/providers/AxiosProvider";
import Image from "next/image";
import { FaForward , FaBackward , FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

export const MusicCard = ({ music, onFavoritesUpdate }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const audioRef = useRef(null);
  const axios = useAxios();
  const UserId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
  
  
  const { playMusic, pauseMusic, isCurrentlyPlaying, currentPlayingId } = useMusicPlayer();
  const isPlaying = isCurrentlyPlaying(music.id);

  // Check if music is already in favorites when component mounts
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!UserId) return;
      
      try {
        
        const response = await axios.get(`/api/music/favorites/`);
        const favorites = response.data;
        const isAlreadyFavorite = favorites.some(fav => fav.music_id === music.id || fav.id === music.id);
        setIsFavorite(isAlreadyFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkIfFavorite();
  }, [music.id, UserId]);

  // Effect to pause this audio when another audio starts playing
  useEffect(() => {
    if (currentPlayingId !== music.id && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [currentPlayingId, music.id, music.title]);

  const handleAddToFavorites = async () => {
    if (!UserId) {
      console.error("User not logged in");
      return;
    }

    if (isAddingToFavorites) return; // Prevent multiple clicks

    setIsAddingToFavorites(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await axios.delete(
          `http://localhost:8000/api/music/favorites/${UserId}/remove_music/`,
          {
            data: { music_id: music.id }
          }
        );

        if (response.status === 200 || response.status === 204) {
          setIsFavorite(false);
          console.log(`Successfully removed ${music.title} from favorites`);
          // Notify parent component to refresh favorites
          if (onFavoritesUpdate) {
            onFavoritesUpdate();
          }
        }
      } else {
        // Add to favorites
        const response = await axios.post(
          `http://localhost:8000/api/music/favorites/${UserId}/add_music/`,
          {
            music_id: music.id
          }
        );

        if (response.status === 200 || response.status === 201) {
          setIsFavorite(true);
          console.log(`Successfully added ${music.title} to favorites`);
          // Notify parent component to refresh favorites
          if (onFavoritesUpdate) {
            onFavoritesUpdate();
          }
        }
      }
    } catch (error) {
      console.error(`Error updating favorites for ${music.title}:`, error);
      // Handle specific error cases
      if (error.response?.status === 400) {
        console.log("Music might already be in favorites");
        setIsFavorite(true); // Assume it's already favorited
      }
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      if (audioRef.current) {
        playMusic(music.id, audioRef.current);
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
     
      setDuration(audioDuration);
      audioRef.current.volume = volume;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleVolumeClick = (e) => {
    const volumeBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = volumeBar.offsetWidth;
    const newVolume = clickX / width;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      const newVolume = volume === 0 ? 0.5 : volume;
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration > 0) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      
      const clampedTime = Math.max(0, Math.min(duration, newTime));
      console.log(`Progress bar seek for ${music.title}:`, { 
        clampedTime, 
        wasPlaying: !audioRef.current.paused,
        musicId: music.id,
        duration
      });
      
      // Store the current play state
      const wasPlaying = !audioRef.current.paused;
      
      // Seek to new position
      audioRef.current.currentTime = clampedTime;
      
      // Maintain the previous play state
      if (wasPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      } else if (!wasPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    } else {
      console.log(`Progress click failed for ${music.title}:`, {
        hasAudioRef: !!audioRef.current,
        duration,
        musicId: music.id
      });
    }
  };

  const handleSkipBackward = () => {
 
    
    if (audioRef.current) {
      const currentAudioTime = audioRef.current.currentTime;
      const newTime = Math.max(0, currentAudioTime - 10);
      console.log(`Setting backward time for ${music.title}:`, { currentAudioTime, newTime });
      
      // Store the current play state
      const wasPlaying = !audioRef.current.paused;
      
      // Seek to new position
      audioRef.current.currentTime = newTime;
      
      // Maintain the previous play state
      if (wasPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      } else if (!wasPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    } else {
      console.log(`Backward skip failed for ${music.title}:`, {
        hasAudioRef: !!audioRef.current,
        duration,
        musicId: music.id
      });
    }
  };

  const handleSkipForward = () => {
      
    if (audioRef.current) {
      const currentAudioTime = audioRef.current.currentTime;
      const audioDuration = audioRef.current.duration || duration || 300; // fallback to 5 minutes if duration unknown
      const newTime = Math.min(audioDuration, currentAudioTime + 10);
      console.log(`Setting forward time for ${music.title}:`, { currentAudioTime, newTime, audioDuration });
      
      // Store the current play state
      const wasPlaying = !audioRef.current.paused;
      
      // Seek to new position
      audioRef.current.currentTime = newTime;
      
      // Maintain the previous play state
      if (wasPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      } else if (!wasPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    } else {
      console.log(`Forward skip failed for ${music.title}:`, {
        hasAudioRef: !!audioRef.current,
        duration,
        musicId: music.id
      });
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = duration - currentTime;

  return (
    <div className="relative group bg-white rounded-xl ">
      <div className=" pb-7">
        <Image
          className=" rounded-xl w-11/12 mx-auto h-40 mt-3.5"
          alt="Music Banner"
          src={music.banner}
          width={500}
          height={300}
        />
        <div className="absolute top-6 right-6 group">
          <button
            onClick={handleAddToFavorites}
            disabled={isAddingToFavorites || !UserId}
            className={`p-1 rounded-full transition-all duration-300 ${
              isFavorite 
                ? 'bg-[#005CFF] text-white' 
                : 'text-white hover:bg-[#005CFF] hover:text-white'
            } ${isAddingToFavorites ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isFavorite ? (
              <IoStar size={24} />
            ) : (
              <IoStarOutline size={24} />
            )}
          </button>
        </div>
      </div>
      {/* Music Info */}
      <div className=" flex justify-center gap relative">
        <div className=" text-center ">
          <h1 className=" font-semibold text-lg text-[#001B4B] ">
            {music.title}
          </h1>
          <p className=" text-sm text-[#001B4B]/70">{music.artist}</p>
        </div>
        <div className="absolute bottom-4 right-9">
          {isPlaying && (
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
          )}
        </div>
      </div>
      {/* Audio Player */}
      <div id="AudioPlayer" className="px-4 pb-4">
        
        <audio
          ref={audioRef}
          src={music.music_file}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
           
            pauseMusic();
            setCurrentTime(0);
          }}
          
         
          preload="metadata"
        />

        
        <div className="flex items-center gap-3 mt-3">
          {/* Current Time */}
          <span className="text-sm font-medium text-[#001B4B] min-w-[35px]">
            {formatTime(currentTime)}
          </span>

          {/* Progress Bar */}
          <div 
            className="flex-1 bg-[#001B4B] rounded-full h-1.5 cursor-pointer relative overflow-hidden hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div 
              className="bg-[#005CFF] h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            {/* Progress indicator dot */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#005CFF] rounded-full shadow-lg border-2 border-white opacity-0 hover:opacity-100 transition-opacity duration-200"
              style={{ left: `calc(${progressPercentage}% - 6px)` }}
            ></div>
          </div>

          {/* Remaining Time */}
          <span className="text-sm font-medium text-gray-700 min-w-[40px]">
            -{formatTime(remainingTime)}
          </span>
        </div>

        {/* Volume Control */}
        {isPlaying&&<div className="flex items-center gap-3 mt-3">
          {/* Volume Icon */}
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-8 h-8 text-[#001B4B] hover:text-[#005CFF] transition-colors duration-200"
          >
            {isMuted || volume === 0 ? (
              <FaVolumeMute size={16} />
            ) : volume < 0.5 ? (
              <FaVolumeDown size={16} />
            ) : (
              <FaVolumeUp size={16} />
            )}
          </button>

          {/* Volume Progress Bar */}
          <div 
            className="flex-1 bg-[#001B4B] rounded-full h-1.5 cursor-pointer relative overflow-hidden max-w-[120px]"
            onClick={handleVolumeClick}
          >
            <div 
              className="bg-[#005CFF] h-full transition-all duration-300 ease-out"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            ></div>
          </div>

          {/* Volume Percentage */}
          <span className="text-xs font-medium text-[#001B4B] min-w-[35px]">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>}
      </div>

      {/* Play Controls */}
      <div id="PlayPause" className="flex justify-center items-center gap-6 py-4">
        {/* Backward 10s Button */}
        <button
          onClick={handleSkipBackward}
          className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-full transition-colors duration-200"
          disabled={!audioRef.current}
        >
         <FaBackward className={`${!audioRef.current ? 'text-gray-400' : 'text-[#001B4B] hover:text-[#005CFF]'}`} size={28} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="flex items-center justify-center w-16 h-16 duration-200 hover:bg-gray-100 rounded-full transition-colors"
          disabled={!audioRef.current}
        >
          {isPlaying ? (
            // Pause Icon
            <FaPause className={`${!audioRef.current ? 'text-gray-400' : 'text-[#001B4B] hover:text-[#005CFF]'}`} size={28} />
          ) : (
            // Play Icon
            <FaPlay className={`${!audioRef.current ? 'text-gray-400' : 'text-[#001B4B] hover:text-[#005CFF]'}`} size={28} />
          )}
        </button>

        {/* Forward 10s Button */}
        <button
          onClick={handleSkipForward}
          className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-full transition-colors duration-200"
          disabled={!audioRef.current}
        >
          <FaForward className={`${!audioRef.current ? 'text-gray-400' : 'text-[#001B4B] hover:text-[#005CFF]'}`} size={28} />
        </button>
      </div>

    </div>
  );
};