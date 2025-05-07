'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { userApi } from '@/lib/api'
import type { User } from '@/lib/api'

/**
 * 用户导航组件
 * 提供用户登录状态显示和导航功能，包括：
 * 1. 未登录状态显示登录/注册按钮
 * 2. 已登录状态显示用户头像和下拉菜单
 * 3. 用户信息展示
 * 4. 快速导航链接
 * 5. 退出登录功能
 */
export function UserNav() {
  const router = useRouter()
  // 用户信息状态
  const [user, setUser] = useState<User | null>(null)
  // 加载状态
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查用户是否已登录
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    /**
     * 获取用户信息
     * 1. 调用用户信息 API
     * 2. 更新用户信息状态
     * 3. 处理错误情况
     */
    const fetchUserInfo = async () => {
      try {
        const response = await userApi.getUserInfo()
        setUser(response.data.data)
      } catch (error) {
        console.error('获取用户信息失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

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
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
  }

  // 未登录状态显示登录/注册按钮
  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/login">登录</Link>
        </Button>
        <Button asChild>
          <Link href="/register">注册</Link>
        </Button>
      </div>
    )
  }

  // 已登录状态显示用户头像和下拉菜单
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <span className="sr-only">打开用户菜单</span>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {user.username[0].toUpperCase()}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* 用户信息显示 */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* 导航链接 */}
        <DropdownMenuItem asChild>
          <Link href="/user">个人中心</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/orders">我的订单</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* 退出登录按钮 */}
        <DropdownMenuItem onClick={handleLogout}>
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 