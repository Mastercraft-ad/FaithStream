import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Play, Search, Music as MusicIcon, Heart } from "lucide-react";
import { formatDuration, formatPlayCount } from "@/lib/mockData";
import { useQuery } from "@tanstack/react-query";
import type { Song, Artist, Album } from "@shared/schema";
import albumCover1 from "@assets/generated_images/Gospel_album_cover_1_2bf342fa.png";
import albumCover2 from "@assets/generated_images/Gospel_album_cover_2_ce9297f4.png";
import albumCover3 from "@assets/generated_images/Gospel_album_cover_3_e2e3f5d5.png";

const albumCovers = [albumCover1, albumCover2, albumCover3];
const genres = ["All", "Worship", "Praise", "Gospel", "Hymns", "Afro-gospel"];

export default function Music() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: songs = [] } = useQuery<Song[]>({
    queryKey: ["/api/songs"],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists"],
  });

  const { data: albums = [] } = useQuery<Album[]>({
    queryKey: ["/api/albums"],
  });

  const filteredSongs = songs.filter((song) => {
    const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre;
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artists.find((a) => a.id === song.artistId)?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse Music</h1>
        <p className="text-muted-foreground">
          Discover Gospel music, worship songs, and praise from top Christian artists
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search songs, artists, albums..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-music"
          />
        </div>
      </div>

      <Tabs defaultValue="songs" className="space-y-8">
        <TabsList>
          <TabsTrigger value="songs" data-testid="tab-songs">Songs</TabsTrigger>
          <TabsTrigger value="albums" data-testid="tab-albums">Albums</TabsTrigger>
          <TabsTrigger value="artists" data-testid="tab-artists">Artists</TabsTrigger>
          <TabsTrigger value="genres" data-testid="tab-genres">Genres</TabsTrigger>
        </TabsList>

        <TabsContent value="songs" className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                data-testid={`button-genre-${genre.toLowerCase()}`}
              >
                {genre}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredSongs.map((song, index) => (
              <Card key={song.id} className="hover-elevate group cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <img
                      src={albumCovers[index % albumCovers.length]}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Button
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                        data-testid={`button-play-song-${song.id}`}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-1">{song.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {artists.find((a) => a.id === song.artistId)?.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{song.genre}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDuration(song.duration)}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MusicIcon className="h-4 w-4" />
                      {formatPlayCount(song.playCount)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      data-testid={`button-favorite-song-${song.id}`}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {albums.map((album, index) => (
              <Card key={album.id} className="hover-elevate group cursor-pointer">
                <CardContent className="p-4">
                  <div className="relative mb-3 aspect-square rounded-md overflow-hidden bg-muted">
                    <img
                      src={albumCovers[index % albumCovers.length]}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Button
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`button-play-album-${album.id}`}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium mb-1 truncate">{album.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {artists.find((a) => a.id === album.artistId)?.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {album.releaseYear}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <Card key={artist.id} className="hover-elevate cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <MusicIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg mb-2">{artist.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {artist.bio}
                      </p>
                      <Badge>{artist.genre}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="genres">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.filter((g) => g !== "All").map((genre) => {
              const genreCount = songs.filter((s) => s.genre === genre).length;
              return (
                <Card
                  key={genre}
                  className="hover-elevate cursor-pointer"
                  onClick={() => {
                    setSelectedGenre(genre);
                    document.querySelector('[value="songs"]')?.dispatchEvent(new Event('click', { bubbles: true }));
                  }}
                >
                  <CardContent className="p-8 text-center">
                    <MusicIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h4 className="font-semibold text-xl mb-2">{genre}</h4>
                    <p className="text-sm text-muted-foreground">
                      {genreCount} {genreCount === 1 ? "song" : "songs"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
