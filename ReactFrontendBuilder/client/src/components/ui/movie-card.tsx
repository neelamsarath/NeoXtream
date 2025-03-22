import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Play, Plus, Info } from "lucide-react";
import { cardAnimation } from "@/lib/motion";

export interface MovieData {
  id: number;
  title: string;
  year: string;
  genre: string;
  duration: string;
  posterUrl: string;
  rating?: string;
  matchPercentage?: number;
  episodeInfo?: string;
  timeLeft?: string;
  progressPercentage?: number;
}

interface MovieCardProps {
  movie: MovieData;
  onPlay?: (movie: MovieData) => void;
  variant?: "standard" | "continue" | "poster";
  width?: string;
}

const MovieCard = ({ 
  movie, 
  onPlay, 
  variant = "standard",
  width = "w-60"
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlay) {
      onPlay(movie);
    }
  };
  
  const getCoverHeight = () => {
    switch(variant) {
      case "continue":
        return "h-40";
      case "poster":
        return "h-64";
      case "standard":
      default:
        return "h-36";
    }
  };
  
  return (
    <motion.div
      className={`movie-card flex-shrink-0 ${width} rounded-xl overflow-hidden relative cursor-pointer`}
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={cardAnimation}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`}>
        <a>
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className={`w-full ${getCoverHeight()} object-cover`} 
          />
          
          {/* Progress Bar for Continue Watching */}
          {variant === "continue" && movie.progressPercentage !== undefined && (
            <div className="absolute bottom-[52px] left-0 right-0 h-1 bg-white/20">
              <div 
                className="h-full bg-neo-violet" 
                style={{width: `${movie.progressPercentage}%`}}
              ></div>
            </div>
          )}
          
          <div className="p-3">
            <h3 className="font-medium text-white truncate">{movie.title}</h3>
            <div className="flex items-center text-white/70 text-sm mt-1">
              {variant === "continue" && movie.episodeInfo ? (
                <>
                  <span>{movie.episodeInfo}</span>
                  {movie.timeLeft && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{movie.timeLeft}</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span>{movie.year}</span>
                  <span className="mx-2">•</span>
                  <span>{movie.genre}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Overlay with actions on hover */}
          <motion.div 
            className="card-overlay absolute inset-0 bg-gradient-to-t from-neo-black/90 to-transparent opacity-0 transition-opacity flex items-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="flex space-x-2 mb-2">
                <button 
                  className="bg-neo-violet/90 hover:bg-neo-violet rounded-full h-9 w-9 flex items-center justify-center transition-colors"
                  onClick={handlePlay}
                >
                  <Play className="w-4 h-4 text-white" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 rounded-full h-9 w-9 flex items-center justify-center backdrop-blur-sm transition-colors">
                  <Plus className="w-4 h-4 text-white" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 rounded-full h-9 w-9 flex items-center justify-center backdrop-blur-sm transition-colors">
                  <Info className="w-4 h-4 text-white" />
                </button>
              </div>
              {movie.matchPercentage && (
                <div className="text-xs text-white/90 flex items-center">
                  <span className="text-neo-violet font-medium">{movie.matchPercentage}% Match</span>
                  <span className="mx-2">•</span>
                  <span>{movie.duration}</span>
                </div>
              )}
            </div>
          </motion.div>
        </a>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
