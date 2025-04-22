import Link from "next/link"
import { ChevronLeft, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MobileHeaderProps {
  title: string
  showBack?: boolean
  showSearch?: boolean
}

export default function MobileHeader({ title, showBack = false, showSearch = false }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b flex items-center justify-between h-14 px-4">
      <div className="flex items-center">
        {showBack && (
          <Link href="/" className="mr-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <h1 className="text-lg font-medium">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative w-40 md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索..." className="pl-8 h-9" />
          </div>
        )}
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </Button>
        </Link>
        <Link href="/user">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
