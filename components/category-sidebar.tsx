"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface CategorySidebarProps {
  activeCategory: string
}

export default function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  const categories = [
    { id: "all", name: "全部分类" },
    { id: "craft", name: "传统技艺" },
    { id: "literature", name: "传统文学" },
    { id: "music", name: "音乐曲艺" },
    { id: "drama", name: "传统戏剧" },
    { id: "art", name: "传统美术" },
    { id: "heritage", name: "文化遗产" },
    { id: "popular", name: "热门IP" },
  ]

  const subcategories = {
    craft: ["刺绣", "剪纸", "木雕", "陶瓷", "漆器", "织锦", "印染"],
    literature: ["诗词", "小说", "散文", "戏曲文学"],
    music: ["民歌", "戏曲音乐", "曲艺", "传统乐器"],
    drama: ["京剧", "昆曲", "豫剧", "粤剧", "川剧"],
    art: ["国画", "书法", "篆刻", "民间美术"],
    heritage: ["古建筑", "传统节日", "民俗活动"],
  }

  return (
    <div className="w-24 border-r min-h-[calc(100vh-120px)] flex-shrink-0 bg-gray-50">
      <div className="py-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={cn(
              "flex items-center justify-center py-3 text-sm border-l-2 border-transparent",
              activeCategory === category.id && "border-red-600 text-red-600 bg-white font-medium",
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
