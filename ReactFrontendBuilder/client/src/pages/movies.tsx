import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/motion";
import ContentSection from "@/components/ui/content-section";
import VideoPlayer from "@/components/ui/video-player";
import { MovieData } from "@/components/ui/movie-card";
import { getAllMovies, getMoviesByGenre } from "@/data/movies";

const Movies = () => {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MovieData | null>(null);
  const [activeGenre, setActiveGenre] = useState("All");

  // List of genres
  const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Adventure", "Comedy", "Horror"];

  // Fetch data with React Query
  const { data: allMovies = [] } = useQuery({
    queryKey: ["/api/movies"],
    initialData: getAllMovies,
  });

  // Filter movies by genre
  const filteredMovies = activeGenre === "All" 
    ? allMovies 
    : allMovies.filter(movie => movie.genre === activeGenre);

  // Get movies by genre for recommended sections
  const actionMovies = getMoviesByGenre("Action");
  const sciFiMovies = getMoviesByGenre("Sci-Fi");
  const dramaMovies = getMoviesByGenre("Drama");

  const handlePlayMovie = (movie: MovieData) => {
    setCurrentMovie(movie);
    setIsVideoPlayerOpen(true);
  };

  return (
    <main className="pb-16">
      {/* Hero Banner */}
      <motion.div 
        className="relative h-[30vh] w-full overflow-hidden flex items-center justify-center bg-neo-dark"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neo-black to-neo-dark/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-[Outfit] mb-4 text-white">Movies</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto px-4">
            Discover the latest and greatest films across all genres
          </p>
        </div>
      </motion.div>

      {/* Genre Tabs */}
      <div className="px-8 md:px-16 pt-8">
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {genres.map((genre) => (
            <motion.button
              key={genre}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeGenre === genre
                  ? "bg-neo-violet text-white neo-shadow"
                  : "bg-neo-dark/50 text-white/70 hover:bg-neo-dark"
              }`}
              onClick={() => setActiveGenre(genre)}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Movie Grid */}
      <section className="px-8 md:px-16 mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {activeGenre === "All" ? "All Movies" : `${activeGenre} Movies`}
          </h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <motion.div key={movie.id} variants={staggerItem}>
                <div className="movie-card rounded-xl overflow-hidden cursor-pointer" onClick={() => handlePlayMovie(movie)}>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover rounded-t-xl"
                  />
                  <div className="p-3 bg-neo-dark/50 rounded-b-xl">
                    <h3 className="font-medium text-white truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between text-white/70 text-sm mt-1">
                      <span>{movie.year}</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-white/70">No movies found in this category.</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Recommended Sections */}
      {activeGenre === "All" && (
        <>
          <ContentSection
            title="Action Movies"
            movies={actionMovies}
            viewAllLink="#"
            onPlay={handlePlayMovie}
          />
          
          <ContentSection
            title="Sci-Fi Collection"
            movies={sciFiMovies}
            viewAllLink="#"
            onPlay={handlePlayMovie}
          />
          
          <ContentSection
            title="Drama Spotlight"
            movies={dramaMovies}
            viewAllLink="#"
            variant="poster"
            layout="scroll"
            onPlay={handlePlayMovie}
          />
        </>
      )}
      
      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        title={currentMovie?.title}
      />
    </main>
  );
};

export default Movies;
