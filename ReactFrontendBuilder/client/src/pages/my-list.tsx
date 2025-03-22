import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/motion";
import { Trash2 } from "lucide-react";
import { MovieData } from "@/components/ui/movie-card";
import VideoPlayer from "@/components/ui/video-player";
import { getMyList } from "@/data/movies";

const MyList = () => {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MovieData | null>(null);

  // Fetch data with React Query
  const { data: myListItems = [] } = useQuery({
    queryKey: ["/api/my-list"],
    initialData: getMyList,
  });

  const handlePlayMedia = (media: MovieData) => {
    setCurrentMedia(media);
    setIsVideoPlayerOpen(true);
  };

  return (
    <main className="pb-16">
      {/* Hero Banner */}
      <motion.div 
        className="relative h-[25vh] w-full overflow-hidden flex items-center justify-center bg-neo-purple/20"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neo-black/70 to-neo-indigo/30"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[Outfit] mb-2 text-white">My List</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto px-4">
            Your personal collection of favorite movies and shows
          </p>
        </div>
      </motion.div>

      {/* My List Grid */}
      <section className="px-8 md:px-16 py-12">
        {myListItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {myListItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="relative group"
                variants={staggerItem}
              >
                <div 
                  className="movie-card rounded-xl overflow-hidden cursor-pointer bg-neo-dark/50"
                  onClick={() => handlePlayMedia(item)}
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    className="w-full aspect-[2/3] object-cover rounded-t-xl"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-white truncate">{item.title}</h3>
                    <div className="flex items-center justify-between text-white/70 text-sm mt-1">
                      <span>{item.year}</span>
                      <span>{item.genre}</span>
                    </div>
                  </div>
                </div>
                
                {/* Remove Button */}
                <button 
                  className="absolute top-2 right-2 bg-neo-black/70 hover:bg-neo-violet text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Here would be remove from list functionality
                    console.log(`Remove ${item.title} from list`);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-16 text-center">
            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="max-w-md mx-auto"
            >
              <div className="mb-4 text-neo-violet">
                <i className="bx bx-list-plus text-8xl"></i>
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">Your list is empty</h3>
              <p className="text-white/70 mb-6">
                Add movies and TV shows to your list by clicking the "+" button when browsing
              </p>
              <a 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-neo-violet hover:bg-neo-purple rounded-full transition-all neo-shadow hover:neo-shadow-hover font-medium"
              >
                Browse Content
              </a>
            </motion.div>
          </div>
        )}
      </section>
      
      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        title={currentMedia?.title}
      />
    </main>
  );
};

export default MyList;
