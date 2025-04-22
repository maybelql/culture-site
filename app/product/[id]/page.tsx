import Image from "next/image"
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductImageGallery from "@/components/product-image-gallery"
import MobileHeader from "@/components/mobile-header"
import { Separator } from "@/components/ui/separator"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col bg-background pb-20">
      <MobileHeader title="产品详情" showBack={true} />

      <ProductImageGallery />

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">苏州刺绣·百鸟朝凤图案</h1>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs mr-2">刺绣</span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs">国家级非遗</span>
          </div>
          <p className="text-2xl font-bold text-red-600">¥2000/年</p>
          <p className="text-sm text-muted-foreground">自签合同日起，一年后授权到期</p>
        </div>

        <Tabs defaultValue="detail" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detail">详情介绍</TabsTrigger>
            <TabsTrigger value="license">授权范围</TabsTrigger>
            <TabsTrigger value="usage">使用限制</TabsTrigger>
          </TabsList>
          <TabsContent value="detail" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              苏州刺绣是中国传统刺绣品种中最具代表性的一种，历史悠久，技艺精湛。"百鸟朝凤"图案是其经典代表作，展现了栩栩如生的百鸟与凤凰，象征着祥和与繁荣。
            </p>
            <Image
              src="/images/bainiaochaofeng.jpg?height=300&width=600"
              alt="刺绣细节"
              width={600}
              height={300}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-muted-foreground">
              该IP作品由苏州刺绣研究所授权，可用于产品设计、包装印刷、数字媒体等多种商业用途。
            </p>
          </TabsContent>
          <TabsContent value="license" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">授权类型</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>商业授权 - 可用于商业产品设计与销售</li>
                <li>个人使用 - 可用于个人创作与非商业用途</li>
                <li>教育用途 - 可用于教育机构的教学与研究</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">许可年限</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>1年期 - ¥2000/年</li>
                <li>3年期 - ¥5000/3年</li>
                <li>永久授权 - ¥15000/永久</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="usage" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">使用限制</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>不得用于违反中国法律法规的产品或服务</li>
                <li>不得篡改IP作品的基本元素与风格</li>
                <li>不得转授权给第三方使用</li>
                <li>使用时需注明"苏州刺绣·百鸟朝凤"原创IP</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="text-sm">数量</div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-lg font-medium">1</span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <div className="text-sm">
            <div>购物车</div>
            <div className="text-red-600">2件</div>
          </div>
        </div>
        <Button className="flex-1 ml-4 bg-red-600 hover:bg-red-700">加入购物车</Button>
      </div>
    </main>
  )
}
