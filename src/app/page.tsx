import { Header, Hero, ProductTabs, Footer } from "@/components/gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getActiveRepuestos, getActiveMotocargueros } from "@/lib/actions/public"

export default async function Home() {
  const [repuestosData, motocargueroData] = await Promise.all([
    getActiveRepuestos(),
    getActiveMotocargueros(),
  ])

  // Transform data for ProductTabs component
  const repuestos = repuestosData.map((r) => ({
    id: r.id,
    image: r.image_url || "/assets/repuesto-test.jpg",
    name: r.name,
    description: r.description || "",
  }))

  const motocargueros = motocargueroData.map((m) => ({
    id: m.id,
    image: m.image_url || "/assets/motocarguero-test.jpg",
    name: m.name,
    description: m.description || "",
  }))

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductTabs repuestos={repuestos} motocargueros={motocargueros} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
