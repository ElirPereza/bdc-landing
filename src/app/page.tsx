import { Header, Hero, ProductTabs, Footer } from "@/components/gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getFeaturedRepuestos, getFeaturedMotocargueros } from "@/lib/actions/public"
import { getActiveBannerImages } from "@/lib/actions/banner"

export default async function Home() {
  const [repuestosData, motocargueroData, bannersData] = await Promise.all([
    getFeaturedRepuestos(),
    getFeaturedMotocargueros(),
    getActiveBannerImages(),
  ])

  // Transform data for ProductTabs component
  const repuestos = repuestosData.map((r) => ({
    id: r.id,
    image: r.image_url || "",
    name: r.name,
    description: r.description || "",
  }))

  const motocargueros = motocargueroData.map((m) => ({
    id: m.id,
    image: m.image_url || "",
    name: m.name,
    description: m.description || "",
  }))

  // Transform banners for Hero component
  const banners = bannersData.map((b) => ({
    id: b.id,
    image_url: b.image_url,
    image_url_mobile: b.image_url_mobile,
    title: b.title,
    subtitle: b.subtitle,
    show_title: b.show_title,
    show_subtitle: b.show_subtitle,
  }))

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero banners={banners} />
        <ProductTabs repuestos={repuestos} motocargueros={motocargueros} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
