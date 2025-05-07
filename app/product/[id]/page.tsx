"use client"

import Image from "next/image"
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductImageGallery from "@/components/product-image-gallery"
import MobileHeader from "@/components/mobile-header"
import { Separator } from "@/components/ui/separator"
import { productApi, cartApi } from "@/lib/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Product {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  detail: string;
  license: {
    types: string[];
    terms: {
      duration: string;
      price: number;
    }[];
  };
  restrictions: string[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductById(params.id);
        setProduct(response.data);
      } catch (error) {
        console.error('获取商品详情失败:', error);
        toast.error('获取商品详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await cartApi.addToCart({
        productId: product.id,
        quantity
      });
      toast.success('已添加到购物车');
    } catch (error) {
      console.error('添加到购物车失败:', error);
      toast.error('添加到购物车失败');
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-20">
        <MobileHeader title="产品详情" showBack={true} />
        <div className="p-4 space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col bg-background pb-20">
        <MobileHeader title="产品详情" showBack={true} />
        <div className="p-4">
          <p className="text-center text-muted-foreground">商品不存在或已下架</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background pb-20">
      <MobileHeader title="产品详情" showBack={true} />

      <ProductImageGallery images={[product.imageUrl]} />

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs mr-2">{product.type}</span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs">{product.category}</span>
          </div>
          <p className="text-2xl font-bold text-red-600">¥{product.price}/年</p>
          <p className="text-sm text-muted-foreground">自签合同日起，一年后授权到期</p>
        </div>

        <Tabs defaultValue="detail" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detail">详情介绍</TabsTrigger>
            <TabsTrigger value="license">授权范围</TabsTrigger>
            <TabsTrigger value="usage">使用限制</TabsTrigger>
          </TabsList>
          <TabsContent value="detail" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={300}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm text-muted-foreground">
              {product.detail}
            </p>
          </TabsContent>
          <TabsContent value="license" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">授权类型</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {product.license.types.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">许可年限</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {product.license.terms.map((term, index) => (
                  <li key={index}>{term.duration} - ¥{term.price}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="usage" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">使用限制</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {product.restrictions.map((restriction, index) => (
                  <li key={index}>{restriction}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="text-sm">数量</div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-lg font-medium">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <div className="text-sm">
            <div>购物车</div>
            <div className="text-red-600">2件</div>
          </div>
        </div>
        <Button 
          className="flex-1 ml-4 bg-red-600 hover:bg-red-700"
          onClick={handleAddToCart}
        >
          加入购物车
        </Button>
      </div>
    </main>
  )
}
