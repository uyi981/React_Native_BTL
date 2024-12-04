import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const ip = '172.16.1.142';
  const videoUrl = `http://${ip}:3000/videos`;
  const commentUrl = `http://${ip}:3000/comments`;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const addVideo = (videos) => {
    setVideos((prevVideos) => [...prevVideos, videos]);
  };
  const fetchVideos = async () => {
    try {
      const response = await axios.get(videoInfoUrl);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    finally{
      setLoading(false); // Đặt loading thành false khi xong
    }
  };

  return (
    <VideoContext.Provider value={{videos,setVideos, addVideo,fetchVideos,videoUrl,commentUrl }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
