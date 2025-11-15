import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const artists = pgTable("artists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url"),
  genre: varchar("genre"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const albums = pgTable("albums", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  artistId: varchar("artist_id").notNull().references(() => artists.id),
  coverUrl: varchar("cover_url"),
  releaseYear: integer("release_year"),
  genre: varchar("genre"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const songs = pgTable("songs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  artistId: varchar("artist_id").notNull().references(() => artists.id),
  albumId: varchar("album_id").references(() => albums.id),
  duration: integer("duration"),
  lyrics: text("lyrics"),
  audioUrl: varchar("audio_url"),
  genre: varchar("genre"),
  playCount: integer("play_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const churches = pgTable("churches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  location: varchar("location"),
  description: text("description"),
  bannerUrl: varchar("banner_url"),
  logoUrl: varchar("logo_url"),
  memberCount: integer("member_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pastors = pgTable("pastors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  churchId: varchar("church_id").references(() => churches.id),
  bio: text("bio"),
  photoUrl: varchar("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sermons = pgTable("sermons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  pastorId: varchar("pastor_id").notNull().references(() => pastors.id),
  churchId: varchar("church_id").references(() => churches.id),
  description: text("description"),
  thumbnailUrl: varchar("thumbnail_url"),
  audioUrl: varchar("audio_url"),
  videoUrl: varchar("video_url"),
  duration: integer("duration"),
  category: varchar("category"),
  scripture: varchar("scripture"),
  playCount: integer("play_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const playlists = pgTable("playlists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  coverUrl: varchar("cover_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const playlistSongs = pgTable("playlist_songs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playlistId: varchar("playlist_id").notNull().references(() => playlists.id, { onDelete: 'cascade' }),
  songId: varchar("song_id").notNull().references(() => songs.id),
  position: integer("position").notNull(),
  addedAt: timestamp("added_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  songId: varchar("song_id").references(() => songs.id),
  sermonId: varchar("sermon_id").references(() => sermons.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const listeningHistory = pgTable("listening_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  songId: varchar("song_id").references(() => songs.id),
  sermonId: varchar("sermon_id").references(() => sermons.id),
  playedAt: timestamp("played_at").defaultNow(),
  duration: integer("duration"),
});

export const bibleVerses = pgTable("bible_verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  book: varchar("book").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  text: text("text").notNull(),
  translation: varchar("translation").default("KJV"),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  albums: many(albums),
  songs: many(songs),
}));

export const albumsRelations = relations(albums, ({ one, many }) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
  songs: many(songs),
}));

export const songsRelations = relations(songs, ({ one }) => ({
  artist: one(artists, {
    fields: [songs.artistId],
    references: [artists.id],
  }),
  album: one(albums, {
    fields: [songs.albumId],
    references: [albums.id],
  }),
}));

export const churchesRelations = relations(churches, ({ many }) => ({
  pastors: many(pastors),
  sermons: many(sermons),
}));

export const pastorsRelations = relations(pastors, ({ one, many }) => ({
  church: one(churches, {
    fields: [pastors.churchId],
    references: [churches.id],
  }),
  sermons: many(sermons),
}));

export const sermonsRelations = relations(sermons, ({ one }) => ({
  pastor: one(pastors, {
    fields: [sermons.pastorId],
    references: [pastors.id],
  }),
  church: one(churches, {
    fields: [sermons.churchId],
    references: [churches.id],
  }),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.id],
  }),
  playlistSongs: many(playlistSongs),
}));

export const playlistSongsRelations = relations(playlistSongs, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistSongs.playlistId],
    references: [playlists.id],
  }),
  song: one(songs, {
    fields: [playlistSongs.songId],
    references: [songs.id],
  }),
}));

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Artist = typeof artists.$inferSelect;
export type Album = typeof albums.$inferSelect;
export type Song = typeof songs.$inferSelect;
export type Church = typeof churches.$inferSelect;
export type Pastor = typeof pastors.$inferSelect;
export type Sermon = typeof sermons.$inferSelect;
export type Playlist = typeof playlists.$inferSelect;
export type PlaylistSong = typeof playlistSongs.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type ListeningHistory = typeof listeningHistory.$inferSelect;
export type BibleVerse = typeof bibleVerses.$inferSelect;

export const insertPlaylistSchema = createInsertSchema(playlists).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export const insertListeningHistorySchema = createInsertSchema(listeningHistory).omit({
  id: true,
  playedAt: true,
});

export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type InsertListeningHistory = z.infer<typeof insertListeningHistorySchema>;
