"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RecommendedProducts() {
  const products = [
    {
      id: "1",
      name: "苏州刺绣·百鸟朝凤",
      type: "刺绣",
      price: 2000,
      image: "/images/bainiaochaofeng.jpg?height=300&width=300",
    },
    {
      id: "2",
      name: "景德镇青花瓷·山水纹",
      type: "陶瓷",
      price: 1500,
      image: "/images/qinghuashanshui.jpg?height=300&width=300",
    },
    {
      id: "3",
      name: "川剧变脸·面谱设计",
      type: "戏曲",
      price: 1200,
      image: "/images/chuanju_bianlian_hong.jpg?height=300&width=300",
    },
    {
      id: "4",
      name: "敦煌壁画·飞天图案",
      type: "美术",
      price: 2500,
      image: "/images/dunhuangfei.jpg?height=300&width=300",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden">
          <Link href={`/product/${product.id}`}>
            <div className="aspect-square relative">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
          </Link>

          <div className="p-2 space-y-1">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
            </Link>
            <div className="flex items-center text-xs">
              <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full">{product.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-red-600">¥{product.price}/年</p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-xs font-medium w-4 text-center">1</span>
                <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
