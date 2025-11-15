import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Music, Mic2, Heart, Clock, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const userInitials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";

  return (
    <div className="pb-24">
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.profileImageUrl || undefined} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex gap-3">
                <Button variant="outline" data-testid="button-edit-profile">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" asChild data-testid="button-logout">
                  <a href="/api/logout">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">247</h3>
              <p className="text-sm text-muted-foreground">Songs Played</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                <Mic2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">32</h3>
              <p className="text-sm text-muted-foreground">Sermons Heard</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">18</h3>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">42h</h3>
              <p className="text-sm text-muted-foreground">Listening Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Favorite Artists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Elevation Worship", "Maverick City Music", "CeCe Winans"].map((artist) => (
              <div key={artist} className="flex items-center gap-3 p-3 rounded-md hover-elevate cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Music className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{artist}</h4>
                  <p className="text-sm text-muted-foreground">Gospel Artist</p>
                </div>
                <Badge variant="secondary">Following</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                <Music className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="mb-1">Added <strong>Jireh</strong> to Sunday Worship playlist</p>
                <p className="text-muted-foreground text-xs">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                <Mic2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="mb-1">Listened to <strong>Walking in Faith</strong> sermon</p>
                <p className="text-muted-foreground text-xs">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                <Heart className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="mb-1">Liked <strong>Believe For It</strong> by CeCe Winans</p>
                <p className="text-muted-foreground text-xs">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
