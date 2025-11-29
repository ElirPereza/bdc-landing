import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { BannerTable } from "@/components/dashboard/banner-table"
import { getBannerImages } from "@/lib/actions/banner"

export default async function BannerPage() {
  const banners = await getBannerImages()

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
          <BannerTable initialData={banners} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
