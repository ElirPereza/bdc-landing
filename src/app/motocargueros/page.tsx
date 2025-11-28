import { Header, Footer } from "@/components/gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CatalogCard } from "@/components/catalog"
import { getActiveMotocargueros } from "@/lib/actions/public"
import { MotocargueroSpecs } from "@/types/database.types"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Motocargueros | BDC",
  description: "Catálogo completo de motocargueros de carga",
}

export default async function MotocargueroPage() {
  const motocargueros = await getActiveMotocargueros()

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
                Motocargueros
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Motocargueros de alta calidad para transporte de carga.
                Potencia, durabilidad y eficiencia para tu negocio.
              </p>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-6" />
            </div>

            {/* Products Grid */}
            {motocargueros.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {motocargueros.map((moto, index) => {
                  const specs = moto.specs as MotocargueroSpecs | null
                  return (
                    <div
                      key={moto.id}
                      className="fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CatalogCard
                        image={moto.image_url || "/assets/motocarguero-test.jpg"}
                        name={moto.name}
                        description={moto.description || ""}
                        price={moto.price}
                        specs={specs ? {
                          motor: specs.motor || "",
                          carga: specs.carga || "",
                          combustible: specs.combustible || "",
                        } : undefined}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No hay motocargueros disponibles en este momento.
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
