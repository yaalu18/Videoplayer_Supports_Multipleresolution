import React, { useRef, useState, useEffect } from 'react';

const CustomVideoPlayer1 = () => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');
  const [currentResolution, setCurrentResolution] = useState('720p');
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(1); // Track volume for volume control

  // Example video sources for different resolutions
  const resolutions = {
    '144p': '../assets/video144p.mp4',
    '240p': '../assets/video240p.mp4',
    '320p': '../assets/video320p.mp4',
    '480p': '../assets/video480p.mp4',
    '720p':'../assets/video720p.mp4',
    '1080p': '../assets/video1080p.mp4',
  };

  // Set the initial video source when component mounts
  useEffect(() => {
    setVideoSrc(resolutions[currentResolution]);
  }, [currentResolution]);

  // Handler for changing video resolution
  const handleResolutionChange = (event) => {
    setCurrentResolution(event.target.value);
    setVideoSrc(resolutions[event.target.value]);
  };

  // Handler for video controls
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Handler for mouse down (start swipe/drag)
  const handleMouseDown = (event) => {
    setMouseDown(true);
    setStartX(event.clientX);
  };

  // Handler for mouse up (end swipe/drag)
  const handleMouseUp = () => {
    setMouseDown(false);
  };

  // Handler for mouse move (while dragging/swiping)
  const handleMouseMove = (event) => {
    if (mouseDown && videoRef.current) {
      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
        } else {
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
        }
        setStartX(event.clientX);
      }
    }
  };

  // Handler for mouse wheel (volume control)
  const handleWheel = (event) => {
    if (videoRef.current) {
      let newVolume = videoRef.current.volume + (event.deltaY > 0 ? -0.1 : 0.1);
      newVolume = Math.max(0, Math.min(newVolume, 1));
      videoRef.current.volume = newVolume;
      setCurrentVolume(newVolume);
    }
  };

  return (
    <div
      className="video-player"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        width="100%"
        height="auto"
        onClick={handlePlayPause}
        onLoadedData={() => console.log('Video loaded')}
        onError={(e) => console.error('Video error', e)}
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

export default CustomVideoPlayer1;
