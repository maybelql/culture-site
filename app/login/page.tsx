'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { userApi } from '@/lib/api'
import { toast } from 'sonner'

/**
 * 登录页面组件
 * 提供用户登录功能，包括：
 * 1. 用户名和密码输入
 * 2. 表单验证
 * 3. 登录状态管理
 * 4. 登录成功后跳转
 */
export default function LoginPage() {
  const router = useRouter()
  // 加载状态，用于控制按钮的禁用状态和显示加载提示
  const [loading, setLoading] = useState(false)
  // 表单数据状态
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  /**
   * 处理表单提交
   * 1. 阻止默认表单提交行为
   * 2. 设置加载状态
   * 3. 调用登录 API
   * 4. 保存 token 到本地存储
   * 5. 显示成功提示并跳转到首页
   * 6. 处理错误情况
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await userApi.login(formData)
      localStorage.setItem('token', response.data.data.token)
      toast.success('登录成功')
      router.push('/')
    } catch (error) {
      toast.error('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理输入框值变化
   * 更新表单数据状态
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">登录</CardTitle>
          <CardDescription className="text-center">
            欢迎回来，请登录您的账号
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* 用户名输入框 */}
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="请输入用户名"
              />
            </div>
            {/* 密码输入框 */}
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="请输入密码"
              />
            </div>
          </CardContent>
          {/* 登录按钮 */}
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 