import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import MovieCard, { MovieData } from "./movie-card";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface ContentSectionProps {
  title: string;
  movies: MovieData[];
  viewAllLink?: string;
  variant?: "standard" | "continue" | "poster";
  layout?: "scroll" | "grid";
  onPlay?: (movie: MovieData) => void;
}

const ContentSection = ({ 
  title, 
  movies, 
  viewAllLink, 
  variant = "standard",
  layout = "scroll",
  onPlay 
}: ContentSectionProps) => {
  
  if (layout === "scroll") {
    return (
      <section className="py-8 px-8 md:px-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <a className="flex items-center text-neo-violet hover:text-neo-purple transition-colors">
                <span>View All</span>
                <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </Link>
          )}
        </div>
        
        <div className="overflow-x-auto custom-scrolling -mx-2">
          <motion.div 
            className="flex space-x-4 pb-4 px-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {movies.map((movie) => (
              <motion.div key={movie.id} variants={staggerItem}>
                <MovieCard
                  movie={movie}
                  variant={variant}
                  onPlay={onPlay}
                  width={variant === "continue" ? "w-72" : "w-60"}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
  
  // Grid layout
  return (
    <section className="py-8 px-8 md:px-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink}>
            <a className="flex items-center text-neo-violet hover:text-neo-purple transition-colors">
              <span>View All</span>
              <ChevronRight className="ml-1 w-5 h-5" />
            </a>
          </Link>
        )}
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={staggerItem}>
            <MovieCard
              movie={movie}
              variant={variant}
              onPlay={onPlay}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ContentSection;
