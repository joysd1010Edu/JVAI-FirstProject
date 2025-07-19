import { MusicNav } from "@/components/Chat/music/MusicNav";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import React from "react";

const page = () => {
  return (
    <MusicPlayerProvider>
      <MusicNav />
    </MusicPlayerProvider>
  );
};

export default page;
