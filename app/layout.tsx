import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"

/**
 * 使用 Inter 字体
 * 从 Google Fonts 加载 Inter 字体，并设置 Latin 子集
 */
const inter = Inter({ subsets: ["latin"] })

/**
 * 网站元数据配置
 * 设置网站标题、描述等信息
 */
export const metadata: Metadata = {
  title: "焕遗 IP交易平台",
  description: "中国非物质文化遗产IP授权交易平台",
  generator: 'v0.dev'
}

/**
 * 根布局组件
 * 提供全局布局结构，包括：
 * 1. 导航栏
 * 2. 主题配置
 * 3. 全局通知
 * 4. 页脚
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            {/* 导航栏 */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                {/* 网站标题和主导航 */}
                <div className="mr-4 flex">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold">焕遗 IP交易平台</span>
                  </Link>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/products" className="transition-colors hover:text-foreground/80">
                      商品
                    </Link>
                    <Link href="/categories" className="transition-colors hover:text-foreground/80">
                      分类
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-foreground/80">
                      关于我们
                    </Link>
                  </nav>
                </div>
                {/* 用户导航 */}
                <div className="flex flex-1 items-center justify-end space-x-4">
                  <UserNav />
                </div>
              </div>
            </header>

            {/* 主要内容区域 */}
            <main className="flex-1">
              {children}
            </main>

            {/* 页脚 */}
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2024 焕遗 IP交易平台. All rights reserved.
                </p>
              </div>
            </footer>
          </div>

          {/* 全局通知组件 */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'