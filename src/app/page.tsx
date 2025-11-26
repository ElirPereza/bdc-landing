import { Header, Hero, ProductTabs, Footer } from "@/components/gallery"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  const repuestos = [
    {
      id: 1,
      image: "/assets/repuesto-test.jpg",
      name: "MOTOR 300",
      description: "Máxima protección para tu motor. Compatible con múltiples modelos.",
    },
  ]

  const motocargueros = [
    {
      id: 1,
      image: "/assets/motocarguero-test.jpg",
      name: "Kameyo 300",
      description: "Potencia y diseño deportivo en perfecta armonía.",
    },
  ]

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
