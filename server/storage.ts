import {
  users,
  artists,
  albums,
  songs,
  churches,
  pastors,
  sermons,
  playlists,
  playlistSongs,
  favorites,
  listeningHistory,
  bibleVerses,
  type User,
  type UpsertUser,
  type Artist,
  type Album,
  type Song,
  type Church,
  type Pastor,
  type Sermon,
  type Playlist,
  type Favorite,
  type ListeningHistory,
  type BibleVerse,
  type InsertPlaylist,
  type InsertFavorite,
  type InsertListeningHistory,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or, like, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getAllSongs(): Promise<Song[]>;
  getSongById(id: string): Promise<Song | undefined>;
  searchSongs(query: string): Promise<Song[]>;
  
  getAllAlbums(): Promise<Album[]>;
  getAlbumsByArtist(artistId: string): Promise<Album[]>;
  
  getAllArtists(): Promise<Artist[]>;
  getArtistById(id: string): Promise<Artist | undefined>;
  
  getAllSermons(): Promise<Sermon[]>;
  getSermonById(id: string): Promise<Sermon | undefined>;
  getSermonsByPastor(pastorId: string): Promise<Sermon[]>;
  getSermonsByChurch(churchId: string): Promise<Sermon[]>;
  getSermonsByCategory(category: string): Promise<Sermon[]>;
  
  getAllPastors(): Promise<Pastor[]>;
  getPastorById(id: string): Promise<Pastor | undefined>;
  
  getAllChurches(): Promise<Church[]>;
  getChurchById(id: string): Promise<Church | undefined>;
  
  getVerseOfTheDay(): Promise<BibleVerse | undefined>;
  getVerseByReference(book: string, chapter: number, verse: number): Promise<BibleVerse | undefined>;
  
  getUserPlaylists(userId: string): Promise<Playlist[]>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  getPlaylistById(id: string): Promise<Playlist | undefined>;
  deletePlaylist(id: string): Promise<void>;
  
  getUserFavorites(userId: string): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(id: string): Promise<void>;
  
  getUserHistory(userId: string): Promise<ListeningHistory[]>;
  addToHistory(history: InsertListeningHistory): Promise<ListeningHistory>;
  
  searchAll(query: string): Promise<{
    songs: Song[];
    artists: Artist[];
    sermons: Sermon[];
    churches: Church[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllSongs(): Promise<Song[]> {
    return await db.select().from(songs).orderBy(desc(songs.createdAt));
  }

  async getSongById(id: string): Promise<Song | undefined> {
    const [song] = await db.select().from(songs).where(eq(songs.id, id));
    return song;
  }

  async searchSongs(query: string): Promise<Song[]> {
    return await db
      .select()
      .from(songs)
      .where(like(songs.title, `%${query}%`));
  }

  async getAllAlbums(): Promise<Album[]> {
    return await db.select().from(albums).orderBy(desc(albums.createdAt));
  }

  async getAlbumsByArtist(artistId: string): Promise<Album[]> {
    return await db.select().from(albums).where(eq(albums.artistId, artistId));
  }

  async getAllArtists(): Promise<Artist[]> {
    return await db.select().from(artists).orderBy(artists.name);
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    return artist;
  }

  async getAllSermons(): Promise<Sermon[]> {
    return await db.select().from(sermons).orderBy(desc(sermons.createdAt));
  }

  async getSermonById(id: string): Promise<Sermon | undefined> {
    const [sermon] = await db.select().from(sermons).where(eq(sermons.id, id));
    return sermon;
  }

  async getSermonsByPastor(pastorId: string): Promise<Sermon[]> {
    return await db
      .select()
      .from(sermons)
      .where(eq(sermons.pastorId, pastorId))
      .orderBy(desc(sermons.createdAt));
  }

  async getSermonsByChurch(churchId: string): Promise<Sermon[]> {
    return await db
      .select()
      .from(sermons)
      .where(eq(sermons.churchId, churchId))
      .orderBy(desc(sermons.createdAt));
  }

  async getSermonsByCategory(category: string): Promise<Sermon[]> {
    return await db
      .select()
      .from(sermons)
      .where(eq(sermons.category, category))
      .orderBy(desc(sermons.createdAt));
  }

  async getAllPastors(): Promise<Pastor[]> {
    return await db.select().from(pastors).orderBy(pastors.name);
  }

  async getPastorById(id: string): Promise<Pastor | undefined> {
    const [pastor] = await db.select().from(pastors).where(eq(pastors.id, id));
    return pastor;
  }

  async getAllChurches(): Promise<Church[]> {
    return await db.select().from(churches).orderBy(churches.name);
  }

  async getChurchById(id: string): Promise<Church | undefined> {
    const [church] = await db.select().from(churches).where(eq(churches.id, id));
    return church;
  }

  async getVerseOfTheDay(): Promise<BibleVerse | undefined> {
    const [verse] = await db
      .select()
      .from(bibleVerses)
      .where(and(
        eq(bibleVerses.book, "Psalms"),
        eq(bibleVerses.chapter, 23),
        eq(bibleVerses.verse, 1)
      ));
    return verse;
  }

  async getVerseByReference(
    book: string,
    chapter: number,
    verse: number
  ): Promise<BibleVerse | undefined> {
    const [result] = await db
      .select()
      .from(bibleVerses)
      .where(
        and(
          eq(bibleVerses.book, book),
          eq(bibleVerses.chapter, chapter),
          eq(bibleVerses.verse, verse)
        )
      );
    return result;
  }

  async getUserPlaylists(userId: string): Promise<Playlist[]> {
    return await db
      .select()
      .from(playlists)
      .where(eq(playlists.userId, userId))
      .orderBy(desc(playlists.createdAt));
  }

  async createPlaylist(playlistData: InsertPlaylist): Promise<Playlist> {
    const [playlist] = await db
      .insert(playlists)
      .values(playlistData)
      .returning();
    return playlist;
  }

  async getPlaylistById(id: string): Promise<Playlist | undefined> {
    const [playlist] = await db.select().from(playlists).where(eq(playlists.id, id));
    return playlist;
  }

  async deletePlaylist(id: string): Promise<void> {
    await db.delete(playlists).where(eq(playlists.id, id));
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
  }

  async addFavorite(favoriteData: InsertFavorite): Promise<Favorite> {
    const [favorite] = await db
      .insert(favorites)
      .values(favoriteData)
      .returning();
    return favorite;
  }

  async removeFavorite(id: string): Promise<void> {
    await db.delete(favorites).where(eq(favorites.id, id));
  }

  async getUserHistory(userId: string): Promise<ListeningHistory[]> {
    return await db
      .select()
      .from(listeningHistory)
      .where(eq(listeningHistory.userId, userId))
      .orderBy(desc(listeningHistory.playedAt))
      .limit(50);
  }

  async addToHistory(historyData: InsertListeningHistory): Promise<ListeningHistory> {
    const [history] = await db
      .insert(listeningHistory)
      .values(historyData)
      .returning();
    return history;
  }

  async searchAll(query: string): Promise<{
    songs: Song[];
    artists: Artist[];
    sermons: Sermon[];
    churches: Church[];
  }> {
    const searchPattern = `%${query}%`;

    const [songResults, artistResults, sermonResults, churchResults] = await Promise.all([
      db.select().from(songs).where(like(songs.title, searchPattern)).limit(10),
      db.select().from(artists).where(like(artists.name, searchPattern)).limit(10),
      db.select().from(sermons).where(
        or(
          like(sermons.title, searchPattern),
          like(sermons.description, searchPattern)
        )
      ).limit(10),
      db.select().from(churches).where(like(churches.name, searchPattern)).limit(10),
    ]);

    return {
      songs: songResults,
      artists: artistResults,
      sermons: sermonResults,
      churches: churchResults,
    };
  }
}

export const storage = new DatabaseStorage();
