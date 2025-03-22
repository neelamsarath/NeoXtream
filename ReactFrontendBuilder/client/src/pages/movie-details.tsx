import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer, staggerItem } from "@/lib/motion";
import { PlayCircle, Plus, Star, Clock, Calendar, ArrowLeft } from "lucide-react";
import VideoPlayer from "@/components/ui/video-player";
import ContentSection from "@/components/ui/content-section";
import { MovieData } from "@/components/ui/movie-card";
import { getMovieById, getSimilarMovies } from "@/data/movies";

interface DetailsData extends MovieData {
  description: string;
  backdropUrl: string;
  rating: string;
  cast: string[];
  director: string;
  reviews: {
    author: string;
    rating: number;
    comment: string;
  }[];
}

const MovieDetails = () => {
  const { id } = useParams();
  const movieId = parseInt(id || "1");
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);
  
  // Fetch movie details
  const { data: movie, isLoading } = useQuery<DetailsData | null>({
    queryKey: ["/api/movies", movieId],
    initialData: () => getMovieById(movieId),
  });
  
  // Fetch similar movies
  const { data: similarMovies = [] } = useQuery({
    queryKey: ["/api/movies/similar", movieId],
    initialData: () => getSimilarMovies(movieId),
  });
  
  if (isLoading || !movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-neo-violet animate-pulse">Loading...</div>
      </div>
    );
  }
  
  return (
    <main className="pb-16">
      {/* Back Button */}
      <div className="absolute top-20 left-8 z-30">
        <Link href="/movies">
          <motion.a 
            className="flex items-center text-white/80 hover:text-white bg-neo-black/50 hover:bg-neo-black/70 backdrop-blur-sm p-2 px-4 rounded-full"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </motion.a>
        </Link>
      </div>
      
      {/* Hero Section */}
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
        <div className="absolute inset-0 flex items-end p-8 md:p-16">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Poster */}
            <motion.div variants={staggerItem} className="hidden md:block">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="rounded-xl shadow-2xl w-full max-w-[300px]"
              />
            </motion.div>
            
            {/* Details */}
            <motion.div variants={staggerItem} className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold font-[Outfit] mb-2 text-white">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" /> {movie.rating}
                </span>
                <span className="flex items-center text-white/80">
                  <Clock className="w-4 h-4 mr-1" /> {movie.duration}
                </span>
                <span className="flex items-center text-white/80">
                  <Calendar className="w-4 h-4 mr-1" /> {movie.year}
                </span>
                <span className="px-2.5 py-1 bg-neo-violet/20 border border-neo-violet/40 rounded-lg text-sm text-white">
                  {movie.genre}
                </span>
              </div>
              
              <p className="text-lg text-white/80 mb-8 max-w-2xl">{movie.description}</p>
              
              <div className="mb-8">
                <div className="text-white/70 mb-1">Director:</div>
                <div className="text-white font-medium">{movie.director}</div>
              </div>
              
              <div className="mb-8">
                <div className="text-white/70 mb-1">Cast:</div>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="text-white bg-neo-indigo/50 px-3 py-1 rounded-full text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  className="flex items-center px-6 py-3 bg-neo-violet hover:bg-neo-purple rounded-full transition-all neo-shadow hover:neo-shadow-hover font-medium"
                  onClick={() => setIsVideoPlayerOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayCircle className="mr-2 w-5 h-5" /> Watch Now
                </motion.button>
                <motion.button 
                  className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm border border-white/20 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="mr-2 w-5 h-5" /> Add to List
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="py-12 px-8 md:px-16 bg-neo-dark/30">
        <h2 className="text-2xl font-bold text-white mb-6">User Reviews</h2>
        
        {movie.reviews.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {movie.reviews.map((review, index) => (
              <motion.div 
                key={index}
                className="bg-neo-indigo/30 backdrop-blur-md p-6 rounded-xl border border-neo-violet/20"
                variants={staggerItem}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium text-white">{review.author}</div>
                  <div className="flex items-center text-white/90 bg-neo-violet/20 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" /> {review.rating}/10
                  </div>
                </div>
                <p className="text-white/80">{review.comment}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-white/70 text-center py-8">No reviews yet.</div>
        )}
      </section>
      
      {/* Similar Movies Section */}
      <ContentSection 
        title="Similar Movies" 
        movies={similarMovies}
        onPlay={(movie) => {
          setIsVideoPlayerOpen(true);
        }}
      />
      
      {/* Video Player Modal */}
      <VideoPlayer 
        isOpen={isVideoPlayerOpen} 
        onClose={() => setIsVideoPlayerOpen(false)}
        title={movie.title}
      />
    </main>
  );
};

export default MovieDetails;
