import { db } from "./db";
import { artists, albums, songs, churches, pastors, sermons, bibleVerses } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const artistData = await db.insert(artists).values([
    {
      name: "Elevation Worship",
      bio: "Contemporary Christian worship band from Charlotte, North Carolina",
      genre: "Worship",
    },
    {
      name: "Maverick City Music",
      bio: "Contemporary worship music collective and record label",
      genre: "Worship",
    },
    {
      name: "CeCe Winans",
      bio: "Award-winning Gospel singer and worship leader",
      genre: "Gospel",
    },
  ]).returning();

  console.log("Artists created:", artistData.length);

  const albumData = await db.insert(albums).values([
    {
      title: "Lion",
      artistId: artistData[0].id,
      releaseYear: 2022,
      genre: "Worship",
    },
    {
      title: "Jubilee",
      artistId: artistData[1].id,
      releaseYear: 2023,
      genre: "Worship",
    },
    {
      title: "Believe For It",
      artistId: artistData[2].id,
      releaseYear: 2021,
      genre: "Gospel",
    },
  ]).returning();

  console.log("Albums created:", albumData.length);

  const songData = await db.insert(songs).values([
    {
      title: "O Come to the Altar",
      artistId: artistData[0].id,
      albumId: albumData[0].id,
      duration: 312,
      lyrics: "Are you hurting and broken within\nOverwhelmed by the weight of your sin\nJesus is calling\nHave you come to the end of yourself\nDo you thirst for a drink from the well\nJesus is calling",
      genre: "Worship",
      playCount: 15420,
    },
    {
      title: "Jireh",
      artistId: artistData[1].id,
      albumId: albumData[1].id,
      duration: 298,
      lyrics: "I'll never be more loved than I am right now\nWasn't holding You up\nSo there's nothing I can do to let You down\nIt doesn't take a trophy to make You proud\nI'll never be more loved than I am right now",
      genre: "Worship",
      playCount: 28950,
    },
    {
      title: "Believe For It",
      artistId: artistData[2].id,
      albumId: albumData[2].id,
      duration: 286,
      lyrics: "They say this mountain can't be moved\nThey say these chains will never break\nBut they don't know You like we do\nThere is power in Your name",
      genre: "Gospel",
      playCount: 12350,
    },
    {
      title: "Here Again",
      artistId: artistData[0].id,
      albumId: albumData[0].id,
      duration: 245,
      lyrics: "Here I am before You now\nLaying down my burdens\nSurrendering my all to You\nTake my life and lead me on",
      genre: "Worship",
      playCount: 8720,
    },
  ]).returning();

  console.log("Songs created:", songData.length);

  const churchData = await db.insert(churches).values([
    {
      name: "Grace Community Church",
      location: "Los Angeles, CA",
      description: "A vibrant community of believers dedicated to worship, fellowship, and spreading the Gospel",
      memberCount: 5200,
    },
    {
      name: "The Potter's House",
      location: "Dallas, TX",
      description: "Empowering lives through faith, hope, and spiritual growth",
      memberCount: 12000,
    },
  ]).returning();

  console.log("Churches created:", churchData.length);

  const pastorData = await db.insert(pastors).values([
    {
      name: "Pastor John Smith",
      churchId: churchData[0].id,
      bio: "Senior Pastor at Grace Community Church, dedicated to teaching God's Word with clarity and passion",
    },
    {
      name: "Bishop T.D. Johnson",
      churchId: churchData[1].id,
      bio: "Visionary leader and passionate preacher committed to transforming lives through faith",
    },
  ]).returning();

  console.log("Pastors created:", pastorData.length);

  const sermonData = await db.insert(sermons).values([
    {
      title: "Walking in Faith",
      pastorId: pastorData[0].id,
      churchId: churchData[0].id,
      description: "A powerful message about trusting God in uncertain times and stepping out in faith",
      duration: 2340,
      category: "Faith",
      scripture: "Hebrews 11:1",
      playCount: 3420,
    },
    {
      title: "The Power of Grace",
      pastorId: pastorData[0].id,
      churchId: churchData[0].id,
      description: "Understanding God's amazing grace and its transformative power in our daily lives",
      duration: 2680,
      category: "Grace",
      scripture: "Ephesians 2:8-9",
      playCount: 4150,
    },
    {
      title: "Healing and Restoration",
      pastorId: pastorData[1].id,
      churchId: churchData[1].id,
      description: "God's promise of healing - physical, emotional, and spiritual restoration through Christ",
      duration: 3120,
      category: "Healing",
      scripture: "Isaiah 53:5",
      playCount: 5680,
    },
  ]).returning();

  console.log("Sermons created:", sermonData.length);

  const verseData = await db.insert(bibleVerses).values([
    {
      book: "Psalms",
      chapter: 23,
      verse: 1,
      text: "The Lord is my shepherd; I shall not want.",
      translation: "KJV",
    },
    {
      book: "Psalms",
      chapter: 23,
      verse: 2,
      text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
      translation: "KJV",
    },
    {
      book: "Psalms",
      chapter: 23,
      verse: 3,
      text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
      translation: "KJV",
    },
    {
      book: "Psalms",
      chapter: 23,
      verse: 4,
      text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      translation: "KJV",
    },
    {
      book: "Psalms",
      chapter: 23,
      verse: 5,
      text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
      translation: "KJV",
    },
    {
      book: "Psalms",
      chapter: 23,
      verse: 6,
      text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever.",
      translation: "KJV",
    },
  ]).returning();

  console.log("Bible verses created:", verseData.length);
  console.log("Database seeded successfully!");
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
