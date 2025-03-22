import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertWatchlistSchema, insertWatchProgressSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Movies routes
  app.get("/api/movies", async (req, res) => {
    try {
      const movies = await storage.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/movies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const movie = await storage.getMovieById(id);
      
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      
      res.json(movie);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/movies/trending", async (req, res) => {
    try {
      const trendingMovies = await storage.getTrendingMovies();
      res.json(trendingMovies);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/movies/recommended", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const recommendedMovies = await storage.getRecommendedMovies(userId ? parseInt(userId) : undefined);
      res.json(recommendedMovies);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // TV Shows routes
  app.get("/api/tv-shows", async (req, res) => {
    try {
      const tvShows = await storage.getTvShows();
      res.json(tvShows);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // User watchlist routes
  app.get("/api/users/:userId/watchlist", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const watchlist = await storage.getUserWatchlist(userId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/users/:userId/watchlist", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const data = insertWatchlistSchema.parse({ ...req.body, userId });
      const item = await storage.addToWatchlist(data);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  app.delete("/api/users/:userId/watchlist/:movieId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const movieId = parseInt(req.params.movieId);
      await storage.removeFromWatchlist(userId, movieId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Watch progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserWatchProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const data = insertWatchProgressSchema.parse({ ...req.body, userId });
      const progress = await storage.updateWatchProgress(data);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  // Reviews routes
  app.get("/api/movies/:movieId/reviews", async (req, res) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const reviews = await storage.getMovieReviews(movieId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/movies/:movieId/reviews", async (req, res) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const data = insertReviewSchema.parse({ ...req.body, movieId });
      const review = await storage.addReview(data);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
