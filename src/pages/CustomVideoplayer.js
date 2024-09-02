import React, { useRef, useState } from 'react';
import './CustomVideoplayer.css'

const CustomVideoPlayer = () => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [currentResolution, setCurrentResolution] = useState('720p');

  // Example video sources for different resolutions
  const resolutions = {
    '144p': '../assets/video144p.mp4',
    '240p': '../assets/video240p.mp4',
    '320p': '../assets/video320p.mp4',
    '480p': '../assets/video480p.mp4',
    '720p': '../assets/video720p.mp4',
    '1080p': '../assets/video1080p.mp4'
  };

  // Handler for changing video resolution
  const handleResolutionChange = (event) => {
    setCurrentResolution(event.target.value);
    setVideoSrc(resolutions[event.target.value]);
  };

  // Handler for video controls
  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // Gesture controls
  const handleGesture = (event) => {
    const { type, deltaY, deltaX } = event;

    if (type === 'wheel') {
      if (deltaY > 0) {
        videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
      } else {
        videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
      }
    } else if (type === 'swipe') {
      if (deltaX > 0) {
        videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
      } else {
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
      }
    }
  };

  return (
    <div
      className="video-player"
      onWheel={handleGesture}
      onSwipe={handleGesture} // Note: swipe events are not standard; you may need a custom implementation or a touch event library
    >
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        width="100%"
        height="auto"
        onClick={handlePlayPause}
      />
     <div>
        <label htmlFor="resolutions">Select Resolution:</label>
        <select
          id="resolutions"
          value={currentResolution}
          onChange={handleResolutionChange}
        >
          {Object.keys(resolutions).map((res) => (
            <option key={res} value={res}>{res}</option>
          ))}
        </select>
          </div>
    </div>
  );
};

export default CustomVideoPlayer;
