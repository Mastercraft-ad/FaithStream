import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Book, Bookmark, Share2 } from "lucide-react";
import { verseOfTheDay } from "@/lib/mockData";
import verseBackground from "@assets/generated_images/Peaceful_nature_verse_background_203d9b1b.png";

const books = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "Psalms", "Proverbs", "Ecclesiastes", "Isaiah", "Jeremiah",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Revelation"
];

const sampleVerses = [
  { verse: 1, text: "The Lord is my shepherd; I shall not want." },
  { verse: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
  { verse: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
  { verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
  { verse: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
  { verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever." },
];

export default function Bible() {
  const [selectedBook, setSelectedBook] = useState("Psalms");
  const [selectedChapter, setSelectedChapter] = useState("23");
  const [selectedTranslation, setSelectedTranslation] = useState("KJV");

  return (
    <div className="pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Holy Bible</h1>
        <p className="text-muted-foreground">
          Read scripture, meditate on God's Word, and grow in faith
        </p>
      </div>

      <section className="mb-12">
        <Card
          className="relative overflow-hidden"
          style={{
            backgroundImage: `url(${verseBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          <CardContent className="relative p-8 md:p-12">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Verse of the Day
            </Badge>
            <blockquote className="text-2xl md:text-3xl font-serif text-white mb-6 leading-relaxed">
              "{verseOfTheDay.text}"
            </blockquote>
            <p className="text-lg font-mono text-white/90 mb-6">
              {verseOfTheDay.reference}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20"
                data-testid="button-share-verse"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20"
                data-testid="button-bookmark-verse"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-2xl">
                {selectedBook} {selectedChapter}
              </CardTitle>
              <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                <SelectTrigger className="w-32" data-testid="select-translation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KJV">KJV</SelectItem>
                  <SelectItem value="NIV">NIV</SelectItem>
                  <SelectItem value="NKJV">NKJV</SelectItem>
                  <SelectItem value="ESV">ESV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger className="flex-1" data-testid="select-book">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {books.map((book) => (
                    <SelectItem key={book} value={book}>
                      {book}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                <SelectTrigger className="w-24" data-testid="select-chapter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 150 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-8">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6 font-serif text-lg leading-relaxed">
                {sampleVerses.map((v) => (
                  <div
                    key={v.verse}
                    className="flex gap-4 group hover-elevate p-3 -ml-3 rounded-md cursor-pointer"
                  >
                    <span className="text-sm font-mono text-muted-foreground flex-shrink-0 mt-1">
                      {v.verse}
                    </span>
                    <p className="flex-1">{v.text}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        data-testid={`button-bookmark-verse-${v.verse}`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        data-testid={`button-share-verse-${v.verse}`}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Book className="h-5 w-5" />
                Books of the Bible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-1">
                  {books.map((book) => (
                    <button
                      key={book}
                      onClick={() => setSelectedBook(book)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover-elevate ${
                        selectedBook === book
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                      data-testid={`button-book-${book.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {book}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reading Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-md hover-elevate cursor-pointer">
                <h5 className="font-medium mb-1">Bible in One Year</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Read through the entire Bible in 365 days
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3" />
                  </div>
                  <span className="text-xs text-muted-foreground">33%</span>
                </div>
              </div>
              <div className="p-3 border rounded-md hover-elevate cursor-pointer">
                <h5 className="font-medium mb-1">Psalms & Proverbs</h5>
                <p className="text-sm text-muted-foreground mb-2">
                  Wisdom literature in 30 days
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3" />
                  </div>
                  <span className="text-xs text-muted-foreground">67%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
