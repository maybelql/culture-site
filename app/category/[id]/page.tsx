import { Suspense } from "react"
import MobileHeader from "@/components/mobile-header"
import CategorySidebar from "@/components/category-sidebar"
import ProductGrid from "@/components/product-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id
  const categoryName = getCategoryName(categoryId)

  return (
    <main className="flex min-h-screen flex-col bg-background pb-16">
      <MobileHeader title={categoryName} showBack={true} />

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索IP产品..." className="pl-9" />
        </div>
      </div>

      <div className="flex flex-1">
        <CategorySidebar activeCategory={categoryId} />

        <div className="flex-1 p-4">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid categoryId={categoryId} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[120px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}

function getCategoryName(id: string): string {
  const categories: Record<string, string> = {
    all: "全部分类",
    craft: "传统技艺",
    literature: "传统文学",
    music: "音乐曲艺",
    drama: "传统戏剧",
    art: "传统美术",
    popular: "热门IP",
  }

  return categories[id] || "分类浏览"
}
