import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Mic2, Book, Heart } from "lucide-react";
import heroImage1 from "@assets/generated_images/Worship_hands_raised_banner_519e1d6a.png";
import heroImage2 from "@assets/generated_images/Gospel_choir_performance_banner_f2fcda5f.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">FaithStream</h1>
            </div>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/api/login">Sign In</a>
          </Button>
        </div>
      </header>

      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage1}
            alt="Worship moment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Sacred Space for Faith & Worship
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Stream Gospel music, powerful sermons, and daily devotionals. 
              Read the Bible, grow your faith, and connect with a global community of believers.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild data-testid="button-get-started">
                <a href="/api/login" className="bg-white text-primary hover:bg-white/90 border-white">
                  Get Started Free
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Everything You Need in One Platform
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete Christian media experience designed to help you worship, learn, and grow spiritually
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mb-4">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Gospel Music</h4>
                <p className="text-muted-foreground">
                  Stream thousands of worship songs, hymns, and praise music from top gospel artists
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mb-4">
                  <Mic2 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Sermons & Teaching</h4>
                <p className="text-muted-foreground">
                  Access powerful sermons from renowned pastors and church leaders worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Bible Reading</h4>
                <p className="text-muted-foreground">
                  Read scripture with multiple translations, daily verses, and reading plans
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Safe & Pure</h4>
                <p className="text-muted-foreground">
                  100% Christian content with no worldly distractions or explicit material
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={heroImage2}
                alt="Gospel choir"
                className="rounded-lg w-full"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                Join a Global Community of Believers
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                FaithStream brings together Christians from around the world in one sacred digital space. 
                Whether you're seeking worship music, powerful teaching, or daily encouragement through 
                scripture, we're here to support your spiritual journey.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Personalized Experience</h5>
                    <p className="text-sm text-muted-foreground">
                      Custom playlists, saved sermons, and content tailored to your spiritual needs
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Always Accessible</h5>
                    <p className="text-sm text-muted-foreground">
                      Stream anytime, anywhere on any device with seamless sync
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Church Connect</h5>
                    <p className="text-sm text-muted-foreground">
                      Stay connected with your local church and access their content
                    </p>
                  </div>
                </li>
              </ul>
              <Button size="lg" asChild data-testid="button-join-now">
                <a href="/api/login">Join FaithStream Today</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold">FaithStream</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Your trusted Christian media platform
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 FaithStream. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
