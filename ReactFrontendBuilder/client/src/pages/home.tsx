import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/ui/hero-section";
import ContentSection from "@/components/ui/content-section";
import VideoPlayer from "@/components/ui/video-player";
import { MovieData } from "@/components/ui/movie-card";
import { featuredMovie, getTrendingMovies, getContinueWatching, getRecommendedMovies } from "@/data/movies";

const Home = () => {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MovieData | null>(null);

  // Fetch data with React Query
  const { data: trendingMovies = [] } = useQuery({
    queryKey: ["/api/movies/trending"],
    initialData: getTrendingMovies,
  });

  const { data: continueWatchingMovies = [] } = useQuery({
    queryKey: ["/api/movies/continue-watching"],
    initialData: getContinueWatching,
  });

  const { data: recommendedMovies = [] } = useQuery({
    queryKey: ["/api/movies/recommended"],
    initialData: getRecommendedMovies,
  });

  const handlePlayMovie = (movie: MovieData) => {
    setCurrentMovie(movie);
    setIsVideoPlayerOpen(true);
  };

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <HeroSection movie={featuredMovie} onPlay={handlePlayMovie} />
      
      {/* Trending Section */}
      <ContentSection 
        title="Trending Now" 
        movies={trendingMovies} 
        viewAllLink="/trending"
        onPlay={handlePlayMovie}
      />
      
      {/* Continue Watching Section */}
      {continueWatchingMovies.length > 0 && (
        <ContentSection 
          title="Continue Watching" 
          movies={continueWatchingMovies} 
          viewAllLink="/continue-watching"
          variant="continue"
          onPlay={handlePlayMovie}
        />
      )}
      
      {/* Recommended Section */}
      <ContentSection 
        title="Recommended For You" 
        movies={recommendedMovies} 
        viewAllLink="/recommended"
        variant="poster"
        layout="grid"
        onPlay={handlePlayMovie}
      />
      
      {/* Video Player Modal */}
      <VideoPlayer 
        isOpen={isVideoPlayerOpen} 
        onClose={() => setIsVideoPlayerOpen(false)}
        title={currentMovie?.title}
      />
    </main>
  );
};

export default Home;
