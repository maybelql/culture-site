"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "非物质文化遗产IP授权交易平台",
    description: "连接传统文化与现代商业的桥梁",
    image: "/banner1.jpg",
    link: "/products"
  },
  {
    id: 2,
    title: "专业IP授权服务",
    description: "为您的品牌注入文化内涵",
    image: "/banner2.jpg",
    link: "/about"
  }
]

export default function HomeBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{
          transform: `translateX(-${currentBanner * 100}%)`,
          display: "flex",
          width: `${banners.length * 100}%`
        }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full h-full flex-shrink-0"
            style={{ width: `${100 / banners.length}%` }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
              <p className="text-lg mb-6">{banner.description}</p>
              <Button asChild>
                <a href={banner.link}>了解更多</a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30"
        onClick={prevBanner}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30"
        onClick={nextBanner}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBanner ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  )
}
