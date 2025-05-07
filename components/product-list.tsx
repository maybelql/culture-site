'use client'

import { useState, useEffect } from "react"
import { Product } from "@/lib/api"
import { productApi } from "@/lib/api"
import ProductCard from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductListProps {
  category?: string
  searchQuery?: string
}

export default function ProductList({ category, searchQuery }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let response
        if (category) {
          response = await productApi.getProductsByCategory(category)
        } else if (searchQuery) {
          response = await productApi.searchProducts(searchQuery)
        } else {
          response = await productApi.getProducts()
        }
        if (response.data.data) {
          setProducts(response.data.data)
        }
      } catch (error) {
        console.error('获取产品列表失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, searchQuery])

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      await productApi.addToCart(productId, quantity)
      // 可以添加成功提示
    } catch (error) {
      console.error('添加到购物车失败:', error)
      // 可以添加错误提示
    }
  }

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">暂无产品</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(product.id)}
        />
      ))}
    </div>
  )
} 