import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { RepuestosTable } from "@/components/dashboard/repuestos-table"
import { getRepuestos } from "@/lib/actions/repuestos"

export default async function RepuestosPage() {
  const repuestos = await getRepuestos()

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
          <RepuestosTable initialData={repuestos} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
