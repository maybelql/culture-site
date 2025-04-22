"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      id: 1,
      title: "中华传统文化",
      subtitle: "探索千年文化瑰宝",
      image: "/images/traditional—culture.jpg?height=400&width=800",
    },
    {
      id: 2,
      title: "非物质文化遗产",
      subtitle: "传承匠心技艺",
      image: "/images/feiyi.png?height=400&width=800",
    },
    {
      id: 3,
      title: "IP授权交易",
      subtitle: "让传统文化焕发新生",
      image: "/images/ip—zai.png?height=400&width=800",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[200px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
              <h2 className="text-white font-bold text-xl">{banner.title}</h2>
              <p className="text-white/80 text-sm">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
