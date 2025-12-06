"use client"

import { useState } from "react"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string | number
  image: string
  name: string
  description: string
}

interface ProductTabsProps {
  repuestos: Product[]
  motocargueros: Product[]
}

export function ProductTabs({ repuestos, motocargueros }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"repuestos" | "motocargueros">("repuestos")

  const products = activeTab === "repuestos" ? repuestos : motocargueros
  const catalogUrl = activeTab === "repuestos" ? "/repuestos" : "/motocargueros"
  const catalogLabel = activeTab === "repuestos" ? "Ver todos los repuestos" : "Ver todos los motocargueros"

  return (
    <section id="productos" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Nuestros Productos
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-primary mx-auto mb-6 sm:mb-8" />

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3">
            <Button
              variant={activeTab === "repuestos" ? "default" : "outline"}
              onClick={() => setActiveTab("repuestos")}
              className="min-w-[120px] sm:min-w-[140px] text-sm sm:text-base transition-all duration-300"
            >
              Repuestos
            </Button>
            <Button
              variant={activeTab === "motocargueros" ? "default" : "outline"}
              onClick={() => setActiveTab("motocargueros")}
              className="min-w-[120px] sm:min-w-[140px] text-sm sm:text-base transition-all duration-300"
            >
              Motocargueros
            </Button>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  image={product.image}
                  name={product.name}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay productos destacados en esta categoría.
            </p>
          </div>
        )}

        {/* Ver catálogo completo */}
        <div className="text-center mt-10 fade-in-up delay-600">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[250px] hover-lift group"
          >
            <Link href={catalogUrl}>
              {catalogLabel}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
