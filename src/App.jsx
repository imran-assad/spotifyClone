import React, { useContext } from "react";
import { PlayerContext } from "./context/Playercontext";
import SideBar from "./components/SideBar";
import Player from "./components/Player";
import Display from "./components/Display";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <SideBar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto" />
    </div>
  );
};

export default App;
