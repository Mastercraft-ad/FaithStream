import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertPlaylistSchema, insertFavoriteSchema, insertListeningHistorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/songs', async (req, res) => {
    try {
      const songs = await storage.getAllSongs();
      res.json(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  });

  app.get('/api/songs/:id', async (req, res) => {
    try {
      const song = await storage.getSongById(req.params.id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
      res.json(song);
    } catch (error) {
      console.error("Error fetching song:", error);
      res.status(500).json({ message: "Failed to fetch song" });
    }
  });

  app.get('/api/albums', async (req, res) => {
    try {
      const { artistId } = req.query;
      if (artistId && typeof artistId === 'string') {
        const albums = await storage.getAlbumsByArtist(artistId);
        res.json(albums);
      } else {
        const albums = await storage.getAllAlbums();
        res.json(albums);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      res.status(500).json({ message: "Failed to fetch albums" });
    }
  });

  app.get('/api/artists', async (req, res) => {
    try {
      const artists = await storage.getAllArtists();
      res.json(artists);
    } catch (error) {
      console.error("Error fetching artists:", error);
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  app.get('/api/artists/:id', async (req, res) => {
    try {
      const artist = await storage.getArtistById(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      console.error("Error fetching artist:", error);
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });

  app.get('/api/sermons', async (req, res) => {
    try {
      const { pastorId, churchId, category } = req.query;
      
      if (pastorId && typeof pastorId === 'string') {
        const sermons = await storage.getSermonsByPastor(pastorId);
        res.json(sermons);
      } else if (churchId && typeof churchId === 'string') {
        const sermons = await storage.getSermonsByChurch(churchId);
        res.json(sermons);
      } else if (category && typeof category === 'string') {
        const sermons = await storage.getSermonsByCategory(category);
        res.json(sermons);
      } else {
        const sermons = await storage.getAllSermons();
        res.json(sermons);
      }
    } catch (error) {
      console.error("Error fetching sermons:", error);
      res.status(500).json({ message: "Failed to fetch sermons" });
    }
  });

  app.get('/api/sermons/:id', async (req, res) => {
    try {
      const sermon = await storage.getSermonById(req.params.id);
      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }
      res.json(sermon);
    } catch (error) {
      console.error("Error fetching sermon:", error);
      res.status(500).json({ message: "Failed to fetch sermon" });
    }
  });

  app.get('/api/pastors', async (req, res) => {
    try {
      const pastors = await storage.getAllPastors();
      res.json(pastors);
    } catch (error) {
      console.error("Error fetching pastors:", error);
      res.status(500).json({ message: "Failed to fetch pastors" });
    }
  });

  app.get('/api/pastors/:id', async (req, res) => {
    try {
      const pastor = await storage.getPastorById(req.params.id);
      if (!pastor) {
        return res.status(404).json({ message: "Pastor not found" });
      }
      res.json(pastor);
    } catch (error) {
      console.error("Error fetching pastor:", error);
      res.status(500).json({ message: "Failed to fetch pastor" });
    }
  });

  app.get('/api/churches', async (req, res) => {
    try {
      const churches = await storage.getAllChurches();
      res.json(churches);
    } catch (error) {
      console.error("Error fetching churches:", error);
      res.status(500).json({ message: "Failed to fetch churches" });
    }
  });

  app.get('/api/churches/:id', async (req, res) => {
    try {
      const church = await storage.getChurchById(req.params.id);
      if (!church) {
        return res.status(404).json({ message: "Church not found" });
      }
      res.json(church);
    } catch (error) {
      console.error("Error fetching church:", error);
      res.status(500).json({ message: "Failed to fetch church" });
    }
  });

  app.get('/api/bible/verse-of-the-day', async (req, res) => {
    try {
      const verse = await storage.getVerseOfTheDay();
      if (!verse) {
        return res.status(404).json({ message: "Verse not found" });
      }
      res.json(verse);
    } catch (error) {
      console.error("Error fetching verse:", error);
      res.status(500).json({ message: "Failed to fetch verse" });
    }
  });

  app.get('/api/bible/verse', async (req, res) => {
    try {
      const { book, chapter, verse } = req.query;
      
      if (!book || !chapter || !verse) {
        return res.status(400).json({ message: "Book, chapter, and verse are required" });
      }

      const result = await storage.getVerseByReference(
        book as string,
        parseInt(chapter as string),
        parseInt(verse as string)
      );

      if (!result) {
        return res.status(404).json({ message: "Verse not found" });
      }

      res.json(result);
    } catch (error) {
      console.error("Error fetching verse:", error);
      res.status(500).json({ message: "Failed to fetch verse" });
    }
  });

  app.get('/api/playlists', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const playlists = await storage.getUserPlaylists(userId);
      res.json(playlists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      res.status(500).json({ message: "Failed to fetch playlists" });
    }
  });

  app.post('/api/playlists', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertPlaylistSchema.parse({
        ...req.body,
        userId,
      });

      const playlist = await storage.createPlaylist(validatedData);
      res.status(201).json(playlist);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid playlist data", errors: error.errors });
      }
      console.error("Error creating playlist:", error);
      res.status(500).json({ message: "Failed to create playlist" });
    }
  });

  app.get('/api/playlists/:id', isAuthenticated, async (req: any, res) => {
    try {
      const playlist = await storage.getPlaylistById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      const userId = req.user.claims.sub;
      if (playlist.userId !== userId && !playlist.isPublic) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(playlist);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      res.status(500).json({ message: "Failed to fetch playlist" });
    }
  });

  app.delete('/api/playlists/:id', isAuthenticated, async (req: any, res) => {
    try {
      const playlist = await storage.getPlaylistById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      const userId = req.user.claims.sub;
      if (playlist.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      await storage.deletePlaylist(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting playlist:", error);
      res.status(500).json({ message: "Failed to delete playlist" });
    }
  });

  app.get('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertFavoriteSchema.parse({
        ...req.body,
        userId,
      });

      const favorite = await storage.addFavorite(validatedData);
      res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid favorite data", errors: error.errors });
      }
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  app.delete('/api/favorites/:id', isAuthenticated, async (req: any, res) => {
    try {
      await storage.removeFavorite(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  app.get('/api/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await storage.getUserHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ message: "Failed to fetch history" });
    }
  });

  app.post('/api/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertListeningHistorySchema.parse({
        ...req.body,
        userId,
      });

      const history = await storage.addToHistory(validatedData);
      res.status(201).json(history);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid history data", errors: error.errors });
      }
      console.error("Error adding to history:", error);
      res.status(500).json({ message: "Failed to add to history" });
    }
  });

  app.get('/api/search', async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }

      const results = await storage.searchAll(q);
      res.json(results);
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ message: "Failed to search" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
