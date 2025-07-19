"use client";
import { createContext, useContext, useState, useRef } from 'react';

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [globalIsPlaying, setGlobalIsPlaying] = useState(false);
  const activePlayerRef = useRef(null);

  const playMusic = (musicId, audioRef) => {
    // If there's already a playing track, pause it
    if (activePlayerRef.current && activePlayerRef.current !== audioRef) {
      activePlayerRef.current.pause();
    }
    
    // Set the new active player
    setCurrentPlayingId(musicId);
    setGlobalIsPlaying(true);
    activePlayerRef.current = audioRef;
  };

  const pauseMusic = () => {
    setGlobalIsPlaying(false);
    if (activePlayerRef.current) {
      activePlayerRef.current.pause();
    }
  };

  const stopMusic = () => {
    setCurrentPlayingId(null);
    setGlobalIsPlaying(false);
    activePlayerRef.current = null;
  };

  const isCurrentlyPlaying = (musicId) => {
    return currentPlayingId === musicId && globalIsPlaying;
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentPlayingId,
        globalIsPlaying,
        playMusic,
        pauseMusic,
        stopMusic,
        isCurrentlyPlaying,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
