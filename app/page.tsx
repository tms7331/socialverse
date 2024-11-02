'use client'

import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { Music2, Brain, Rocket, Bike, Heart, Spade, Users } from 'lucide-react'
// TruthOrDare,

interface Category {
  id: string
  label: string
}

interface Page {
  id: string
  title: string
  icon: React.ReactNode
  categories: string[]
  href: string
}

const categories: Category[] = [
  { id: 'fun', label: 'Fun' },
  { id: 'dating', label: 'Dating' },
  { id: 'realWorld', label: 'Real World' },
  { id: 'videoChat', label: 'Video Chat' },
]

const pages: Page[] = [
  { id: 'truth-or-lai', title: 'Truth or l-AI', icon: <Brain className="h-8 w-8" />, categories: ['fun', 'videoChat'], href: '/truth-or-lai' },
  { id: 'fusion-tunes', title: 'Fusion Tunes', icon: <Music2 className="h-8 w-8" />, categories: ['fun', 'videoChat'], href: '/fusion-tunes' },
  { id: 'startup-roulette', title: 'Startup Roulette', icon: <Rocket className="h-8 w-8" />, categories: ['videoChat'], href: '/startup-roulette' },
  { id: 'poker-stream', title: 'Poker Stream', icon: <Spade className="h-8 w-8" />, categories: ['fun', 'videoChat'], href: '/poker-stream' },
  { id: 'strava-pvp', title: 'Strava PVP', icon: <Bike className="h-8 w-8" />, categories: ['fun'], href: '/strava-pvp' },
  { id: 'love-actually', title: 'Love, Actually', icon: <Heart className="h-8 w-8" />, categories: ['dating'], href: '/love-actually' },
  { id: 'cofounder-match', title: 'Cofounder Match', icon: <Users className="h-8 w-8" />, categories: ['dating', 'realWorld'], href: '/cofounder-match' },
]

export default function LandingPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredPages = selectedCategories.length === 0
    ? pages
    : pages.filter(page => page.categories.some(cat => selectedCategories.includes(cat)))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Platform</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Category:</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPages.map(page => (
            <Link key={page.id} href={page.href}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {page.icon}
                  <h3 className="mt-4 text-lg font-semibold text-center">{page.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}