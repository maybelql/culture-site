"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"

interface ProductGridProps {
  categoryId: string
}

export default function ProductGrid({ categoryId }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("popular")

  const products = [
    {
      id: "1",
      name: "苏州刺绣·百鸟朝凤",
      type: "刺绣",
      category: "craft",
      price: 2000,
      image: "/images/bainiaochaofeng.jpg?height=300&width=300",
    },
    {
      id: "2",
      name: "景德镇青花瓷·山水纹",
      type: "陶瓷",
      category: "craft",
      price: 1500,
      image: "/images/qinghuashanshui.jpg?height=300&width=300",
    },
    {
      id: "3",
      name: "川剧变脸·面谱设计",
      type: "戏曲",
      category: "drama",
      price: 3000,
      image: "/images/chuanju_bianlian_hong.jpg?height=300&width=300",
    },
    {
      id: "4",
      name: "敦煌壁画·飞天图案",
      type: "美术",
      category: "art",
      price: 2500,
      image: "/images/dunhuangfei.jpg?height=300&width=300",
    },
    {
      id: "5",
      name: "北京剪纸·十二生肖",
      type: "剪纸",
      category: "craft",
      price: 1800,
      image: "/images/twl—shengxiao.jpg?height=300&width=300",
    },
    {
      id: "6",
      name: "云南扎染·民族图腾",
      type: "印染",
      category: "craft",
      price: 1200,
      image: "/images/zharan.jpg?height=300&width=300",
    },
  ]

  const filteredProducts =
    categoryId === "all" || categoryId === "popular"
      ? products
      : products.filter((product) => product.category === categoryId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">共 {filteredProducts.length} 个IP作品</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            筛选
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">按热度</SelectItem>
              <SelectItem value="newest">最新上架</SelectItem>
              <SelectItem value="price-asc">价格从低到高</SelectItem>
              <SelectItem value="price-desc">价格从高到低</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="border rounded-lg overflow-hidden transition-all duration-200 group-hover:shadow-md">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2 space-y-1">
                <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center text-xs">
                  <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full">{product.type}</span>
                </div>
                <p className="text-sm font-bold text-red-600">¥{product.price}/年</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
