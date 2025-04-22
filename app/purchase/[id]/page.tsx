import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import MobileHeader from "@/components/mobile-header"
import SignatureCanvas from "@/components/signature-canvas"

export default function PurchasePage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col bg-background pb-20">
      <MobileHeader title="购买授权" showBack={true} />

      <div className="p-4 space-y-6">
        <div className="bg-red-50 p-4 rounded-lg space-y-2">
          <h2 className="font-bold">苏州刺绣·百鸟朝凤图案</h2>
          <div className="flex items-center text-sm">
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs mr-2">刺绣</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">国家级非遗</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">选择授权类型</h3>
          <RadioGroup defaultValue="commercial">
            <div className="flex items-center space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="commercial" id="commercial" />
              <Label htmlFor="commercial" className="flex-1">
                <div className="font-medium">商业授权</div>
                <div className="text-sm text-muted-foreground">可用于商业产品设计与销售</div>
              </Label>
              <div className="text-red-600 font-medium">¥500/年起</div>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="personal" id="personal" />
              <Label htmlFor="personal" className="flex-1">
                <div className="font-medium">个人使用</div>
                <div className="text-sm text-muted-foreground">可用于个人创作与非商业用途</div>
              </Label>
              <div className="text-red-600 font-medium">¥200/年起</div>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="education" id="education" />
              <Label htmlFor="education" className="flex-1">
                <div className="font-medium">教育用途</div>
                <div className="text-sm text-muted-foreground">可用于教育机构的教学与研究</div>
              </Label>
              <div className="text-red-600 font-medium">¥300/年起</div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">选择许可年限</h3>
          <RadioGroup defaultValue="1year">
            <div className="flex items-center space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="1year" id="1year" />
              <Label htmlFor="1year" className="flex-1">
                <div className="font-medium">1年期</div>
              </Label>
              <div className="text-red-600 font-medium">¥500</div>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="3years" id="3years" />
              <Label htmlFor="3years" className="flex-1">
                <div className="font-medium">3年期</div>
                <div className="text-xs text-green-600">优惠20%</div>
              </Label>
              <div className="text-red-600 font-medium">¥1200</div>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-lg">
              <RadioGroupItem value="permanent" id="permanent" />
              <Label htmlFor="permanent" className="flex-1">
                <div className="font-medium">永久授权</div>
                <div className="text-xs text-green-600">一次付费，终身使用</div>
              </Label>
              <div className="text-red-600 font-medium">¥3000</div>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="text-sm">总计金额</div>
          <div className="text-xl font-bold text-red-600">¥500.00</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="terms" className="text-sm font-normal">
                我已阅读并同意<span className="text-blue-600">《版权授权许可合同》</span>
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">签名确认</h3>
          <p className="text-sm text-muted-foreground">请在下方签署您的姓名，以确认授权协议</p>
          <SignatureCanvas />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button className="w-full bg-red-600 hover:bg-red-700">确认购买</Button>
      </div>
    </main>
  )
}
