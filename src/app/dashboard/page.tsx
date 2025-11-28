import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconTool, IconTruck, IconPhoto, IconEye } from "@tabler/icons-react"
import Link from "next/link"
import { getProductCounts } from "@/lib/actions/public"

export default async function DashboardPage() {
  const counts = await getProductCounts()

  const stats = [
    {
      title: "Repuestos",
      value: counts.repuestos.toString(),
      description: "productos en catálogo",
      icon: IconTool,
      href: "/dashboard/repuestos",
    },
    {
      title: "Motocargueros",
      value: counts.motocargueros.toString(),
      description: "modelos disponibles",
      icon: IconTruck,
      href: "/dashboard/motocargueros",
    },
    {
      title: "Imágenes",
      value: "-",
      description: "en la galería",
      icon: IconPhoto,
      href: "/dashboard/gallery",
    },
    {
      title: "Total Productos",
      value: (counts.repuestos + counts.motocargueros).toString(),
      description: "en el catálogo",
      icon: IconEye,
      href: "#",
    },
  ]

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Bienvenido al panel de administración de BDC</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <Link key={stat.title} href={stat.href}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/dashboard/repuestos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <IconTool className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Gestionar Repuestos</p>
                    <p className="text-xs text-muted-foreground">Agregar, editar o eliminar repuestos</p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/motocargueros"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <IconTruck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Gestionar Motocargueros</p>
                    <p className="text-xs text-muted-foreground">Agregar, editar o eliminar motocargueros</p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/gallery"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <IconPhoto className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Gestionar Galería</p>
                    <p className="text-xs text-muted-foreground">Sube o elimina imágenes</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Estado de la Base de Datos</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Conectado a Supabase
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Landing Page</p>
                    <p className="text-xs text-muted-foreground">
                      <Link href="/" className="text-primary hover:underline">Ver sitio público →</Link>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Versión</p>
                    <p className="text-xs text-muted-foreground">1.0.0 - Next.js 16</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
