import { MovieData } from "@/components/ui/movie-card";

// Featured movie for hero section
export const featuredMovie = {
  id: 1,
  title: "Cosmic Horizon",
  year: "2023",
  genre: "Sci-Fi",
  duration: "2h 15m",
  rating: "9.2",
  posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&q=85&fit=crop&w=300&h=450",
  backdropUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&crop=entropy",
  description: "An interstellar explorer journeys to the edge of the known universe, discovering a gateway to another dimension where time and space collide in spectacular fashion.",
  director: "Elena Kowalski",
  cast: ["Michael Chen", "Sophia Rodriguez", "Elijah Parker", "Aria Kim"],
  reviews: [
    {
      author: "MovieCritic42",
      rating: 9.5,
      comment: "A breathtaking visual journey with incredible performances. The third act will leave you speechless."
    },
    {
      author: "SciFiLover",
      rating: 8.8,
      comment: "The best sci-fi film of the year. The visuals and sound design create a truly immersive experience."
    },
    {
      author: "CinemaExpert",
      rating: 9.0,
      comment: "Thought-provoking and visually stunning. A modern sci-fi masterpiece that pushes the boundaries of the genre."
    }
  ]
};

// Trending movies
const trendingMovies: MovieData[] = [
  {
    id: 2,
    title: "Neon Dynasty",
    year: "2023",
    genre: "Action",
    duration: "2h 15m",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&q=85&w=350&h=200&fit=crop",
    matchPercentage: 97
  },
  {
    id: 3,
    title: "Quantum Fall",
    year: "2023",
    genre: "Sci-Fi",
    duration: "1h 45m",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&q=85&w=350&h=200&fit=crop",
    matchPercentage: 92
  },
  {
    id: 4,
    title: "Cyber Dreams",
    year: "2023",
    genre: "Thriller",
    duration: "2h 10m",
    posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&q=85&w=350&h=200&fit=crop",
    matchPercentage: 85
  },
  {
    id: 5,
    title: "Stellar Odyssey",
    year: "2023",
    genre: "Adventure",
    duration: "2h 30m",
    posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&q=85&w=350&h=200&fit=crop",
    matchPercentage: 94
  },
  {
    id: 6,
    title: "Aurora Prime",
    year: "2023",
    genre: "Drama",
    duration: "1h 55m",
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&q=85&w=350&h=200&fit=crop",
    matchPercentage: 88
  },
  {
    id: 7,
    title: "Midnight Protocol",
    year: "2023",
    genre: "Thriller",
    duration: "2h 05m",
    posterUrl: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&q=85&w=350&h=200&fit=crop",
    matchPercentage: 91
  }
];

// Continue watching
const continueWatchingMovies: MovieData[] = [
  {
    id: 3,
    title: "Quantum Fall",
    year: "2023",
    genre: "Sci-Fi",
    duration: "1h 45m",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&q=85&w=400&h=225&fit=crop",
    episodeInfo: "S1:E4",
    timeLeft: "45m left",
    progressPercentage: 65
  },
  {
    id: 2,
    title: "Neon Dynasty",
    year: "2023",
    genre: "Action",
    duration: "2h 15m",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&q=85&w=400&h=225&fit=crop",
    timeLeft: "1h 15m left",
    progressPercentage: 32
  },
  {
    id: 4,
    title: "Cyber Dreams",
    year: "2023",
    genre: "Thriller",
    duration: "2h 10m",
    posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&q=85&w=400&h=225&fit=crop",
    episodeInfo: "S2:E7",
    timeLeft: "15m left",
    progressPercentage: 85
  }
];

// Recommended movies
const recommendedMovies: MovieData[] = [
  {
    id: 8,
    title: "Galactic Pioneers",
    year: "2023",
    genre: "Adventure",
    duration: "2h 05m",
    posterUrl: "https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 95
  },
  {
    id: 9,
    title: "Neon Phantoms",
    year: "2023",
    genre: "Thriller",
    duration: "1h 55m",
    posterUrl: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 90
  },
  {
    id: 10,
    title: "Digital Horizons",
    year: "2023",
    genre: "Drama",
    duration: "2h 15m",
    posterUrl: "https://images.unsplash.com/photo-1532010940201-c31e6beacd39?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 88
  },
  {
    id: 11,
    title: "Synthetic Dreams",
    year: "2023",
    genre: "Sci-Fi",
    duration: "1h 50m",
    posterUrl: "https://images.unsplash.com/photo-1618022256910-e670d11fe569?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 92
  },
  {
    id: 12,
    title: "Astral Echo",
    year: "2023",
    genre: "Sci-Fi",
    duration: "2h 20m",
    posterUrl: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 86
  }
];

// All movies for Movies page
const allMovies: MovieData[] = [
  ...trendingMovies,
  ...recommendedMovies,
  {
    id: 13,
    title: "Neural Link",
    year: "2023",
    genre: "Sci-Fi",
    duration: "1h 58m",
    posterUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 89
  },
  {
    id: 14,
    title: "Chrome Warriors",
    year: "2023",
    genre: "Action",
    duration: "2h 12m",
    posterUrl: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 91
  },
  {
    id: 15,
    title: "Eternal Light",
    year: "2023",
    genre: "Drama",
    duration: "2h 08m",
    posterUrl: "https://images.unsplash.com/photo-1518141532615-4305c9f914c9?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 87
  },
  {
    id: 16,
    title: "Violent Sunset",
    year: "2023",
    genre: "Thriller",
    duration: "1h 52m",
    posterUrl: "https://images.unsplash.com/photo-1518050346340-aa2ec3bb424b?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 84
  },
  {
    id: 17,
    title: "Desert Whispers",
    year: "2023",
    genre: "Adventure",
    duration: "2h 24m",
    posterUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 93
  }
];

// TV Shows for TV Shows page
const tvShows: MovieData[] = [
  {
    id: 18,
    title: "Echoes of Time",
    year: "2023",
    genre: "Sci-Fi",
    duration: "45m",
    posterUrl: "https://images.unsplash.com/photo-1518544866330-dbb461834b58?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S1:E8",
    matchPercentage: 94
  },
  {
    id: 19,
    title: "Neon Streets",
    year: "2023",
    genre: "Drama",
    duration: "55m",
    posterUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S2:E6",
    matchPercentage: 96
  },
  {
    id: 20,
    title: "Crimson Sky",
    year: "2023",
    genre: "Action",
    duration: "50m",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S3:E4",
    matchPercentage: 92
  },
  {
    id: 21,
    title: "Digital Frontier",
    year: "2023",
    genre: "Sci-Fi",
    duration: "48m",
    posterUrl: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S1:E10",
    matchPercentage: 88
  },
  {
    id: 22,
    title: "Whispers in Dark",
    year: "2023",
    genre: "Thriller",
    duration: "52m",
    posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S2:E7",
    matchPercentage: 90
  },
  {
    id: 23,
    title: "Luminous City",
    year: "2023",
    genre: "Drama",
    duration: "58m",
    posterUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S4:E2",
    matchPercentage: 95
  },
  {
    id: 24,
    title: "Quantum Tales",
    year: "2023",
    genre: "Sci-Fi",
    duration: "46m",
    posterUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S2:E9",
    matchPercentage: 93
  },
  {
    id: 25,
    title: "Urban Legends",
    year: "2023",
    genre: "Fantasy",
    duration: "54m",
    posterUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S1:E6",
    matchPercentage: 89
  }
];

// My List items
const myListItems: MovieData[] = [
  {
    id: 2,
    title: "Neon Dynasty",
    year: "2023",
    genre: "Action",
    duration: "2h 15m",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 97
  },
  {
    id: 8,
    title: "Galactic Pioneers",
    year: "2023",
    genre: "Adventure",
    duration: "2h 05m",
    posterUrl: "https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 95
  },
  {
    id: 19,
    title: "Neon Streets",
    year: "2023",
    genre: "Drama",
    duration: "55m",
    posterUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    episodeInfo: "S2:E6",
    matchPercentage: 96
  },
  {
    id: 4,
    title: "Cyber Dreams",
    year: "2023",
    genre: "Thriller",
    duration: "2h 10m",
    posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&q=85&w=300&h=400&fit=crop",
    matchPercentage: 85
  }
];

// API-like functions
export const getTrendingMovies = () => trendingMovies;
export const getContinueWatching = () => continueWatchingMovies;
export const getRecommendedMovies = () => recommendedMovies;
export const getAllMovies = () => allMovies;
export const getTvShows = () => tvShows;
export const getMyList = () => myListItems;

export const getMovieById = (id: number) => {
  return [...allMovies, ...tvShows, featuredMovie].find(movie => movie.id === id) || null;
};

export const getSimilarMovies = (id: number) => {
  const movie = getMovieById(id);
  if (!movie) return [];
  
  // Return movies of the same genre, excluding the current one
  return allMovies
    .filter(m => m.genre === movie.genre && m.id !== id)
    .slice(0, 6);
};

export const getMoviesByGenre = (genre: string) => {
  return allMovies.filter(movie => movie.genre === genre);
};

export const getTvShowsByGenre = (genre: string) => {
  return tvShows.filter(show => show.genre === genre);
};
