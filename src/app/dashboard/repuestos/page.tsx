"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
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
import { IconPlus, IconTrash, IconEdit, IconUpload } from "@tabler/icons-react"
import { useState } from "react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  description: string
  image: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Filtro de Aceite Premium",
    description: "Máxima protección para tu motor.",
    image: "/placeholder-parts-1.jpg",
  },
  {
    id: 2,
    name: "Kit de Bujías Iridium",
    description: "Mayor durabilidad y rendimiento óptimo.",
    image: "/placeholder-parts-2.jpg",
  },
  {
    id: 3,
    name: "Disco de Freno Ventilado",
    description: "Frenado superior con ventilación avanzada.",
    image: "/placeholder-parts-3.jpg",
  },
  {
    id: 4,
    name: "Cadena de Transmisión",
    description: "Alta resistencia para cualquier terreno.",
    image: "/placeholder-parts-4.jpg",
  },
  {
    id: 5,
    name: "Espejos Retrovisores",
    description: "Diseño aerodinámico con visibilidad panorámica.",
    image: "/placeholder-parts-5.jpg",
  },
  {
    id: 6,
    name: "Manillar Deportivo",
    description: "Ergonomía perfecta para máximo control.",
    image: "/placeholder-parts-6.jpg",
  },
]

export default function RepuestosPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...formData }
          : p
      ))
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
      }
      setProducts([...products, newProduct])
    }
    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      image: product.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "" })
    setEditingProduct(null)
    setIsDialogOpen(false)
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Editar Repuesto" : "Nuevo Repuesto"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">URL de Imagen</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/placeholder-parts-1.jpg"
                        required
                      />
                      <Button type="button" variant="outline" size="icon">
                        <IconUpload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ingresa la ruta de la imagen o sube una nueva
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      {editingProduct ? "Guardar" : "Crear"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lista de Repuestos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right w-24">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {product.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                          >
                            <IconEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
