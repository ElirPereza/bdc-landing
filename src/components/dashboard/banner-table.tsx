"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus, IconTrash, IconEdit, IconLoader2, IconGripVertical, IconDeviceMobile, IconDeviceDesktop } from "@tabler/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { BannerImage } from "@/types/database.types"
import { createBannerImage, updateBannerImage, deleteBannerImage } from "@/lib/actions/banner"
import { toast } from "sonner"
import { ImageUpload } from "./image-upload"

interface BannerTableProps {
  initialData: BannerImage[]
}

export function BannerTable({ initialData }: BannerTableProps) {
  const [banners, setBanners] = useState<BannerImage[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<BannerImage | null>(null)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    image_url: "",
    image_url_mobile: "",
    title: "",
    subtitle: "",
    show_title: true,
    show_subtitle: true,
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.image_url) {
      toast.error("Debes subir una imagen")
      return
    }

    startTransition(async () => {
      const data = {
        image_url: formData.image_url,
        image_url_mobile: formData.image_url_mobile || null,
        title: formData.title || null,
        subtitle: formData.subtitle || null,
        show_title: formData.show_title,
        show_subtitle: formData.show_subtitle,
        is_active: formData.is_active,
        display_order: editingBanner ? editingBanner.display_order : banners.length,
      }

      if (editingBanner) {
        const result = await updateBannerImage(editingBanner.id, data)
        if (result.success) {
          setBanners(banners.map(b =>
            b.id === editingBanner.id
              ? { ...b, ...data, updated_at: new Date().toISOString() }
              : b
          ))
          toast.success("Banner actualizado correctamente")
        } else {
          toast.error(result.error || "Error al actualizar")
        }
      } else {
        const result = await createBannerImage(data)
        if (result.success) {
          toast.success("Banner creado correctamente")
          window.location.reload()
        } else {
          toast.error(result.error || "Error al crear")
        }
      }
      resetForm()
    })
  }

  const handleEdit = (banner: BannerImage) => {
    setEditingBanner(banner)
    setFormData({
      image_url: banner.image_url,
      image_url_mobile: banner.image_url_mobile || "",
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      show_title: banner.show_title ?? true,
      show_subtitle: banner.show_subtitle ?? true,
      is_active: banner.is_active ?? true,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este banner?")) return

    startTransition(async () => {
      const result = await deleteBannerImage(id)
      if (result.success) {
        setBanners(banners.filter(b => b.id !== id))
        toast.success("Banner eliminado correctamente")
      } else {
        toast.error(result.error || "Error al eliminar")
      }
    })
  }

  const toggleActive = (banner: BannerImage) => {
    startTransition(async () => {
      const newActive = !banner.is_active
      const result = await updateBannerImage(banner.id, { is_active: newActive })
      if (result.success) {
        setBanners(banners.map(b =>
          b.id === banner.id ? { ...b, is_active: newActive } : b
        ))
        toast.success(newActive ? "Banner activado" : "Banner desactivado")
      } else {
        toast.error("Error al actualizar")
      }
    })
  }

  const resetForm = () => {
    setFormData({
      image_url: "",
      image_url_mobile: "",
      title: "",
      subtitle: "",
      show_title: true,
      show_subtitle: true,
      is_active: true,
    })
    setEditingBanner(null)
    setIsDialogOpen(false)
  }

  const activeCount = banners.filter(b => b.is_active).length

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Banner</h1>
          <p className="text-muted-foreground text-sm">
            Gestiona las imágenes del banner principal
            <span className="ml-2 text-primary">({activeCount} activos)</span>
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <IconPlus className="h-4 w-4 mr-2" />
              Agregar Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Editar Banner" : "Nuevo Banner"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Imagen Desktop */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <IconDeviceDesktop className="h-4 w-4" />
                  Imagen Desktop *
                </Label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  bucket="banners"
                />
              </div>

              {/* Imagen Mobile */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <IconDeviceMobile className="h-4 w-4" />
                  Imagen Mobile (opcional)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Si no se sube, se usará la imagen de desktop
                </p>
                <ImageUpload
                  value={formData.image_url_mobile}
                  onChange={(url) => setFormData({ ...formData, image_url_mobile: url })}
                  bucket="banners"
                />
              </div>

              {/* Título */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="title">Título</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show_title"
                      checked={formData.show_title}
                      onCheckedChange={(checked) => setFormData({ ...formData, show_title: checked as boolean })}
                    />
                    <Label htmlFor="show_title" className="text-xs text-muted-foreground">
                      Mostrar
                    </Label>
                  </div>
                </div>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título del banner"
                  disabled={!formData.show_title}
                  className={!formData.show_title ? "opacity-50" : ""}
                />
              </div>

              {/* Subtítulo */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show_subtitle"
                      checked={formData.show_subtitle}
                      onCheckedChange={(checked) => setFormData({ ...formData, show_subtitle: checked as boolean })}
                    />
                    <Label htmlFor="show_subtitle" className="text-xs text-muted-foreground">
                      Mostrar
                    </Label>
                  </div>
                </div>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Subtítulo o descripción"
                  disabled={!formData.show_subtitle}
                  className={!formData.show_subtitle ? "opacity-50" : ""}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                />
                <Label htmlFor="is_active" className="text-sm">Activo (visible en el sitio)</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingBanner ? "Guardar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Imágenes del Banner ({banners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {banners.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No hay banners. ¡Agrega el primero!
            </div>
          ) : (
            <div className="grid gap-4">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    banner.is_active ? "border-border" : "border-border/50 opacity-60"
                  }`}
                >
                  <div className="text-muted-foreground cursor-grab">
                    <IconGripVertical className="h-5 w-5" />
                  </div>
                  {/* Image previews */}
                  <div className="flex gap-2 flex-shrink-0">
                    <div className="relative w-24 h-16 rounded overflow-hidden bg-muted">
                      <Image
                        src={banner.image_url}
                        alt={banner.title || `Banner ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                        <IconDeviceDesktop className="h-3 w-3 inline" />
                      </div>
                    </div>
                    {banner.image_url_mobile && (
                      <div className="relative w-12 h-16 rounded overflow-hidden bg-muted">
                        <Image
                          src={banner.image_url_mobile}
                          alt={`${banner.title || `Banner ${index + 1}`} mobile`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                          <IconDeviceMobile className="h-3 w-3 inline" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {banner.title || `Banner ${index + 1}`}
                    </p>
                    {banner.subtitle && (
                      <p className="text-sm text-muted-foreground truncate">
                        {banner.subtitle}
                      </p>
                    )}
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Orden: {(banner.display_order ?? 0) + 1}
                      </span>
                      {banner.show_title && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          Título
                        </span>
                      )}
                      {banner.show_subtitle && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          Subtítulo
                        </span>
                      )}
                      {!banner.image_url_mobile && (
                        <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                          Sin móvil
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={banner.is_active ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActive(banner)}
                      disabled={isPending}
                    >
                      {banner.is_active ? "Activo" : "Inactivo"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(banner)}
                      disabled={isPending}
                    >
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(banner.id)}
                      className="text-destructive hover:text-destructive"
                      disabled={isPending}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCount > 1 && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Tienes {activeCount} banners activos. Se mostrarán como carrusel en la página principal.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
