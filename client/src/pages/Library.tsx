import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Heart, Clock, Plus, MoreVertical } from "lucide-react";
import { mockSongs, mockSermons, mockArtists, formatDuration } from "@/lib/mockData";
import albumCover1 from "@assets/generated_images/Gospel_album_cover_1_2bf342fa.png";
import albumCover2 from "@assets/generated_images/Gospel_album_cover_2_ce9297f4.png";
import albumCover3 from "@assets/generated_images/Gospel_album_cover_3_e2e3f5d5.png";
import sermonThumb from "@assets/generated_images/Pastor_preaching_thumbnail_2b9e555c.png";

const albumCovers = [albumCover1, albumCover2, albumCover3];

const mockPlaylists = [
  { id: "1", name: "Sunday Worship", songCount: 12, coverUrl: albumCover1 },
  { id: "2", name: "Prayer & Meditation", songCount: 8, coverUrl: albumCover2 },
  { id: "3", name: "Praise & Thanksgiving", songCount: 15, coverUrl: albumCover3 },
];

export default function Library() {
  const [activeTab, setActiveTab] = useState("playlists");

  return (
    <div className="pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Library</h1>
        <p className="text-muted-foreground">
          Access your playlists, favorites, and listening history
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="playlists" data-testid="tab-playlists">Playlists</TabsTrigger>
          <TabsTrigger value="favorites" data-testid="tab-favorites">Favorites</TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">My Playlists</h3>
            <Button data-testid="button-create-playlist">
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPlaylists.map((playlist) => (
              <Card key={playlist.id} className="hover-elevate group cursor-pointer">
                <CardContent className="p-4">
                  <div className="relative mb-3 aspect-square rounded-md overflow-hidden bg-muted">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Button
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`button-play-playlist-${playlist.id}`}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium mb-1">{playlist.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {playlist.songCount} songs
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Favorite Songs</h3>
            <Badge variant="secondary">{mockSongs.length} songs</Badge>
          </div>

          <div className="space-y-2">
            {mockSongs.map((song, index) => (
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
                        data-testid={`button-play-favorite-${song.id}`}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-1">{song.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {mockArtists.find((a) => a.id === song.artistId)?.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDuration(song.duration)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      data-testid={`button-unfavorite-${song.id}`}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Recently Played</h3>
            <p className="text-sm text-muted-foreground">
              Your listening history from the past 30 days
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Today</h4>
              <div className="space-y-2">
                {mockSongs.slice(0, 2).map((song, index) => (
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
                            data-testid={`button-play-history-${song.id}`}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-1">{song.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {mockArtists.find((a) => a.id === song.artistId)?.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>2 hours ago</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">This Week</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {mockSermons.slice(0, 2).map((sermon) => (
                  <Card key={sermon.id} className="hover-elevate group cursor-pointer">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-24 aspect-video flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <img
                          src={sermonThumb}
                          alt={sermon.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Button
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                            data-testid={`button-play-history-sermon-${sermon.id}`}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium mb-1 line-clamp-2">{sermon.title}</h5>
                        <p className="text-sm text-muted-foreground mb-2">Pastor John Smith</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>3 days ago</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
