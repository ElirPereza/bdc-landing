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

interface Moto {
  id: number
  name: string
  description: string
  image: string
}

const initialMotos: Moto[] = [
  {
    id: 1,
    name: "Sport 1000R",
    description: "Potencia y diseño deportivo en perfecta armonía.",
    image: "/placeholder-bike-1.jpg",
  },
  {
    id: 2,
    name: "Cruiser Classic 800",
    description: "Estilo atemporal con tecnología moderna.",
    image: "/placeholder-bike-2.jpg",
  },
  {
    id: 3,
    name: "Naked Street 600",
    description: "Agilidad urbana con carácter agresivo.",
    image: "/placeholder-bike-3.jpg",
  },
  {
    id: 4,
    name: "Adventure 1200 GS",
    description: "Lista para cualquier aventura.",
    image: "/placeholder-bike-4.jpg",
  },
  {
    id: 5,
    name: "Urban Scooter 300",
    description: "Movilidad urbana eficiente y elegante.",
    image: "/placeholder-bike-5.jpg",
  },
  {
    id: 6,
    name: "Custom Bobber 750",
    description: "Personalización extrema con alma rebelde.",
    image: "/placeholder-bike-6.jpg",
  },
]

export default function MotosPage() {
  const [motos, setMotos] = useState<Moto[]>(initialMotos)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMoto) {
      setMotos(motos.map(m =>
        m.id === editingMoto.id
          ? { ...m, ...formData }
          : m
      ))
    } else {
      const newMoto: Moto = {
        id: Math.max(...motos.map(m => m.id)) + 1,
        ...formData,
      }
      setMotos([...motos, newMoto])
    }
    resetForm()
  }

  const handleEdit = (moto: Moto) => {
    setEditingMoto(moto)
    setFormData({
      name: moto.name,
      description: moto.description,
      image: moto.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setMotos(motos.filter(m => m.id !== id))
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", image: "" })
    setEditingMoto(null)
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
              <h1 className="text-2xl font-bold text-foreground">Motocicletas</h1>
              <p className="text-muted-foreground text-sm">Gestiona las motocicletas de tu catálogo</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                  <IconPlus className="h-4 w-4 mr-2" />
                  Agregar Moto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingMoto ? "Editar Motocicleta" : "Nueva Motocicleta"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nombre de la moto"
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
                        placeholder="/placeholder-bike-1.jpg"
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
                      {editingMoto ? "Guardar" : "Crear"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lista de Motocicletas</CardTitle>
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
                  {motos.map((moto) => (
                    <TableRow key={moto.id}>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                          <Image
                            src={moto.image}
                            alt={moto.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{moto.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {moto.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(moto)}
                          >
                            <IconEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(moto.id)}
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
