import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Settings, 
  Maximize, 
  Minimize 
} from "lucide-react";
import { modalAnimation } from "@/lib/motion";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

const VideoPlayer = ({ isOpen, onClose, videoSrc, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Format time (seconds) to MM:SS or HH:MM:SS
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    setVolume(newVolume);
    video.volume = newVolume / 100;
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (volume > 0) {
      video.volume = 0;
      setVolume(0);
    } else {
      video.volume = 0.7;
      setVolume(70);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Update current time
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX />;
    if (volume < 50) return <Volume1 />;
    return <Volume2 />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neo-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            className="w-full max-w-6xl mx-auto rounded-xl overflow-hidden relative"
            variants={modalAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-neo-black/70 hover:bg-neo-black rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-sm text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Video Player */}
            <div className="aspect-video bg-neo-dark relative">
              {videoSrc ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                /* Placeholder when no video */
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <i className="bx bx-play-circle text-white/30 text-7xl mb-4"></i>
                  <p className="text-white/70">No video available</p>
                </div>
              )}
              
              {/* Video Title Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-neo-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">{title || "Video Player"}</h3>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neo-black/80 to-transparent">
                {/* Progress bar */}
                <div 
                  className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-neo-violet rounded-full" 
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      className="text-white hover:text-neo-violet transition-colors"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button className="text-white hover:text-neo-violet transition-colors">
                      <SkipForward className="w-6 h-6" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-white hover:text-neo-violet transition-colors"
                        onClick={toggleMute}
                      >
                        {getVolumeIcon()}
                      </button>
                      <div className="w-16 h-1 bg-white/20 rounded-full relative cursor-pointer"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const pos = (e.clientX - rect.left) / rect.width;
                          handleVolumeChange(Math.floor(pos * 100));
                        }}
                      >
                        <div 
                          className="h-full bg-white rounded-full" 
                          style={{ width: `${volume}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-white/80 text-sm">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-neo-violet transition-colors px-3 py-1 text-sm rounded-md border border-white/20">
                      HD
                    </button>
                    <button className="text-white hover:text-neo-violet transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-white hover:text-neo-violet transition-colors"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;
