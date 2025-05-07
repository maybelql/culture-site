'use client'

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/api"

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string, quantity: number) => void
  onToggleFavorite?: (productId: string) => void
  isFavorite?: boolean
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images[0] || '/placeholder.png'}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.type}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">¥{product.price}</p>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToCart?.(product.id, 1)}
        >
          加入购物车
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFavorite?.(product.id)}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>
    </div>
  )
} 