"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

interface ProductCardProps {
  image: string
  name: string
  description: string
}

export function ProductCard({ image, name, description }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card">
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
      <CardFooter className="flex flex-col items-start p-5 space-y-2">
        <h3 className="text-lg font-medium text-card-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Ver detalle
        </Button>
      </CardFooter>
    </Card>
  )
}
