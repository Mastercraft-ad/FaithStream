import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Search, Clock, User } from "lucide-react";
import { formatDuration, formatPlayCount } from "@/lib/mockData";
import { useQuery } from "@tanstack/react-query";
import type { Sermon, Pastor } from "@shared/schema";
import sermonThumb from "@assets/generated_images/Pastor_preaching_thumbnail_2b9e555c.png";

const categories = ["All", "Faith", "Grace", "Healing", "Prayer", "Worship", "Hope"];

export default function Sermons() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: sermons = [] } = useQuery<Sermon[]>({
    queryKey: ["/api/sermons"],
  });

  const { data: pastors = [] } = useQuery<Pastor[]>({
    queryKey: ["/api/pastors"],
  });

  const filteredSermons = sermons.filter((sermon) => {
    const matchesCategory = selectedCategory === "All" || sermon.category === selectedCategory;
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sermons & Teaching</h1>
        <p className="text-muted-foreground">
          Listen to powerful messages from renowned pastors and church leaders
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search sermons, pastors, topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-sermons"
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium mb-3">Browse by Category</h3>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              data-testid={`button-category-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Featured Pastors</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastors.map((pastor) => {
            const sermonCount = sermons.filter((s) => s.pastorId === pastor.id).length;
            return (
              <Card key={pastor.id} className="hover-elevate cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg mb-2">{pastor.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {pastor.bio}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sermonCount} {sermonCount === 1 ? "sermon" : "sermons"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-6">
          {selectedCategory === "All" ? "All Sermons" : `${selectedCategory} Sermons`}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
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
                <CardTitle className="text-lg line-clamp-2">
                  {sermon.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    {mockPastors.find((p) => p.id === sermon.pastorId)?.name}
                  </span>
                  <span>•</span>
                  <span>{formatPlayCount(sermon.playCount)} plays</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {sermon.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{sermon.category}</Badge>
                  {sermon.scripture && (
                    <Badge variant="outline" className="font-mono text-xs">
                      {sermon.scripture}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
