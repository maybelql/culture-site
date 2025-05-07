"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { productApi } from "@/lib/api"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/lib/api"

export default function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getRecommendedProducts();
        if (response.data.data) {
          setProducts(response.data.data);
          // 初始化每个商品的数量为1
          const initialQuantities = response.data.data.reduce((acc: Record<string, number>, product: Product) => {
            acc[product.id] = 1;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error('获取推荐商品失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, (prev[productId] || 1) + delta);
      return { ...prev, [productId]: newQuantity };
    });
  };

  if (loading) {
    return (
      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-6">推荐商品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-6">推荐商品</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <Link href={`/product/${product.id}`}>
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.type}</p>
                <p className="text-lg font-medium text-gray-900">￥{product.price}</p>
              </div>
            </Link>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(product.id, -1)}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantities[product.id] || 1}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(product.id, 1)}
                >
                  +
                </Button>
              </div>
              <Button size="sm">加入购物车</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
