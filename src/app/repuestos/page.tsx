import { Header, Footer } from "@/components/gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CatalogCard } from "@/components/catalog"
import { getActiveRepuestos } from "@/lib/actions/public"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Repuestos | BDC",
  description: "Catálogo completo de repuestos para motos y motocargueros",
}

export default async function RepuestosPage() {
  const repuestos = await getActiveRepuestos()

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb */}
            <Link
              href="/#productos"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>

            {/* Header */}
            <div className="text-center mb-12 fade-in-up">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
                Repuestos
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Encuentra todos los repuestos que necesitas para tu moto o motocarguero.
                Calidad garantizada y precios competitivos.
              </p>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-6" />
            </div>

            {/* Products Grid */}
            {repuestos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {repuestos.map((repuesto, index) => (
                  <div
                    key={repuesto.id}
                    className="fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CatalogCard
                      image={repuesto.image_url || "/assets/repuesto-test.jpg"}
                      name={repuesto.name}
                      description={repuesto.description || ""}
                      price={repuesto.price}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No hay repuestos disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
