import React, { useState } from 'react'
import './MoodSongs.css'
import "remixicon/fonts/remixicon.css";

const MoodSongs = ({ Songs}) => {

  const [isPlaying, setIsPlaying] = useState(null)
  
  const handlePlayPause=(index) => { 
    if (isPlaying === index) {
      setIsPlaying(null)
    } else { 
      setIsPlaying(index)
    }
  }



  return (
    <div className="mood-songs  max-w-[50%]  flex flex-col">
      <h1 className='text-3xl font-bold uppercase'>Recommended Songs</h1>

      {Songs.map((song, index) => (
        <div className="song" key={index}>
          <div className="title">
            <h2 className='text-2xl font-bold'>{song.title}</h2>
            <h2 className='text-sm'>{song.artist}</h2>
          </div>
          <div className="play-pause-button">
            

            { 
              isPlaying === index &&
              <audio src={song.audio}
                style={{ display: 'none' }}
                autoPlay={ isPlaying === index}
              ></audio>
              
            }

            <button className='cursor-pointer' onClick={()=>handlePlayPause(index)}>
              { 
                isPlaying === index ? <i className="ri-pause-line text-3xl"></i>:<i className="ri-play-circle-fill text-3xl"></i>
              }
            </button>


            
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoodSongs