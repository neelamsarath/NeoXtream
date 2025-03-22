import { 
  users, type User, type InsertUser,
  movies, type Movie, type InsertMovie,
  watchlist, type Watchlist, type InsertWatchlist,
  watchProgress, type WatchProgress, type InsertWatchProgress,
  reviews, type Review, type InsertReview
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Movie methods
  getAllMovies(): Promise<Movie[]>;
  getMovieById(id: number): Promise<Movie | undefined>;
  getTrendingMovies(): Promise<Movie[]>;
  getRecommendedMovies(userId?: number): Promise<Movie[]>;
  getTvShows(): Promise<Movie[]>;
  
  // Watchlist methods
  getUserWatchlist(userId: number): Promise<Movie[]>;
  addToWatchlist(data: InsertWatchlist): Promise<Watchlist>;
  removeFromWatchlist(userId: number, movieId: number): Promise<void>;
  
  // Watch progress methods
  getUserWatchProgress(userId: number): Promise<WatchProgress[]>;
  updateWatchProgress(data: InsertWatchProgress): Promise<WatchProgress>;
  
  // Reviews methods
  getMovieReviews(movieId: number): Promise<Review[]>;
  addReview(data: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private movies: Map<number, Movie>;
  private watchlists: Map<number, Watchlist>;
  private watchProgresses: Map<number, WatchProgress>;
  private reviews: Map<number, Review>;
  private userIdCounter: number;
  private movieIdCounter: number;
  private watchlistIdCounter: number;
  private watchProgressIdCounter: number;
  private reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.movies = new Map();
    this.watchlists = new Map();
    this.watchProgresses = new Map();
    this.reviews = new Map();
    this.userIdCounter = 1;
    this.movieIdCounter = 1;
    this.watchlistIdCounter = 1;
    this.watchProgressIdCounter = 1;
    this.reviewIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Initialize with sample data
  private initSampleData() {
    // Sample movies would be initialized here
    // In a real app, we would load this from the database
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  // Movie methods
  async getAllMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values())
      .filter(movie => movie.isMovie);
  }

  async getMovieById(id: number): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async getTrendingMovies(): Promise<Movie[]> {
    // In a real app, this would be determined by view counts, ratings, etc.
    return Array.from(this.movies.values())
      .filter(movie => movie.isMovie)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }

  async getRecommendedMovies(userId?: number): Promise<Movie[]> {
    // In a real app, this would use user preferences and watch history
    if (userId) {
      // User-specific recommendations logic would go here
    }
    
    return Array.from(this.movies.values())
      .filter(movie => movie.isMovie)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }

  async getTvShows(): Promise<Movie[]> {
    return Array.from(this.movies.values())
      .filter(movie => !movie.isMovie);
  }

  // Watchlist methods
  async getUserWatchlist(userId: number): Promise<Movie[]> {
    const watchlistItems = Array.from(this.watchlists.values())
      .filter(item => item.userId === userId);
    
    return watchlistItems.map(item => {
      const movie = this.movies.get(item.movieId);
      if (!movie) throw new Error(`Movie with id ${item.movieId} not found`);
      return movie;
    });
  }

  async addToWatchlist(data: InsertWatchlist): Promise<Watchlist> {
    const id = this.watchlistIdCounter++;
    const now = new Date();
    const watchlistItem: Watchlist = {
      ...data,
      id,
      addedAt: now
    };
    this.watchlists.set(id, watchlistItem);
    return watchlistItem;
  }

  async removeFromWatchlist(userId: number, movieId: number): Promise<void> {
    const watchlistItems = Array.from(this.watchlists.entries());
    for (const [id, item] of watchlistItems) {
      if (item.userId === userId && item.movieId === movieId) {
        this.watchlists.delete(id);
        return;
      }
    }
  }

  // Watch progress methods
  async getUserWatchProgress(userId: number): Promise<WatchProgress[]> {
    return Array.from(this.watchProgresses.values())
      .filter(progress => progress.userId === userId);
  }

  async updateWatchProgress(data: InsertWatchProgress): Promise<WatchProgress> {
    // Check if there's an existing progress record
    let existingProgress: WatchProgress | undefined;
    let existingId: number | undefined;
    
    for (const [id, progress] of this.watchProgresses.entries()) {
      if (progress.userId === data.userId && progress.movieId === data.movieId) {
        existingProgress = progress;
        existingId = id;
        break;
      }
    }
    
    if (existingProgress && existingId) {
      // Update existing record
      const updatedProgress: WatchProgress = {
        ...existingProgress,
        ...data,
        lastWatched: new Date()
      };
      this.watchProgresses.set(existingId, updatedProgress);
      return updatedProgress;
    } else {
      // Create new record
      const id = this.watchProgressIdCounter++;
      const now = new Date();
      const progress: WatchProgress = {
        ...data,
        id,
        lastWatched: now
      };
      this.watchProgresses.set(id, progress);
      return progress;
    }
  }

  // Reviews methods
  async getMovieReviews(movieId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.movieId === movieId);
  }

  async addReview(data: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const now = new Date();
    const review: Review = {
      ...data,
      id,
      createdAt: now
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
