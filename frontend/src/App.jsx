import React, { useState } from 'react'
import FaceDetection from './Components/FaceDetection'
import MoodSongs from './Components/Songs'


const App = () => {


      const [Songs, setSongs] = useState([
      ]);


  return (
    <div className='bg-black h-screen w-screen flex'>
      <FaceDetection setSongs={ setSongs} />
      <MoodSongs Songs={ Songs} />
    </div>
  )
}

export default App