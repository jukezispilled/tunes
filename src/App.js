import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { FaPlay } from 'react-icons/fa';

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const audioRef = useRef(null);

  const songs = [
    {
      title: 'Stayin\' Alive',
      src: 'https://ia800701.us.archive.org/21/items/BeeGeesStayinAlive_201811/Bee%20Gees%20-%20Stayin%27%20Alive.mp3',
    },
    // Add more songs as needed
  ];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true); // Auto play next song
  };

  const handlePlayFromModal = () => {
    setShowModal(false);
    setIsPlaying(true);
  };

  return (
    <div className='h-screen w-screen relative overflow-clip'>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-5xl mb-4 font-custom">HEYYY FREN</h2>
            <button
              className="block text-3xl font-custom mx-auto animated-gradientt text-white py-3 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300"
              onClick={handlePlayFromModal}
            >
              LISTEN
            </button>
          </div>
        </div>
      )}
      <div className="absolute inset-0 overflow-clip rotate-45 -z-10 hidden md:block">
        <Marquee speed={145}>
          <span className="text-5xl md:text-8xl font-semibold font-custom animated-gradient">
            tunes tunes tunes tunes tunes tunes tunes tunes tunes tunes tunes tunes tunes tunes tunes&nbsp;
          </span>
        </Marquee>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <motion.img
            src="/tunes.png"
            alt="Tunes"
            className="-mt-[7.5%] w-[70%] md:w-[45%] h-auto"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        autoPlay={isPlaying} // Auto play based on isPlaying state
        onEnded={nextSong}
      />

      {/* Buy Now Button */}
      <div className="fixed left-6 bottom-10">
        <a href="https://pump.fun/board"
          className="animated-gradientt font-custom text-5xl md:text-7xl text-white py-3 px-6 rounded-full transition-colors duration-300"
        >
          BUY
        </a>
      </div>
    </div>
  );
}

export default App;