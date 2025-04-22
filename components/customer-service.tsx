"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MessageCircle, Paperclip, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function CustomerService() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "您好，有什么可以帮助您的吗？",
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const sendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "感谢您的咨询。我们的客服人员将尽快回复您的问题。关于非遗IP授权的问题，您可以查看我们的常见问题解答或者继续与我们交流。",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg bg-white z-10"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>在线客服</SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[80%] ${msg.isUser ? "flex-row-reverse" : "flex-row"}`}>
                    {!msg.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="客服" />
                        <AvatarFallback>客服</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 ${msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t mt-auto">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="请输入您的问题..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button className="rounded-full flex-shrink-0" size="icon" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
