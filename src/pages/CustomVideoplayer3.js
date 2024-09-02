import React, { useRef, useState, useEffect } from 'react';
import trial from '../assets/video144p.mp4';
import anime from '../assets/Makinganime.mp4';

import video240p from '../assets/video240p.mp4';
import video320p from '../assets/video320p.mp4';
import video480p from '../assets/video480p.mp4';
import video720p from '../assets/video720p.mp4';
import video1080p from '../assets/video1080p.mp4';

const CustomVideoPlayer3 = () => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(trial);
  const [currentResolution, setCurrentResolution] = useState('144P');
  //const [mouseDown, setMouseDown] = useState(false);
  //const [startX, setStartX] = useState(0);
 //const [volume, setVolume] = useState(1);

  // Example video sources for different resolutions
  const resolutions = {
    '144p': trial,
    '240p': video240p,
    '320p': video320p,
    '480p': video480p,
    '720p': video720p,
    '1080p': video1080p
  };

  // Set the initial video source when the component mounts
  useEffect(() => {
    console.log('Current resolution updated:', currentResolution);
    console.log('Video source set to:', resolutions[currentResolution]);  // Log the video source
    setVideoSrc(resolutions[currentResolution]);
  }, [currentResolution]);

  // Handler for changing video resolution
  const handleResolutionChange = (event) => {
    setCurrentResolution(event.target.value);
    setVideoSrc(resolutions[event.target.value]);
  };

  // Improved error handler for video playback issues
  const handleError = (event) => {
    console.error('Video error:', event);
    alert(`An error occurred while trying to load the video. Error details: ${event.target.error?.message || 'Unknown error'}`);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={videoSrc}
        //src={trial}
        type="video/mp4"
        controls
        width="100%"
        height="auto"
        onLoadedData={() => console.log('Video loaded')}
        onError={handleError}  // Add improved error handler
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

export default CustomVideoPlayer3;
