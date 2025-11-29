"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconUpload, IconLoader2, IconX, IconPhoto } from "@tabler/icons-react"
import { uploadImage, uploadBannerImage } from "@/lib/actions/storage"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  placeholder?: string
  bucket?: "products" | "banners"
}

export function ImageUpload({ value, onChange, placeholder = "URL de imagen", bucket = "products" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede superar 5MB")
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = bucket === "banners"
        ? await uploadBannerImage(formData)
        : await uploadImage(formData)

      if (result.success && result.url) {
        setPreview(result.url)
        onChange(result.url)
        toast.success("Imagen subida correctamente")
      } else {
        toast.error(result.error || "Error al subir imagen")
      }
    } catch {
      toast.error("Error al subir imagen")
    } finally {
      setIsUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleUrlChange = (url: string) => {
    onChange(url)
    setPreview(url || null)
  }

  const clearImage = () => {
    onChange("")
    setPreview(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          ) : (
            <IconUpload className="h-4 w-4" />
          )}
        </Button>
      </div>

      {preview && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain"
            onError={() => setPreview(null)}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={clearImage}
          >
            <IconX className="h-3 w-3" />
          </Button>
        </div>
      )}

      {!preview && (
        <div
          className="w-full h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-muted-foreground/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <IconPhoto className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground">Click para subir imagen</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Formatos: JPG, PNG, WebP. Máximo 5MB.
      </p>
    </div>
  )
}
