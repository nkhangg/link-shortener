"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Link, Scissors, Check, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShortenedUrl {
  id: string
  originalUrl: string
  shortUrl: string
  createdAt: Date
  clicks: number
}

export default function URLShortener() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([
    {
      id: "1",
      originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO",
      shortUrl: "short.ly/yt4k2x",
      createdAt: new Date("2024-01-15"),
      clicks: 1247,
    },
    {
      id: "2",
      originalUrl: "https://github.com/vercel/next.js/blob/canary/packages/next/src/server/app-render/app-render.tsx",
      shortUrl: "short.ly/gh8m9n",
      createdAt: new Date("2024-01-14"),
      clicks: 89,
    },
    {
      id: "3",
      originalUrl: "https://tailwindcss.com/docs/installation/framework-guides#next-js",
      shortUrl: "short.ly/tw5p7q",
      createdAt: new Date("2024-01-13"),
      clicks: 456,
    },
    {
      id: "4",
      originalUrl: "https://www.figma.com/design/abc123def456/My-Awesome-Design-Project-2024",
      shortUrl: "short.ly/fg3r8s",
      createdAt: new Date("2024-01-12"),
      clicks: 23,
    },
    {
      id: "5",
      originalUrl: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit",
      shortUrl: "short.ly/gd7k4m",
      createdAt: new Date("2024-01-11"),
      clicks: 678,
    },
    {
      id: "6",
      originalUrl: "https://stackoverflow.com/questions/12345678/how-to-implement-url-shortener-in-nextjs",
      shortUrl: "short.ly/so9x2v",
      createdAt: new Date("2024-01-10"),
      clicks: 234,
    },
    {
      id: "7",
      originalUrl: "https://www.linkedin.com/in/john-doe-software-engineer-react-nextjs-typescript",
      shortUrl: "short.ly/li6b8n",
      createdAt: new Date("2024-01-09"),
      clicks: 156,
    },
    {
      id: "8",
      originalUrl:
        "https://medium.com/@author/building-scalable-web-applications-with-nextjs-and-typescript-2024-guide",
      shortUrl: "short.ly/md4c9p",
      createdAt: new Date("2024-01-08"),
      clicks: 892,
    },
    {
      id: "9",
      originalUrl: "https://www.npmjs.com/package/react-router-dom",
      shortUrl: "short.ly/npm5x7",
      createdAt: new Date("2024-01-07"),
      clicks: 345,
    },
    {
      id: "10",
      originalUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      shortUrl: "short.ly/mdn8k2",
      createdAt: new Date("2024-01-06"),
      clicks: 567,
    },
    {
      id: "11",
      originalUrl: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
      shortUrl: "short.ly/ts9m4n",
      createdAt: new Date("2024-01-05"),
      clicks: 123,
    },
    {
      id: "12",
      originalUrl: "https://react.dev/learn/thinking-in-react",
      shortUrl: "short.ly/react7p",
      createdAt: new Date("2024-01-04"),
      clicks: 789,
    },
    {
      id: "13",
      originalUrl: "https://www.amazon.com/dp/B08N5WRWNW/ref=sr_1_1?keywords=programming+books",
      shortUrl: "short.ly/amz3k8",
      createdAt: new Date("2024-01-03"),
      clicks: 445,
    },
    {
      id: "14",
      originalUrl: "https://www.netflix.com/browse/genre/81466194",
      shortUrl: "short.ly/nf7x2m",
      createdAt: new Date("2024-01-02"),
      clicks: 1156,
    },
    {
      id: "15",
      originalUrl: "https://www.spotify.com/us/premium/?utm_source=us-en_brand_contextual_text&utm_medium=paidsearch",
      shortUrl: "short.ly/sp9k4n",
      createdAt: new Date("2024-01-01"),
      clicks: 678,
    },
    {
      id: "16",
      originalUrl: "https://www.udemy.com/course/the-complete-javascript-course/",
      shortUrl: "short.ly/ud5m7p",
      createdAt: new Date("2023-12-31"),
      clicks: 234,
    },
    {
      id: "17",
      originalUrl: "https://www.coursera.org/specializations/full-stack-react",
      shortUrl: "short.ly/cs8n2q",
      createdAt: new Date("2023-12-30"),
      clicks: 567,
    },
    {
      id: "18",
      originalUrl: "https://www.freecodecamp.org/learn/responsive-web-design/",
      shortUrl: "short.ly/fcc4r9",
      createdAt: new Date("2023-12-29"),
      clicks: 890,
    },
    {
      id: "19",
      originalUrl: "https://www.codecademy.com/learn/introduction-to-javascript",
      shortUrl: "short.ly/cc7s3t",
      createdAt: new Date("2023-12-28"),
      clicks: 345,
    },
    {
      id: "20",
      originalUrl: "https://www.khanacademy.org/computing/computer-programming",
      shortUrl: "short.ly/ka2u6v",
      createdAt: new Date("2023-12-27"),
      clicks: 123,
    },
    {
      id: "21",
      originalUrl: "https://www.w3schools.com/html/html_intro.asp",
      shortUrl: "short.ly/w3s5w8",
      createdAt: new Date("2023-12-26"),
      clicks: 456,
    },
    {
      id: "22",
      originalUrl: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      shortUrl: "short.ly/ct9x1y",
      createdAt: new Date("2023-12-25"),
      clicks: 789,
    },
    {
      id: "23",
      originalUrl: "https://www.smashingmagazine.com/2021/02/things-you-can-do-with-css-today/",
      shortUrl: "short.ly/sm3z4a",
      createdAt: new Date("2023-12-24"),
      clicks: 234,
    },
    {
      id: "24",
      originalUrl: "https://www.designsystems.com/open-design-systems/",
      shortUrl: "short.ly/ds7b5c",
      createdAt: new Date("2023-12-23"),
      clicks: 567,
    },
    {
      id: "25",
      originalUrl: "https://www.dribbble.com/shots/popular/web-design",
      shortUrl: "short.ly/dr1d8e",
      createdAt: new Date("2023-12-22"),
      clicks: 890,
    },
    {
      id: "26",
      originalUrl: "https://www.behance.net/galleries/ui-ux",
      shortUrl: "short.ly/be4f2g",
      createdAt: new Date("2023-12-21"),
      clicks: 345,
    },
    {
      id: "27",
      originalUrl: "https://www.awwwards.com/websites/single-page/",
      shortUrl: "short.ly/aw8h6i",
      createdAt: new Date("2023-12-20"),
      clicks: 123,
    },
    {
      id: "28",
      originalUrl: "https://www.pinterest.com/search/pins/?q=web%20design%20inspiration",
      shortUrl: "short.ly/pt2j9k",
      createdAt: new Date("2023-12-19"),
      clicks: 456,
    },
    {
      id: "29",
      originalUrl: "https://www.unsplash.com/s/photos/technology",
      shortUrl: "short.ly/un6l3m",
      createdAt: new Date("2023-12-18"),
      clicks: 789,
    },
    {
      id: "30",
      originalUrl: "https://www.pexels.com/search/programming/",
      shortUrl: "short.ly/px9n7o",
      createdAt: new Date("2023-12-17"),
      clicks: 234,
    },
    {
      id: "31",
      originalUrl: "https://fonts.google.com/specimen/Inter",
      shortUrl: "short.ly/gf3p1q",
      createdAt: new Date("2023-12-16"),
      clicks: 567,
    },
    {
      id: "32",
      originalUrl: "https://www.adobe.com/products/photoshop.html",
      shortUrl: "short.ly/ad7r5s",
      createdAt: new Date("2023-12-15"),
      clicks: 890,
    },
    {
      id: "33",
      originalUrl: "https://www.canva.com/design/DAFxyz123/edit",
      shortUrl: "short.ly/cv1t9u",
      createdAt: new Date("2023-12-14"),
      clicks: 345,
    },
    {
      id: "34",
      originalUrl: "https://www.sketch.com/apps/",
      shortUrl: "short.ly/sk5v3w",
      createdAt: new Date("2023-12-13"),
      clicks: 123,
    },
    {
      id: "35",
      originalUrl: "https://www.invisionapp.com/studio",
      shortUrl: "short.ly/iv9x7y",
      createdAt: new Date("2023-12-12"),
      clicks: 456,
    },
    {
      id: "36",
      originalUrl: "https://www.framer.com/motion/",
      shortUrl: "short.ly/fr3z1a",
      createdAt: new Date("2023-12-11"),
      clicks: 789,
    },
    {
      id: "37",
      originalUrl: "https://www.notion.so/templates/category/design",
      shortUrl: "short.ly/nt7b5c",
      createdAt: new Date("2023-12-10"),
      clicks: 234,
    },
    {
      id: "38",
      originalUrl: "https://www.slack.com/intl/en-in/features",
      shortUrl: "short.ly/sl1d9e",
      createdAt: new Date("2023-12-09"),
      clicks: 567,
    },
    {
      id: "39",
      originalUrl: "https://www.discord.com/download",
      shortUrl: "short.ly/dc5f3g",
      createdAt: new Date("2023-12-08"),
      clicks: 890,
    },
    {
      id: "40",
      originalUrl: "https://www.zoom.us/download",
      shortUrl: "short.ly/zm9h7i",
      createdAt: new Date("2023-12-07"),
      clicks: 345,
    },
    {
      id: "41",
      originalUrl: "https://www.microsoft.com/en-us/microsoft-teams/download-app",
      shortUrl: "short.ly/ms3j1k",
      createdAt: new Date("2023-12-06"),
      clicks: 123,
    },
    {
      id: "42",
      originalUrl: "https://www.google.com/drive/",
      shortUrl: "short.ly/gd7l5m",
      createdAt: new Date("2023-12-05"),
      clicks: 456,
    },
    {
      id: "43",
      originalUrl: "https://www.dropbox.com/plans",
      shortUrl: "short.ly/db1n9o",
      createdAt: new Date("2023-12-04"),
      clicks: 789,
    },
    {
      id: "44",
      originalUrl: "https://www.onedrive.live.com/about/en-us/signin/",
      shortUrl: "short.ly/od5p3q",
      createdAt: new Date("2023-12-03"),
      clicks: 234,
    },
    {
      id: "45",
      originalUrl: "https://www.icloud.com/",
      shortUrl: "short.ly/ic9r7s",
      createdAt: new Date("2023-12-02"),
      clicks: 567,
    },
    {
      id: "46",
      originalUrl: "https://www.apple.com/iphone/",
      shortUrl: "short.ly/ap3t1u",
      createdAt: new Date("2023-12-01"),
      clicks: 890,
    },
    {
      id: "47",
      originalUrl: "https://www.samsung.com/us/smartphones/galaxy-s24/",
      shortUrl: "short.ly/sg7v5w",
      createdAt: new Date("2023-11-30"),
      clicks: 345,
    },
    {
      id: "48",
      originalUrl: "https://www.tesla.com/model3",
      shortUrl: "short.ly/ts1x9y",
      createdAt: new Date("2023-11-29"),
      clicks: 123,
    },
    {
      id: "49",
      originalUrl: "https://www.spacex.com/vehicles/falcon-9/",
      shortUrl: "short.ly/sx5z3a",
      createdAt: new Date("2023-11-28"),
      clicks: 456,
    },
    {
      id: "50",
      originalUrl: "https://www.nasa.gov/missions/",
      shortUrl: "short.ly/ns9b7c",
      createdAt: new Date("2023-11-27"),
      clicks: 789,
    },
    {
      id: "51",
      originalUrl: "https://www.reddit.com/r/programming/",
      shortUrl: "short.ly/rd3d1e",
      createdAt: new Date("2023-11-26"),
      clicks: 234,
    },
    {
      id: "52",
      originalUrl: "https://news.ycombinator.com/",
      shortUrl: "short.ly/hn7f5g",
      createdAt: new Date("2023-11-25"),
      clicks: 567,
    },
    {
      id: "53",
      originalUrl: "https://www.producthunt.com/",
      shortUrl: "short.ly/ph1h9i",
      createdAt: new Date("2023-11-24"),
      clicks: 890,
    },
    {
      id: "54",
      originalUrl: "https://www.indiehackers.com/",
      shortUrl: "short.ly/ih5j3k",
      createdAt: new Date("2023-11-23"),
      clicks: 345,
    },
    {
      id: "55",
      originalUrl: "https://www.techcrunch.com/",
      shortUrl: "short.ly/tc9l7m",
      createdAt: new Date("2023-11-22"),
      clicks: 123,
    },
  ])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const { toast } = useToast()

  const totalPages = Math.ceil(shortenedUrls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUrls = shortenedUrls.slice(startIndex, endIndex)

  const generateShortUrl = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `short.ly/${result}`
  }

  const handleShorten = async () => {
    if (!url.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập URL cần rút gọn",
        variant: "destructive",
      })
      return
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      toast({
        title: "Lỗi",
        description: "URL phải bắt đầu bằng http:// hoặc https://",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newShortenedUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl: url,
      shortUrl: generateShortUrl(),
      createdAt: new Date(),
      clicks: 0,
    }

    setShortenedUrls((prev) => [newShortenedUrl, ...prev])
    setUrl("")
    setIsLoading(false)
    setCurrentPage(1)

    toast({
      title: "Thành công!",
      description: "URL đã được rút gọn thành công",
    })
  }

  const copyToClipboard = async (shortUrl: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`https://${shortUrl}`)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
      toast({
        title: "Đã sao chép!",
        description: "Link rút gọn đã được sao chép vào clipboard",
      })
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép link",
        variant: "destructive",
      })
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Nếu ít hơn hoặc bằng 5 trang, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Logic phức tạp hơn cho nhiều trang
      if (currentPage <= 3) {
        // Đầu danh sách: 1, 2, 3, 4, ..., last
        items.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Cuối danh sách: 1, ..., last-3, last-2, last-1, last
        items.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        // Giữa danh sách: 1, ..., current-1, current, current+1, ..., last
        items.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    return items
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Scissors className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">LinkCut</h1>
              <p className="text-sm text-muted-foreground">Rút gọn link cá nhân</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* URL Shortener Form */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-balance">Rút gọn URL của bạn</CardTitle>
            <CardDescription className="text-lg text-pretty">
              Tạo link ngắn gọn, dễ chia sẻ từ URL dài của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Nhập URL cần rút gọn (ví dụ: https://example.com/very-long-url)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                />
              </div>
              <Button onClick={handleShorten} disabled={isLoading} className="px-8">
                {isLoading ? "Đang xử lý..." : "Rút gọn"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shortened URLs List */}
        {shortenedUrls.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Link đã rút gọn ({shortenedUrls.length})</h2>
              <div className="text-sm text-muted-foreground">
                Trang {currentPage} / {totalPages}
              </div>
            </div>

            <div className="grid gap-4">
              {currentUrls.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* Short URL */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                            <Link className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-lg font-medium text-primary truncate">
                              https://{item.shortUrl}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(item.shortUrl, item.id)}
                            className="flex items-center gap-2"
                          >
                            {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedId === item.id ? "Đã sao chép" : "Sao chép"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`https://${item.shortUrl}`, "_blank")}
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Mở
                          </Button>
                        </div>
                      </div>

                      {/* Original URL */}
                      <div className="pl-11">
                        <p className="text-sm text-muted-foreground truncate">
                          <span className="font-medium">Gốc:</span> {item.originalUrl}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pl-11">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Tạo: {item.createdAt.toLocaleDateString("vi-VN")}</span>
                          <Badge variant="secondary" className="text-xs">
                            {item.clicks} lượt click
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Trước
                </Button>

                <div className="flex items-center gap-1">
                  {getPaginationItems().map((item, index) => (
                    <div key={index}>
                      {item === "..." ? (
                        <span className="px-3 py-2 text-muted-foreground">...</span>
                      ) : (
                        <Button
                          variant={currentPage === item ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(item as number)}
                          className="w-10 h-10"
                        >
                          {item}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 bg-transparent"
                >
                  Sau
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {shortenedUrls.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                  <Scissors className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Chưa có link nào được rút gọn</h3>
                  <p className="text-muted-foreground">Nhập URL ở trên để bắt đầu rút gọn link của bạn</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 LinkCut - Công cụ rút gọn link cá nhân</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
