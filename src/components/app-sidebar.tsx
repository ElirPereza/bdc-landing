"use client"

import * as React from "react"
import {
  IconDashboard,
  IconHome,
  IconPhoto,
  IconTool,
  IconTruck,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "Admin",
    email: "admin@bdc.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Repuestos",
      url: "/dashboard/repuestos",
      icon: IconTool,
    },
    {
      title: "Motocargueros",
      url: "/dashboard/motocargueros",
      icon: IconTruck,
    },
    {
      title: "Banner",
      url: "/dashboard/banner",
      icon: IconPhoto,
    },
  ],
  navSecondary: [
    {
      title: "Ver Sitio",
      url: "/",
      icon: IconHome,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <Image
                  src="/assets/logo-bdc.png"
                  alt="BDC Logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-base font-semibold">BDC</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
