import React, { useEffect, useState, useRef, createContext } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  console.log("current value in audio ref", audioRef.current);

  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [track, setTrack] = useState(songsData[0]); // Ensure initial track is set
  const [playerStatus, setPlayStatus] = useState(false);
  console.log(track);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // const playWithId = async (id) => {
  //   setTrack(songsData[id]);
  //   if (audioRef.current) {
  //     await audioRef.current.play();
  //     setPlayStatus(true);
  //   } else {
  //     console.error("audioRef is null");
  //   }
  // };
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };
  // useEffect(() => {
  //   const updateSeekBar = () => {
  //     if (audioRef.current && seekBar.current && audioRef.current.duration) {
  //       seekBar.current.style.width = `${
  //         (audioRef.current.currentTime / audioRef.current.duration) * 100
  //       }%`;

  //       setTime({
  //         currentTime: {
  //           second: Math.floor(audioRef.current.currentTime % 60),
  //           minute: Math.floor(audioRef.current.currentTime / 60),
  //         },
  //         totalTime: {
  //           second: Math.floor(audioRef.current.duration % 60),
  //           minute: Math.floor(audioRef.current.duration / 60),
  //         },
  //       });
  //     }
  //   };

  //   if (audioRef.current) {
  //     audioRef.current.ontimeupdate = updateSeekBar;
  //   }

  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.ontimeupdate = null; // Clean up
  //     }
  //   };
  // }, [audioRef, seekBar]);
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
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
    }, 1000);
  }, [audioRef]);

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
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
