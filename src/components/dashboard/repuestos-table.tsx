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
import { IconPlus, IconTrash, IconEdit, IconLoader2 } from "@tabler/icons-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { Repuesto } from "@/types/database.types"
import { createRepuesto, updateRepuesto, deleteRepuesto } from "@/lib/actions/repuestos"
import { toast } from "sonner"
import { ImageUpload } from "./image-upload"

interface RepuestosTableProps {
  initialData: Repuesto[]
}

export function RepuestosTable({ initialData }: RepuestosTableProps) {
  const [repuestos, setRepuestos] = useState<Repuesto[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRepuesto, setEditingRepuesto] = useState<Repuesto | null>(null)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
    stock: "",
    category: "",
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const data = {
        name: formData.name,
        description: formData.description || null,
        image_url: formData.image_url || null,
        price: formData.price ? parseFloat(formData.price) : null,
        stock: formData.stock ? parseInt(formData.stock) : 0,
        category: formData.category || null,
        is_active: formData.is_active,
      }

      if (editingRepuesto) {
        const result = await updateRepuesto(editingRepuesto.id, data)
        if (result.success) {
          setRepuestos(repuestos.map(r =>
            r.id === editingRepuesto.id
              ? { ...r, ...data, updated_at: new Date().toISOString() }
              : r
          ))
          toast.success("Repuesto actualizado correctamente")
        } else {
          toast.error(result.error || "Error al actualizar")
        }
      } else {
        const result = await createRepuesto(data)
        if (result.success) {
          toast.success("Repuesto creado correctamente")
          // Refresh will happen via revalidatePath
          window.location.reload()
        } else {
          toast.error(result.error || "Error al crear")
        }
      }
      resetForm()
    })
  }

  const handleEdit = (repuesto: Repuesto) => {
    setEditingRepuesto(repuesto)
    setFormData({
      name: repuesto.name,
      description: repuesto.description || "",
      image_url: repuesto.image_url || "",
      price: repuesto.price?.toString() || "",
      stock: repuesto.stock?.toString() || "0",
      category: repuesto.category || "",
      is_active: repuesto.is_active ?? true,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este repuesto?")) return

    startTransition(async () => {
      const result = await deleteRepuesto(id)
      if (result.success) {
        setRepuestos(repuestos.filter(r => r.id !== id))
        toast.success("Repuesto eliminado correctamente")
      } else {
        toast.error(result.error || "Error al eliminar")
      }
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image_url: "",
      price: "",
      stock: "",
      category: "",
      is_active: true,
    })
    setEditingRepuesto(null)
    setIsDialogOpen(false)
  }

  const formatPrice = (price: number | null) => {
    if (!price) return "-"
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(price)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Repuestos</h1>
          <p className="text-muted-foreground text-sm">Gestiona los repuestos de tu catálogo</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <IconPlus className="h-4 w-4 mr-2" />
              Agregar Repuesto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingRepuesto ? "Editar Repuesto" : "Nuevo Repuesto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre del repuesto"
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
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ej: Motores, Frenos, Eléctrico"
                />
              </div>
              <div className="space-y-2">
                <Label>Imagen</Label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                />
                <Label htmlFor="is_active" className="text-sm">Activo (visible en la tienda)</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingRepuesto ? "Guardar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Repuestos ({repuestos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repuestos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No hay repuestos registrados. ¡Agrega el primero!
                  </TableCell>
                </TableRow>
              ) : (
                repuestos.map((repuesto) => (
                  <TableRow key={repuesto.id}>
                    <TableCell>
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                        {repuesto.image_url ? (
                          <Image
                            src={repuesto.image_url}
                            alt={repuesto.name}
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
                        <p className="font-medium">{repuesto.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {repuesto.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {repuesto.category || "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(repuesto.price)}
                    </TableCell>
                    <TableCell>
                      <span className={(repuesto.stock ?? 0) > 0 ? "text-green-500" : "text-red-500"}>
                        {repuesto.stock ?? 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        repuesto.is_active
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}>
                        {repuesto.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(repuesto)}
                          disabled={isPending}
                        >
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(repuesto.id)}
                          className="text-destructive hover:text-destructive"
                          disabled={isPending}
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
