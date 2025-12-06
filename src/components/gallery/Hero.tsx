"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

interface BannerImage {
  id: string
  image_url: string
  image_url_mobile: string | null
  title: string | null
  subtitle: string | null
  show_title: boolean | null
  show_subtitle: boolean | null
}

interface HeroProps {
  banners?: BannerImage[]
}

export function Hero({ banners = [] }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Use default banner if no banners from DB
  const images = banners.length > 0 ? banners : [
    {
      id: "default",
      image_url: "/assets/banner-1.jpg",
      image_url_mobile: null,
      title: "Somos #1 en Colombia",
      subtitle: "Somos #1 en Colombia en la distribución de motocargueros y repuestos",
      show_title: true,
      show_subtitle: true
    }
  ]

  // Check if current banner should show any content (title, subtitle)
  const currentBanner = images[currentIndex]
  const showContent = currentBanner?.show_title || currentBanner?.show_subtitle

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length, nextSlide])

  const scrollToGallery = () => {
    const element = document.getElementById("productos")
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
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {images.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Desktop Image */}
            <Image
              src={banner.image_url}
              alt={banner.title || "BDC Motocargueros"}
              fill
              className={`object-cover ${banner.image_url_mobile ? "hidden md:block" : ""}`}
              priority={index === 0}
            />
            {/* Mobile Image (if exists) */}
            {banner.image_url_mobile && (
              <Image
                src={banner.image_url_mobile}
                alt={banner.title || "BDC Motocargueros"}
                fill
                className="object-cover block md:hidden"
                priority={index === 0}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content - Only show if current banner has text enabled */}
      {showContent && (
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-xl">
            {currentBanner?.show_title && currentBanner?.title && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight fade-in-up">
                {currentBanner.title}
              </h1>
            )}
            {currentBanner?.show_subtitle && currentBanner?.subtitle && (
              <p className="text-lg md:text-xl text-white/80 mb-8 font-light fade-in-up delay-200">
                {currentBanner.subtitle}
              </p>
            )}
            <Button
              onClick={scrollToGallery}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base px-8 py-6 rounded-lg fade-in-up delay-400 hover-lift"
            >
              Explorar galería
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Carousel Controls - Only show if more than 1 image */}
      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir a banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>
  )
}
