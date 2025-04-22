import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import HomeBanner from "@/components/home-banner"
import CategoryNav from "@/components/category-nav"
import RecommendedProducts from "@/components/recommended-products"
import MobileHeader from "@/components/mobile-header"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background pb-16">
      <MobileHeader title="焕遗 IP交易平台" showSearch={true} />

      <HomeBanner />

      <div className="p-4 space-y-6">
        <CategoryNav />

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">推荐IP</h2>
          <Link href="/category/all" className="text-sm text-muted-foreground flex items-center">
            查看更多 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <RecommendedProducts />
        </Suspense>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">热门IP</h2>
            <Link href="/category/popular" className="text-sm text-muted-foreground flex items-center">
              查看更多 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/images/bainiaochaofeng.jpg?height=200&width=600"
              alt="热门IP"
              width={600}
              height={200}
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-xl">苏州刺绣·百鸟朝凤</h3>
              <p className="text-white/80 text-sm">国家级非物质文化遗产</p>
              <Link href="/product/1">
                <Button className="mt-2 w-fit bg-red-600 hover:bg-red-700">立即查看</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[150px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}
