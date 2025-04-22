import Image from "next/image"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import MobileHeader from "@/components/mobile-header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function OrderPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <MobileHeader title="生成订单" showBack={true} />

      <div className="p-4 space-y-4">
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">收货地址</h3>
            <Button variant="ghost" size="sm" className="text-red-600">
              添加新地址
            </Button>
          </div>

          <RadioGroup defaultValue="address1">
            <div className="flex items-start space-x-2 border p-3 rounded-lg mb-2">
              <RadioGroupItem value="address1" id="address1" />
              <Label htmlFor="address1" className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">张三</span>
                  <span>13800138000</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-start mt-1">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                  <span>北京市朝阳区建国路88号SOHO现代城100号楼2单元303室</span>
                </div>
              </Label>
            </div>

            <div className="flex items-start space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="address2" id="address2" />
              <Label htmlFor="address2" className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">李四</span>
                  <span>13900139000</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-start mt-1">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                  <span>上海市浦东新区陆家嘴环路1000号金融中心25楼</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-medium">订单商品</h3>

          <div className="flex gap-3">
            <Image
              src="/images/bainiaochaofeng.jpg?height=80&width=80"
              alt="苏州刺绣·百鸟朝凤图案"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">苏州刺绣·百鸟朝凤图案</h4>
              <div className="flex items-center text-xs mt-1">
                <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full">刺绣</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-red-600">¥2000.00</p>
                <span className="text-sm text-muted-foreground">x1</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Image
              src="/images/qinghuashanshui.jpg?height=80&width=80"
              alt="景德镇青花瓷·山水纹"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">景德镇青花瓷·山水纹</h4>
              <div className="flex items-center text-xs mt-1">
                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full">陶瓷</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-red-600">¥1500.00</p>
                <span className="text-sm text-muted-foreground">x1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span>商品金额</span>
            <span>¥3500.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>运费</span>
            <span>¥0.00</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span>实付金额</span>
            <span className="text-xl font-bold text-red-600">¥3500.00</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button className="w-full bg-red-600 hover:bg-red-700">生成订单</Button>
      </div>
    </main>
  )
}
