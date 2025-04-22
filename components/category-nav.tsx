"use client"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Scissors, Music, BookOpen, Palette, Theater, Landmark } from "lucide-react"

export default function CategoryNav() {
  const categories = [
    { id: "craft", name: "传统技艺", icon: <Scissors className="h-5 w-5" /> },
    { id: "literature", name: "传统文学", icon: <BookOpen className="h-5 w-5" /> },
    { id: "music", name: "音乐曲艺", icon: <Music className="h-5 w-5" /> },
    { id: "drama", name: "传统戏剧", icon: <Theater className="h-5 w-5" /> },
    { id: "art", name: "传统美术", icon: <Palette className="h-5 w-5" /> },
    { id: "heritage", name: "文化遗产", icon: <Landmark className="h-5 w-5" /> },
  ]

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex flex-col items-center justify-center p-2 gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              {category.icon}
            </div>
            <span className="text-xs">{category.name}</span>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
