import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Church as ChurchIcon, Play } from "lucide-react";
import { mockChurches, mockSermons } from "@/lib/mockData";
import { useState } from "react";
import churchBanner from "@assets/generated_images/Church_building_banner_b0555222.png";
import sermonThumb from "@assets/generated_images/Pastor_preaching_thumbnail_2b9e555c.png";

export default function Churches() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChurches = mockChurches.filter((church) =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    church.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Churches</h1>
        <p className="text-muted-foreground">
          Connect with churches and access their sermons and worship content
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search churches by name or location..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-churches"
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredChurches.map((church) => {
          const churchSermons = mockSermons.filter((s) => s.churchId === church.id);
          return (
            <Card key={church.id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                <img
                  src={churchBanner}
                  alt={church.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end gap-4">
                    <Avatar className="w-20 h-20 border-4 border-card">
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {church.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {church.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-white/90">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {church.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {church.memberCount?.toLocaleString()} members
                        </span>
                      </div>
                    </div>
                    <Button data-testid={`button-follow-church-${church.id}`}>
                      <ChurchIcon className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">{church.description}</p>

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Sermons</h3>
                  <Badge variant="secondary">{churchSermons.length} sermons</Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {churchSermons.map((sermon) => (
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
                            className="opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12"
                            data-testid={`button-play-church-sermon-${sermon.id}`}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base line-clamp-2">
                          {sermon.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {sermon.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
