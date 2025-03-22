import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/motion";
import ContentSection from "@/components/ui/content-section";
import VideoPlayer from "@/components/ui/video-player";
import { MovieData } from "@/components/ui/movie-card";
import { getTvShows, getTvShowsByGenre } from "@/data/movies";

const TvShows = () => {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState<MovieData | null>(null);
  const [activeGenre, setActiveGenre] = useState("All");

  // List of genres
  const genres = ["All", "Drama", "Sci-Fi", "Action", "Comedy", "Thriller", "Fantasy"];

  // Fetch data with React Query
  const { data: allShows = [] } = useQuery({
    queryKey: ["/api/tv-shows"],
    initialData: getTvShows,
  });

  // Filter shows by genre
  const filteredShows = activeGenre === "All" 
    ? allShows 
    : allShows.filter(show => show.genre === activeGenre);

  // Get shows by genre for featured sections
  const dramaShows = getTvShowsByGenre("Drama");
  const sciFiShows = getTvShowsByGenre("Sci-Fi");
  const actionShows = getTvShowsByGenre("Action");

  const handlePlayShow = (show: MovieData) => {
    setCurrentShow(show);
    setIsVideoPlayerOpen(true);
  };

  return (
    <main className="pb-16">
      {/* Hero Banner */}
      <motion.div 
        className="relative h-[30vh] w-full overflow-hidden flex items-center justify-center bg-neo-indigo"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neo-dark to-neo-indigo/70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-[Outfit] mb-4 text-white">TV Shows</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto px-4">
            Binge-worthy series and shows across all genres
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

      {/* Shows Grid */}
      <section className="px-8 md:px-16 mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {activeGenre === "All" ? "All TV Shows" : `${activeGenre} Shows`}
          </h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredShows.length > 0 ? (
            filteredShows.map((show) => (
              <motion.div key={show.id} variants={staggerItem}>
                <div className="movie-card rounded-xl overflow-hidden cursor-pointer" onClick={() => handlePlayShow(show)}>
                  <img
                    src={show.posterUrl}
                    alt={show.title}
                    className="w-full aspect-[2/3] object-cover rounded-t-xl"
                  />
                  <div className="p-3 bg-neo-dark/50 rounded-b-xl">
                    <h3 className="font-medium text-white truncate">{show.title}</h3>
                    <div className="flex items-center justify-between text-white/70 text-sm mt-1">
                      <span>{show.year}</span>
                      <span>{show.episodeInfo || "Series"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <p className="text-white/70">No shows found in this category.</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Featured Sections */}
      {activeGenre === "All" && (
        <>
          <ContentSection
            title="Popular Dramas"
            movies={dramaShows}
            viewAllLink="#"
            onPlay={handlePlayShow}
          />
          
          <ContentSection
            title="Sci-Fi Series"
            movies={sciFiShows}
            viewAllLink="#"
            onPlay={handlePlayShow}
          />
          
          <ContentSection
            title="Action & Adventure"
            movies={actionShows}
            viewAllLink="#"
            variant="poster"
            layout="scroll"
            onPlay={handlePlayShow}
          />
        </>
      )}
      
      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        title={currentShow?.title}
      />
    </main>
  );
};

export default TvShows;
