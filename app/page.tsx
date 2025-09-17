import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
        {/* Coming Soon Badge */}
        <Badge variant="secondary" className="mb-4">
          🚀 Coming Soon
        </Badge>
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          OnlineGames.Net
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          Your ultimate destination for the best online games, gaming resources, and top game recommendations. Discover HTML5 games, mobile apps, and gaming sites. Launching 2026.
        </p>
      </main>
    </div>
  )
}
