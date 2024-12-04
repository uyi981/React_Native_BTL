import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [fullVideos, setFullVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const addVideo = (video) => {
    setFullVideos((prevVideos) => [...prevVideos, video]);
    console.log(video);
  };
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://172.16.1.142:5000/videos');
      if (response.data.success) {
        setFullVideos(response.data.videos); // Lưu vào state videos
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false); // Đặt loading thành false khi xong
    }
  };

  return (
    <VideoContext.Provider value={{ fullVideos,setFullVideos, addVideo,fetchVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
