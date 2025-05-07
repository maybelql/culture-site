'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { userApi } from '@/lib/api'
import { toast } from 'sonner'
import type { User, Order } from '@/lib/api'

/**
 * 用户中心页面组件
 * 提供用户信息展示和订单管理功能，包括：
 * 1. 用户基本信息展示
 * 2. 订单列表展示
 * 3. 订单状态筛选
 * 4. 退出登录功能
 */
export default function UserCenterPage() {
  const router = useRouter()
  // 用户信息状态
  const [user, setUser] = useState<User | null>(null)
  // 订单列表状态
  const [orders, setOrders] = useState<Order[]>([])
  // 加载状态
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查用户是否已登录
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    /**
     * 获取用户信息
     * 1. 调用用户信息 API
     * 2. 更新用户信息状态
     * 3. 处理错误情况
     */
    const fetchUserData = async () => {
      try {
        const response = await userApi.getUserInfo()
        setUser(response.data.data)
      } catch (error) {
        toast.error('获取用户信息失败')
        router.push('/login')
      }
    }

    /**
     * 获取用户订单列表
     * 1. 调用订单列表 API
     * 2. 更新订单列表状态
     * 3. 处理错误情况
     */
    const fetchOrders = async () => {
      try {
        const response = await userApi.getUserOrders()
        setOrders(response.data.data)
      } catch (error) {
        toast.error('获取订单信息失败')
      } finally {
        setLoading(false)
      }
    }

    // 并行获取用户信息和订单列表
    fetchUserData()
    fetchOrders()
  }, [router])

  /**
   * 处理退出登录
   * 1. 清除本地存储的 token
   * 2. 跳转到登录页面
   */
  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  // 显示加载状态
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6">
        {/* 用户信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
            <CardDescription>查看和管理您的个人信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 用户名信息 */}
              <div>
                <h3 className="font-medium">用户名</h3>
                <p className="text-gray-500">{user?.username}</p>
              </div>
              {/* 邮箱信息 */}
              <div>
                <h3 className="font-medium">邮箱</h3>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              {/* 退出登录按钮 */}
              <Button variant="outline" onClick={handleLogout}>
                退出登录
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 订单列表卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>我的订单</CardTitle>
            <CardDescription>查看您的订单历史</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 订单状态标签页 */}
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="pending">待付款</TabsTrigger>
                <TabsTrigger value="paid">已付款</TabsTrigger>
                <TabsTrigger value="completed">已完成</TabsTrigger>
              </TabsList>
              {/* 订单列表内容 */}
              <TabsContent value="all" className="space-y-4">
                {orders.map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        {/* 订单基本信息 */}
                        <div>
                          <h3 className="font-medium">订单号：{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            下单时间：{new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {/* 订单金额和状态 */}
                        <div className="text-right">
                          <p className="font-medium">￥{order.totalAmount}</p>
                          <p className="text-sm text-gray-500">{order.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {/* 无订单提示 */}
                {orders.length === 0 && (
                  <p className="text-center text-gray-500">暂无订单</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 