"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface CatalogCardProps {
  image: string
  name: string
  description: string
  price?: number | null
  specs?: Record<string, string>
  whatsappNumber?: string
}

export function CatalogCard({
  image,
  name,
  description,
  price,
  specs,
  whatsappNumber = "573137732492"
}: CatalogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hola, me interesa el producto: ${name}. ¿Podrían darme más información?`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card hover-lift">
      <CardContent className="p-0 relative overflow-hidden aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <Image
          src={image}
          alt={name}
          fill
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
        <div className="w-full">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {specs && Object.keys(specs).length > 0 && (
          <div className="w-full space-y-1">
            {Object.entries(specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-2 text-xs sm:text-sm">
                <span className="text-muted-foreground capitalize flex-shrink-0">{key}:</span>
                <span className="text-foreground font-medium text-right truncate">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="w-full pt-2 border-t border-border/50">
          <p className="text-lg sm:text-xl font-bold text-primary">
            {formatPrice(price)}
          </p>
        </div>

        <Button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white transition-all text-sm sm:text-base py-2 sm:py-2.5"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Consultar
        </Button>
      </CardFooter>
    </Card>
  )
}
