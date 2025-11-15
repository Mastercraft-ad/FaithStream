import type { Song, Album, Artist, Sermon, Pastor, Church } from "@shared/schema";

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Elevation Worship",
    bio: "Contemporary Christian worship band from Charlotte, North Carolina",
    imageUrl: "/api/placeholder/200/200",
    genre: "Worship",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Maverick City Music",
    bio: "Contemporary worship music collective and record label",
    imageUrl: "/api/placeholder/200/200",
    genre: "Worship",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "CeCe Winans",
    bio: "Award-winning Gospel singer and worship leader",
    imageUrl: "/api/placeholder/200/200",
    genre: "Gospel",
    createdAt: new Date(),
  },
];

export const mockAlbums: Album[] = [
  {
    id: "1",
    title: "Lion",
    artistId: "1",
    coverUrl: "/api/placeholder/400/400",
    releaseYear: 2022,
    genre: "Worship",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Jubilee",
    artistId: "2",
    coverUrl: "/api/placeholder/400/400",
    releaseYear: 2023,
    genre: "Worship",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Believe For It",
    artistId: "3",
    coverUrl: "/api/placeholder/400/400",
    releaseYear: 2021,
    genre: "Gospel",
    createdAt: new Date(),
  },
];

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "O Come to the Altar",
    artistId: "1",
    albumId: "1",
    duration: 312,
    lyrics: "Are you hurting and broken within\nOverwhelmed by the weight of your sin\nJesus is calling\nHave you come to the end of yourself\nDo you thirst for a drink from the well\nJesus is calling",
    audioUrl: "https://example.com/song1.mp3",
    genre: "Worship",
    playCount: 15420,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Jireh",
    artistId: "2",
    albumId: "2",
    duration: 298,
    lyrics: "I'll never be more loved than I am right now\nWasn't holding You up\nSo there's nothing I can do to let You down\nIt doesn't take a trophy to make You proud\nI'll never be more loved than I am right now",
    audioUrl: "https://example.com/song2.mp3",
    genre: "Worship",
    playCount: 28950,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Believe For It",
    artistId: "3",
    albumId: "3",
    duration: 286,
    lyrics: "They say this mountain can't be moved\nThey say these chains will never break\nBut they don't know You like we do\nThere is power in Your name",
    audioUrl: "https://example.com/song3.mp3",
    genre: "Gospel",
    playCount: 12350,
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Here Again",
    artistId: "1",
    albumId: "1",
    duration: 245,
    lyrics: "Here I am before You now\nLaying down my burdens\nSurrendering my all to You\nTake my life and lead me on",
    audioUrl: "https://example.com/song4.mp3",
    genre: "Worship",
    playCount: 8720,
    createdAt: new Date(),
  },
];

export const mockChurches: Church[] = [
  {
    id: "1",
    name: "Grace Community Church",
    location: "Los Angeles, CA",
    description: "A vibrant community of believers dedicated to worship, fellowship, and spreading the Gospel",
    bannerUrl: "/api/placeholder/1200/300",
    logoUrl: "/api/placeholder/200/200",
    memberCount: 5200,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "The Potter's House",
    location: "Dallas, TX",
    description: "Empowering lives through faith, hope, and spiritual growth",
    bannerUrl: "/api/placeholder/1200/300",
    logoUrl: "/api/placeholder/200/200",
    memberCount: 12000,
    createdAt: new Date(),
  },
];

export const mockPastors: Pastor[] = [
  {
    id: "1",
    name: "Pastor John Smith",
    churchId: "1",
    bio: "Senior Pastor at Grace Community Church, dedicated to teaching God's Word with clarity and passion",
    photoUrl: "/api/placeholder/200/200",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Bishop T.D. Johnson",
    churchId: "2",
    bio: "Visionary leader and passionate preacher committed to transforming lives through faith",
    photoUrl: "/api/placeholder/200/200",
    createdAt: new Date(),
  },
];

export const mockSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Faith",
    pastorId: "1",
    churchId: "1",
    description: "A powerful message about trusting God in uncertain times and stepping out in faith",
    thumbnailUrl: "/api/placeholder/640/360",
    audioUrl: "https://example.com/sermon1.mp3",
    videoUrl: "https://example.com/sermon1.mp4",
    duration: 2340,
    category: "Faith",
    scripture: "Hebrews 11:1",
    playCount: 3420,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "The Power of Grace",
    pastorId: "1",
    churchId: "1",
    description: "Understanding God's amazing grace and its transformative power in our daily lives",
    thumbnailUrl: "/api/placeholder/640/360",
    audioUrl: "https://example.com/sermon2.mp3",
    videoUrl: "https://example.com/sermon2.mp4",
    duration: 2680,
    category: "Grace",
    scripture: "Ephesians 2:8-9",
    playCount: 4150,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Healing and Restoration",
    pastorId: "2",
    churchId: "2",
    description: "God's promise of healing - physical, emotional, and spiritual restoration through Christ",
    thumbnailUrl: "/api/placeholder/640/360",
    audioUrl: "https://example.com/sermon3.mp3",
    videoUrl: "https://example.com/sermon3.mp4",
    duration: 3120,
    category: "Healing",
    scripture: "Isaiah 53:5",
    playCount: 5680,
    createdAt: new Date(),
  },
];

export const verseOfTheDay = {
  book: "Psalms",
  chapter: 23,
  verse: 1,
  text: "The Lord is my shepherd; I shall not want.",
  reference: "Psalm 23:1",
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatPlayCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};
