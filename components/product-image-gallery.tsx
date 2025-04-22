"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ProductImageGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const images = [
    "/images/bainiaochaofeng.jpg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt="Product image"
          fill
          className="object-cover"
          onClick={() => setShowFullscreen(true)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 rounded-full"
          onClick={() => setShowFullscreen(true)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="w-full py-2 border-b">
        <div className="flex gap-2 px-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-16 h-16 flex-shrink-0 cursor-pointer border-2 rounded ${
                index === currentImage ? "border-red-600" : "border-transparent"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-screen-lg w-full p-0 h-[80vh]">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt="Product image fullscreen"
              fill
              className="object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
