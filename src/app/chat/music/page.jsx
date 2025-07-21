import { MusicNav } from "@/components/Chat/music/MusicNav";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import React from "react";

const page = () => {
  return (
    <div className=" lg:px-52 ">
      <MusicPlayerProvider>
        <MusicNav />
      </MusicPlayerProvider>
    </div>
  );
};

export default page;
