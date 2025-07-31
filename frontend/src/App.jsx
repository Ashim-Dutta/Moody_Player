import React, { useState } from 'react'
import FaceDetection from './Components/FaceDetection'
import MoodSongs from './Components/Songs'


const App = () => {


      const [Songs, setSongs] = useState([
        {
          title: "test1",
          artist: "test_artist",
          url: "test_url",
        },
        {
          title: "test2",
          artist: "test_artist2",
          url: "test_url2",
        },
        {
          title: "test3",
          artist: "test_artist3",
          url: "test_url3",
        },
      ]);


  return (
    <div className='bg-black h-screen w-screen flex'>
      <FaceDetection setSongs={ setSongs} />
      <MoodSongs Songs={ Songs} />
    </div>
  )
}

export default App