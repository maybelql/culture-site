'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"
import HomeBanner from "@/components/home-banner"
import CategoryNav from "@/components/category-nav"
import RecommendedProducts from "@/components/recommended-products"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { productApi } from "@/lib/api"

export default function HomePage() {
  const [popularProduct, setPopularProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProduct = async () => {
      try {
        const response = await productApi.getPopularProducts();
        if (response.data.data && response.data.data.length > 0) {
          setPopularProduct(response.data.data[0]);
        }
      } catch (error) {
        console.error('获取热门商品失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProduct();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeader title="焕遗 IP交易平台" showSearch={true} />
      <HomeBanner />
      <CategoryNav />
      
      {/* 热门商品展示 */}
      <section className="container py-8">
        <h2 className="text-2xl font-bold mb-6">热门商品</h2>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[300px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        ) : popularProduct ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={popularProduct.imageUrl}
                alt={popularProduct.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold">{popularProduct.name}</h3>
              <p className="text-gray-500">{popularProduct.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">￥{popularProduct.price}</span>
              </div>
              <Button asChild>
                <Link href={`/product/${popularProduct.id}`}>查看详情</Link>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">暂无热门商品</p>
        )}
      </section>

      <RecommendedProducts />
    </div>
  )
}
