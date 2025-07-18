import { MusicNav } from "@/components/Chat/music/MusicNav";
import React from "react";

const page = () => {
  return (
    <div
      className="min-h-[100vh] lg:px-52"
      style={{
        background:
          "radial-gradient(circle at top right, #0129F480 , black 40%)",
      }}
    >
      <div>
        <MusicNav />
      </div>
    </div>
  );
};

export default page;
