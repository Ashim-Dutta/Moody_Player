import React, { useState } from 'react'
import './MoodSongs.css'
import "remixicon/fonts/remixicon.css";

const MoodSongs = ({ Songs}) => {





  return (
    <div className="mood-songs  max-w-[30%] flex flex-col justify-center">
      <h1>Recommended Songs</h1>

      {Songs.map((song, index) => (
        <div className="song" key={index}>
          <div className="title">
            <h3>{song.title}</h3>
            <h3>{song.artist}</h3>
          </div>
          <div className="play-pause-button ">
            <i className="ri-pause-line"></i>
            <i className="ri-play-fill"></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoodSongs