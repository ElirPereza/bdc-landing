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
      openInNewTab: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4">
        <a href="/dashboard" className="flex justify-center">
          <Image
            src="/assets/logo-bdc.png"
            alt="BDC Logo"
            width={160}
            height={80}
            className="rounded-lg object-contain"
          />
        </a>
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
