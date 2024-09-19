import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useRef } from "react";
import { songsData } from "../assets/frontend-assets/assets";
export const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playerStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };
  useEffect(() => {
    const handleTimeUpdate = () => {
      seekBar.current.style.width =
        Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        ) + "%";
      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
    };

    audioRef.current.ontimeupdate = handleTimeUpdate;

    return () => {
      audioRef.current.ontimeupdate = null; // Clean up the event listener
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
  };
  return (
    <>
      <PlayerContext.Provider value={contextValue}>
        {props.children}
      </PlayerContext.Provider>
    </>
  );
};

export default PlayerContextProvider;
