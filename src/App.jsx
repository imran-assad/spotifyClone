import React, { useContext } from "react";
import { PlayerContext } from "./context/Playercontext";
import SideBar from "./components/SideBar";
import Player from "./components/Player";
import Display from "./components/Display";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData && songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <SideBar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio ref={audioRef} src={track ? track.file : ""} preload="auto" />
    </div>
  );
};

export default App;
