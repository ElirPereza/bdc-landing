"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo-bdc.png"
              alt="BDC Logo"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("repuestos")}
              className={`${isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'} font-medium`}
            >
              Repuestos
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("motocargueros")}
              className={`${isScrolled ? 'text-foreground hover:text-primary' : 'text-white/90 hover:text-white'} font-medium`}
            >
              Motocargueros
            </Button>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className={`ml-2 ${isScrolled ? 'border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary' : 'border-white/30 bg-white/10 text-white hover:bg-transparent hover:text-white'}`}
              >
                Admin
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`${isScrolled ? 'text-foreground' : 'text-white'}`}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
