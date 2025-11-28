"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus, IconTrash, IconEdit, IconLoader2, IconStar, IconStarFilled } from "@tabler/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { Motocarguero, MotocargueroSpecs } from "@/types/database.types"
import { createMotocarguero, updateMotocarguero, deleteMotocarguero } from "@/lib/actions/motocargueros"
import { toast } from "sonner"
import { ImageUpload } from "./image-upload"

interface MotocargueroTableProps {
  initialData: Motocarguero[]
}

export function MotocargueroTable({ initialData }: MotocargueroTableProps) {
  const [motocargueros, setMotocargueros] = useState<Motocarguero[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMotocarguero, setEditingMotocarguero] = useState<Motocarguero | null>(null)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
    motor: "",
    carga: "",
    combustible: "",
    is_active: true,
    is_featured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const specs: MotocargueroSpecs = {}
      if (formData.motor) specs.motor = formData.motor
      if (formData.carga) specs.carga = formData.carga
      if (formData.combustible) specs.combustible = formData.combustible

      const data = {
        name: formData.name,
        description: formData.description || null,
        image_url: formData.image_url || null,
        price: formData.price ? parseFloat(formData.price) : null,
        specs,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
      }

      if (editingMotocarguero) {
        const result = await updateMotocarguero(editingMotocarguero.id, data)
        if (result.success) {
          setMotocargueros(motocargueros.map(m =>
            m.id === editingMotocarguero.id
              ? { ...m, ...data, updated_at: new Date().toISOString() }
              : m
          ))
          toast.success("Motocarguero actualizado correctamente")
        } else {
          toast.error(result.error || "Error al actualizar")
        }
      } else {
        const result = await createMotocarguero(data)
        if (result.success) {
          toast.success("Motocarguero creado correctamente")
          window.location.reload()
        } else {
          toast.error(result.error || "Error al crear")
        }
      }
      resetForm()
    })
  }

  const handleEdit = (motocarguero: Motocarguero) => {
    const specs = motocarguero.specs as MotocargueroSpecs || {}
    setEditingMotocarguero(motocarguero)
    setFormData({
      name: motocarguero.name,
      description: motocarguero.description || "",
      image_url: motocarguero.image_url || "",
      price: motocarguero.price?.toString() || "",
      motor: specs.motor || "",
      carga: specs.carga || "",
      combustible: specs.combustible || "",
      is_active: motocarguero.is_active ?? true,
      is_featured: motocarguero.is_featured ?? false,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este motocarguero?")) return

    startTransition(async () => {
      const result = await deleteMotocarguero(id)
      if (result.success) {
        setMotocargueros(motocargueros.filter(m => m.id !== id))
        toast.success("Motocarguero eliminado correctamente")
      } else {
        toast.error(result.error || "Error al eliminar")
      }
    })
  }

  const toggleFeatured = (motocarguero: Motocarguero) => {
    startTransition(async () => {
      const newFeatured = !motocarguero.is_featured
      const result = await updateMotocarguero(motocarguero.id, { is_featured: newFeatured })
      if (result.success) {
        setMotocargueros(motocargueros.map(m =>
          m.id === motocarguero.id ? { ...m, is_featured: newFeatured } : m
        ))
        toast.success(newFeatured ? "Marcado como destacado" : "Removido de destacados")
      } else {
        toast.error("Error al actualizar")
      }
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image_url: "",
      price: "",
      motor: "",
      carga: "",
      combustible: "",
      is_active: true,
      is_featured: false,
    })
    setEditingMotocarguero(null)
    setIsDialogOpen(false)
  }

  const formatPrice = (price: number | null) => {
    if (!price) return "-"
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(price)
  }

  const getSpecs = (specs: unknown): MotocargueroSpecs => {
    if (typeof specs === 'object' && specs !== null) {
      return specs as MotocargueroSpecs
    }
    return {}
  }

  const featuredCount = motocargueros.filter(m => m.is_featured).length

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Motocargueros</h1>
          <p className="text-muted-foreground text-sm">
            Gestiona los motocargueros de tu catálogo
            <span className="ml-2 text-primary">({featuredCount} destacados)</span>
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <IconPlus className="h-4 w-4 mr-2" />
              Agregar Motocarguero
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingMotocarguero ? "Editar Motocarguero" : "Nuevo Motocarguero"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre del motocarguero"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción breve"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio (S/.)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Especificaciones</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    value={formData.motor}
                    onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                    placeholder="Motor (ej: 300cc)"
                  />
                  <Input
                    value={formData.carga}
                    onChange={(e) => setFormData({ ...formData, carga: e.target.value })}
                    placeholder="Carga (ej: 500kg)"
                  />
                  <Input
                    value={formData.combustible}
                    onChange={(e) => setFormData({ ...formData, combustible: e.target.value })}
                    placeholder="Combustible"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Imagen</Label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                  />
                  <Label htmlFor="is_active" className="text-sm">Activo (visible en la tienda)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                  />
                  <Label htmlFor="is_featured" className="text-sm">Destacado (mostrar en página principal)</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingMotocarguero ? "Guardar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Motocargueros ({motocargueros.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-16">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Especificaciones</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {motocargueros.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No hay motocargueros registrados. ¡Agrega el primero!
                  </TableCell>
                </TableRow>
              ) : (
                motocargueros.map((motocarguero) => {
                  const specs = getSpecs(motocarguero.specs)
                  return (
                    <TableRow key={motocarguero.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(motocarguero)}
                          disabled={isPending}
                          title={motocarguero.is_featured ? "Quitar de destacados" : "Marcar como destacado"}
                        >
                          {motocarguero.is_featured ? (
                            <IconStarFilled className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <IconStar className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                          {motocarguero.image_url ? (
                            <Image
                              src={motocarguero.image_url}
                              alt={motocarguero.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              Sin img
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{motocarguero.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {motocarguero.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex flex-wrap gap-1">
                          {specs.motor && (
                            <span className="px-1.5 py-0.5 bg-muted rounded text-xs">{specs.motor}</span>
                          )}
                          {specs.carga && (
                            <span className="px-1.5 py-0.5 bg-muted rounded text-xs">{specs.carga}</span>
                          )}
                          {specs.combustible && (
                            <span className="px-1.5 py-0.5 bg-muted rounded text-xs">{specs.combustible}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(motocarguero.price)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          motocarguero.is_active
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }`}>
                          {motocarguero.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(motocarguero)}
                            disabled={isPending}
                          >
                            <IconEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(motocarguero.id)}
                            className="text-destructive hover:text-destructive"
                            disabled={isPending}
                          >
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
