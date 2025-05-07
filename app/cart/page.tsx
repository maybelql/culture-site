"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileHeader from "@/components/mobile-header"
import { Checkbox } from "@/components/ui/checkbox"
import { cartApi } from "@/lib/api"
import { toast } from "sonner"

interface CartItem {
  id: string;
  productId: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selected: boolean;
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await cartApi.getCart()
      const items = response.data.map((item: any) => ({
        ...item,
        selected: false
      }))
      setCartItems(items)
    } catch (error) {
      console.error('获取购物车失败:', error)
      toast.error('获取购物车失败')
    } finally {
      setLoading(false)
    }
  }

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

  const handleIncrease = async (id: string) => {
    try {
      const item = cartItems.find(item => item.id === id)
      if (!item) return

      const newQuantity = item.quantity + 1
      await cartApi.updateCartItem(id, newQuantity)
      
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
      )
    } catch (error) {
      console.error('更新购物车失败:', error)
      toast.error('更新购物车失败')
    }
  }

  const handleDecrease = async (id: string) => {
    try {
      const item = cartItems.find(item => item.id === id)
      if (!item) return

      const newQuantity = Math.max(1, item.quantity - 1)
      await cartApi.updateCartItem(id, newQuantity)
      
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
      )
    } catch (error) {
      console.error('更新购物车失败:', error)
      toast.error('更新购物车失败')
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      await cartApi.removeFromCart(id)
      setCartItems(cartItems.filter(item => item.id !== id))
      toast.success('商品已从购物车移除')
    } catch (error) {
      console.error('移除商品失败:', error)
      toast.error('移除商品失败')
    }
  }

  const handleClearCart = async () => {
    try {
      const selectedItems = cartItems.filter(item => item.selected)
      await Promise.all(selectedItems.map(item => cartApi.removeFromCart(item.id)))
      setCartItems(cartItems.filter(item => !item.selected))
      toast.success('已清空选中商品')
    } catch (error) {
      console.error('清空购物车失败:', error)
      toast.error('清空购物车失败')
    }
  }

  const handleNavigateToDetail = (id: string) => {
    router.push(`/product/${id}`)
  }

  const handleSubmitOrder = () => {
    const selectedItems = cartItems.filter((item) => item.selected)
    if (selectedItems.length === 0) {
      toast.error("请至少选择一个商品")
      return
    }

    router.push(`/contract/${selectedItems[0].productId}`)
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-24">
        <MobileHeader title="购物车" showBack={true} />
        <div className="p-4 space-y-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="flex gap-3 border rounded-lg p-3">
              <div className="h-20 w-20 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-24">
      <MobileHeader title="购物车" showBack={true} />

      <div className="p-4 space-y-4">
        {cartItems.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Checkbox id="select-all" checked={isAllSelected} onCheckedChange={handleSelectAll} />
                <label htmlFor="select-all" className="text-sm font-medium">
                  全选
                </label>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground flex items-center gap-1"
                onClick={handleClearCart}
              >
                <Trash2 className="h-4 w-4" />
                <span>清空</span>
              </Button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onSelectChange={(checked) => handleSelectItem(item.id, checked)}
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
                  onNavigateToDetail={() => handleNavigateToDetail(item.productId)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            购物车是空的
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm">总计金额</div>
            <div className="text-xl font-bold text-red-600">¥{totalPrice.toFixed(2)}</div>
          </div>
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSubmitOrder}>
            提交订单
          </Button>
        </div>
      )}
    </main>
  )
}

interface CartItemProps extends CartItem {
  onSelectChange: (checked: boolean) => void
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
  onNavigateToDetail: () => void
}

function CartItem({ 
  id, 
  name, 
  type, 
  price, 
  quantity, 
  imageUrl, 
  selected, 
  onSelectChange, 
  onIncrease, 
  onDecrease,
  onRemove,
  onNavigateToDetail 
}: CartItemProps) {
  return (
    <div className="flex gap-3 border rounded-lg p-3">
      <div className="flex items-start gap-2">
        <Checkbox id={`item-${id}`} checked={selected} onCheckedChange={onSelectChange} />
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={80}
          height={80}
          className="rounded-lg object-cover"
          onClick={onNavigateToDetail}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium" onClick={onNavigateToDetail}>{name}</h3>
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
