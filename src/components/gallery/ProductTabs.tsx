"use client"

import { useState } from "react"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"

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

  return (
    <section id="productos" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Nuestros Productos
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />

          {/* Tabs */}
          <div className="flex justify-center gap-2">
            <Button
              variant={activeTab === "repuestos" ? "default" : "outline"}
              onClick={() => setActiveTab("repuestos")}
              className="min-w-[140px] transition-all duration-300"
            >
              Repuestos
            </Button>
            <Button
              variant={activeTab === "motocargueros" ? "default" : "outline"}
              onClick={() => setActiveTab("motocargueros")}
              className="min-w-[140px] transition-all duration-300"
            >
              Motocargueros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Ver más button - solo para repuestos */}
        {activeTab === "repuestos" && (
          <div className="text-center mt-10 fade-in-up delay-600">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] hover-lift"
            >
              Ver más
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
