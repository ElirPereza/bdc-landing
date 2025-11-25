"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const scrollToGallery = () => {
    const element = document.getElementById("repuestos")
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
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-workshop.jpg"
          alt="Taller de reparación de motocicletas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-primary/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Tu pasión,
            <span className="block text-primary">
              nuestros repuestos
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 font-light">
            Explora nuestra galería premium de repuestos y motocicletas
          </p>
          <Button
            onClick={scrollToGallery}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base px-8 py-6 rounded-lg"
          >
            Explorar galería
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>
  )
}
