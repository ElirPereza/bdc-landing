"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload, IconTrash, IconPhoto } from "@tabler/icons-react"
import { useState } from "react"
import Image from "next/image"

interface GalleryImage {
  id: number
  src: string
  name: string
}

const initialImages: GalleryImage[] = [
  { id: 1, src: "/placeholder-parts-1.jpg", name: "parts-1.jpg" },
  { id: 2, src: "/placeholder-parts-2.jpg", name: "parts-2.jpg" },
  { id: 3, src: "/placeholder-parts-3.jpg", name: "parts-3.jpg" },
  { id: 4, src: "/placeholder-parts-4.jpg", name: "parts-4.jpg" },
  { id: 5, src: "/placeholder-parts-5.jpg", name: "parts-5.jpg" },
  { id: 6, src: "/placeholder-parts-6.jpg", name: "parts-6.jpg" },
  { id: 7, src: "/placeholder-bike-1.jpg", name: "bike-1.jpg" },
  { id: 8, src: "/placeholder-bike-2.jpg", name: "bike-2.jpg" },
  { id: 9, src: "/placeholder-bike-3.jpg", name: "bike-3.jpg" },
  { id: 10, src: "/placeholder-bike-4.jpg", name: "bike-4.jpg" },
  { id: 11, src: "/placeholder-bike-5.jpg", name: "bike-5.jpg" },
  { id: 12, src: "/placeholder-bike-6.jpg", name: "bike-6.jpg" },
  { id: 13, src: "/hero-workshop.jpg", name: "hero-workshop.jpg" },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [selectedImages, setSelectedImages] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelectedImages(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const deleteSelected = () => {
    setImages(images.filter(img => !selectedImages.includes(img.id)))
    setSelectedImages([])
  }

  const handleUpload = () => {
    // Placeholder for upload functionality
    alert("Funcionalidad de subida en desarrollo. Integrar con API de almacenamiento.")
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Galería de Imágenes</h1>
              <p className="text-muted-foreground text-sm">Administra todas las imágenes del sitio</p>
            </div>
            <div className="flex gap-2">
              {selectedImages.length > 0 && (
                <Button variant="destructive" onClick={deleteSelected}>
                  <IconTrash className="h-4 w-4 mr-2" />
                  Eliminar ({selectedImages.length})
                </Button>
              )}
              <Button onClick={handleUpload}>
                <IconUpload className="h-4 w-4 mr-2" />
                Subir Imagen
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Formatos: JPG, PNG, WebP. Máx: 5MB
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => toggleSelect(image.id)}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 transition-all ${
                  selectedImages.includes(image.id)
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent hover:border-border"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                  selectedImages.includes(image.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedImages.includes(image.id)
                      ? "bg-primary border-primary"
                      : "border-white"
                  }`}>
                    {selectedImages.includes(image.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                  <p className="text-xs text-white truncate">{image.name}</p>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <IconPhoto className="h-12 w-12 mb-4" />
              <p>No hay imágenes en la galería</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
