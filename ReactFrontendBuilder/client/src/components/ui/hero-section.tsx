import { motion } from "framer-motion";
import { PlayCircle, Plus, Info } from "lucide-react";
import { slideUp, fadeIn } from "@/lib/motion";
import { MovieData } from "./movie-card";

interface HeroSectionProps {
  movie: MovieData & {
    description: string;
    backdropUrl: string;
  };
  onPlay: (movie: MovieData) => void;
}

const HeroSection = ({ movie, onPlay }: HeroSectionProps) => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <motion.img 
        src={movie.backdropUrl} 
        alt={movie.title} 
        className="object-cover w-full h-full"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
        <motion.div 
          className="max-w-3xl"
          variants={slideUp}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-[Outfit] mb-2 text-white">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-2.5 py-1 bg-neo-violet/20 border border-neo-violet/40 rounded-lg text-sm text-white">{movie.genre}</span>
            <span className="px-2.5 py-1 bg-neo-dark/70 rounded-lg text-sm text-white/80">{movie.year}</span>
            {movie.rating && (
              <span className="flex items-center text-white/90">
                <i className='bx bxs-star text-yellow-400 mr-1'></i> {movie.rating}
              </span>
            )}
            <span className="text-white/80">{movie.duration}</span>
          </div>
          <p className="text-lg text-white/80 mb-8 max-w-2xl">{movie.description}</p>
          <div className="flex space-x-4">
            <motion.button 
              className="flex items-center px-6 py-3 bg-neo-violet hover:bg-neo-purple rounded-full transition-all neo-shadow hover:neo-shadow-hover font-medium"
              onClick={() => onPlay(movie)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle className="mr-2 w-5 h-5" /> Play Now
            </motion.button>
            <motion.button 
              className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm border border-white/20 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="mr-2 w-5 h-5" /> Add to List
            </motion.button>
            <motion.button 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
