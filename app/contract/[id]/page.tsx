"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import MobileHeader from "@/components/mobile-header"
import SignatureCanvas from "@/components/signature-canvas"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ContractPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [hasSigned, setHasSigned] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSignatureComplete = (signed: boolean) => {
    setHasSigned(signed)
  }

  const handleSubmitContract = () => {
    if (!hasSigned) {
      alert("请先签署合同")
      return
    }

    if (!termsAccepted) {
      alert("请先同意合同条款")
      return
    }

    setShowConfirmDialog(true)
  }

  const handleConfirmAndProceed = () => {
    setShowConfirmDialog(false)
    // Navigate to payment page
    router.push("/order")
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-20">
      <MobileHeader title="焕遗 IP交易平台交易合同" showBack={true} />

      <div className="p-4 space-y-6">
        <div className="bg-red-50 p-4 rounded-lg space-y-2">
          <h2 className="font-bold text-center text-lg">焕遗 IP交易平台交易合同</h2>
          <div className="text-sm text-center text-muted-foreground">
            合同编号：HY-{params.id}-{new Date().getFullYear()}
            {String(new Date().getMonth() + 1).padStart(2, "0")}
            {String(new Date().getDate()).padStart(2, "0")}
          </div>
          <div className="text-sm text-center">
            签订日期：{new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div>甲方（授权方）：苏州刺绣研究所</div>
            <div>乙方（被授权方）：用户</div>
          </div>
        </div>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="terms">合同说明</TabsTrigger>
            <TabsTrigger value="product">产品描述</TabsTrigger>
            <TabsTrigger value="payment">价格支付</TabsTrigger>
            <TabsTrigger value="quality">产品质量</TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="space-y-4 mt-4">
            <div className="space-y-2 text-sm">
              <h3 className="font-medium">第一条 合同说明</h3>
              <p className="text-muted-foreground">
                1.1 甲方是"苏州刺绣·百鸟朝凤图案"的知识产权所有者，拥有完全的授权权利。
              </p>
              <p className="text-muted-foreground">1.2 乙方希望获得该IP的使用权，用于商业用途。</p>
              <p className="text-muted-foreground">1.3 本合同自双方签字之日起生效，有效期为一年。</p>
            </div>
          </TabsContent>

          <TabsContent value="product" className="space-y-4 mt-4">
            <div className="space-y-2 text-sm">
              <h3 className="font-medium">第二条 产品描述</h3>
              <p className="text-muted-foreground">2.1 产品名称：苏州刺绣·百鸟朝凤图案</p>
              <p className="text-muted-foreground">2.2 产品类型：非物质文化遗产IP</p>
              <p className="text-muted-foreground">2.3 产品内容：包含百鸟朝凤图案的完整设计图、色彩方案及应用指南。</p>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 mt-4">
            <div className="space-y-2 text-sm">
              <h3 className="font-medium">第三条 价格与支付方式</h3>
              <p className="text-muted-foreground">3.1 授权费用：人民币2000元/年</p>
              <p className="text-muted-foreground">3.2 支付方式：一次性支付</p>
              <p className="text-muted-foreground">3.3 支付时间：合同签订后7日内</p>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-4 mt-4">
            <div className="space-y-2 text-sm">
              <h3 className="font-medium">第四条 产品质量</h3>
              <p className="text-muted-foreground">4.1 甲方保证所提供的IP产品为原创作品，不侵犯任何第三方权益。</p>
              <p className="text-muted-foreground">4.2 甲方保证所提供的IP产品符合国家相关标准和规定。</p>
              <p className="text-muted-foreground">4.3 乙方应按照甲方提供的使用指南合理使用IP产品。</p>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="terms" className="text-sm font-normal">
                我已阅读并同意以上合同条款
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">签名确认</h3>
          <p className="text-sm text-muted-foreground">请在下方签署您的姓名，以确认合同</p>
          <SignatureCanvas onSignatureChange={handleSignatureComplete} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSubmitContract}>
          提交合同
        </Button>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认提交</DialogTitle>
            <DialogDescription>请确认您已完整阅读并理解合同内容。提交后将进入付款页面。</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setShowConfirmDialog(false)}>
              取消
            </Button>
            <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={handleConfirmAndProceed}>
              确认并继续
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
