"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileHeader from "@/components/mobile-header"
import { Checkbox } from "@/components/ui/checkbox"

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "苏州刺绣·百鸟朝凤图案",
      type: "刺绣",
      price: 2000,
      quantity: 1,
      image: "/images/bainiaochaofeng.jpg?height=80&width=80",
      selected: false,
    },
    {
      id: "2",
      name: "景德镇青花瓷·山水纹",
      type: "陶瓷",
      price: 1500,
      quantity: 1,
      image: "/images/qinghuashanshui.jpg?height=80&width=80",
      selected: false,
    },
  ])

  const handleSelectAll = (checked: boolean) => {
    setCartItems(
      cartItems.map((item) => ({
        ...item,
        selected: checked,
      })),
    )
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, selected: checked } : item)))
  }

  const isAllSelected = cartItems.length > 0 && cartItems.every((item) => item.selected)

  const totalPrice = cartItems
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleIncrease = (id: string) => {
    setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  const handleDecrease = (id: string) => {
    setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)),
    )
  }

  const handleNavigateToDetail = (id: string) => {
    router.push(`/product/${id}`)
  }

  const handleSubmitOrder = () => {
    // Check if any items are selected
    const selectedItems = cartItems.filter((item) => item.selected)
    if (selectedItems.length === 0) {
      alert("请至少选择一个商品")
      return
    }

    // Navigate to the contract page
    // We'll use the first selected item's ID for simplicity
    router.push(`/contract/${selectedItems[0].id}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <MobileHeader title="购物车" showBack={true} />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={handleSelectAll} />
            <label htmlFor="select-all" className="text-sm font-medium">
              全选
            </label>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground flex items-center gap-1">
            <Trash2 className="h-4 w-4" />
            <span>清空</span>
          </Button>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              selected={item.selected}
              onSelectChange={(checked) => handleSelectItem(item.id, checked)}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onNavigateToDetail={() => handleNavigateToDetail(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">总计金额</div>
          <div className="text-xl font-bold text-red-600">¥{totalPrice.toFixed(2)}</div>
        </div>
        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSubmitOrder}>
          提交订单
        </Button>
      </div>
    </main>
  )
}

interface CartItemProps {
  id: string
  name: string
  type: string
  price: number
  quantity: number
  image: string
  selected: boolean
  onSelectChange: (checked: boolean) => void
  onIncrease: () => void
  onDecrease: () => void
  onNavigateToDetail: () => void
}

function CartItem({ id, name, type, price, quantity, image, selected, onSelectChange, onIncrease, onDecrease,onNavigateToDetail }: CartItemProps) {
  return (
      <div className="flex gap-3 border rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Checkbox id={`item-${id}`} checked={selected} onCheckedChange={onSelectChange} />
          <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center text-xs mt-1">
            <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full">{type}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-red-600">¥{price.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onDecrease}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-5 text-center">{quantity}</span>
              <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onIncrease}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}
