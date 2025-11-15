import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Clock, TrendingUp } from "lucide-react";
import { formatDuration, formatPlayCount } from "@/lib/mockData";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Song, Sermon, Artist, BibleVerse } from "@shared/schema";
import heroImage1 from "@assets/generated_images/Worship_hands_raised_banner_519e1d6a.png";
import heroImage2 from "@assets/generated_images/Gospel_choir_performance_banner_f2fcda5f.png";
import verseBackground from "@assets/generated_images/Peaceful_nature_verse_background_203d9b1b.png";
import albumCover1 from "@assets/generated_images/Gospel_album_cover_1_2bf342fa.png";
import albumCover2 from "@assets/generated_images/Gospel_album_cover_2_ce9297f4.png";
import albumCover3 from "@assets/generated_images/Gospel_album_cover_3_e2e3f5d5.png";
import sermonThumb from "@assets/generated_images/Pastor_preaching_thumbnail_2b9e555c.png";

const heroImages = [heroImage1, heroImage2];
const albumCovers = [albumCover1, albumCover2, albumCover3];

export default function Home() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const { data: songs = [], isLoading: songsLoading } = useQuery<Song[]>({
    queryKey: ["/api/songs"],
  });

  const { data: sermons = [], isLoading: sermonsLoading } = useQuery<Sermon[]>({
    queryKey: ["/api/sermons"],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists"],
  });

  const { data: verseData } = useQuery<BibleVerse>({
    queryKey: ["/api/bible/verse-of-the-day"],
  });

  const verseOfTheDay = verseData
    ? {
        ...verseData,
        reference: `${verseData.book} ${verseData.chapter}:${verseData.verse}`,
      }
    : {
        text: "The Lord is my shepherd; I shall not want.",
        reference: "Psalm 23:1",
      };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-24">
      <section className="relative h-[500px] overflow-hidden rounded-lg mb-8">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Featured content ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
        ))}
        <div className="relative h-full flex items-center px-8 md:px-12">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Featured
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              New Gospel Releases
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Discover the latest worship songs and praise music from your favorite artists
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-white"
              data-testid="button-play-featured"
            >
              <Play className="h-5 w-5 mr-2" />
              Play Now
            </Button>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentHeroIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => setCurrentHeroIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div
          className="relative h-64 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${verseBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
            <p className="text-sm font-mono text-white/80 mb-2">
              Verse of the Day
            </p>
            <blockquote className="text-2xl md:text-3xl font-serif text-white mb-4 max-w-3xl leading-relaxed">
              "{verseOfTheDay.text}"
            </blockquote>
            <p className="text-sm font-mono text-white/90">
              {verseOfTheDay.reference}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Continue Listening</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/library">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="aspect-square mb-3" />
                  <Skeleton className="h-4 mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            songs.slice(0, 4).map((song, index) => (
            <Card key={song.id} className="hover-elevate group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-3 aspect-square rounded-md overflow-hidden bg-muted">
                  <img
                    src={albumCovers[index % albumCovers.length]}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Button
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-play-song-${song.id}`}
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-1 truncate">
                  {song.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {artists.find((a) => a.id === song.artistId)?.name}
                </p>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold mb-1">New Gospel Releases</h3>
            <p className="text-sm text-muted-foreground">
              Latest worship music from top artists
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/music">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {songs.map((song, index) => (
            <Card key={song.id} className="hover-elevate group cursor-pointer">
              <CardContent className="p-4">
                <div className="relative mb-3 aspect-square rounded-md overflow-hidden bg-muted">
                  <img
                    src={albumCovers[index % albumCovers.length]}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Button
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-play-new-${song.id}`}
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-1 truncate">
                  {song.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {artists.find((a) => a.id === song.artistId)?.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {song.genre}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold mb-1 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Trending Sermons
            </h3>
            <p className="text-sm text-muted-foreground">
              Most played messages this week
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sermons">View All</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <Card key={sermon.id} className="hover-elevate group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={sermonThumb}
                  alt={sermon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Button
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-14 h-14"
                    data-testid={`button-play-sermon-${sermon.id}`}
                  >
                    <Play className="h-7 w-7" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-black/60 text-white border-white/20 backdrop-blur-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDuration(sermon.duration)}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {sermon.title}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Pastor</span>
                  <span>•</span>
                  <span>{formatPlayCount(sermon.playCount)} plays</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Badge variant="secondary">{sermon.category}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
