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
    {
      id: 2,
      image: "/placeholder-parts-2.jpg",
      name: "Kit de Bujías Iridium",
      description: "Mayor durabilidad y rendimiento óptimo del motor.",
    },
    {
      id: 3,
      image: "/placeholder-parts-3.jpg",
      name: "Disco de Freno Ventilado",
      description: "Frenado superior con tecnología de ventilación avanzada.",
    },
    {
      id: 4,
      image: "/placeholder-parts-4.jpg",
      name: "Cadena de Transmisión",
      description: "Alta resistencia y durabilidad para cualquier terreno.",
    },
    {
      id: 5,
      image: "/placeholder-parts-5.jpg",
      name: "Espejos Retrovisores",
      description: "Diseño aerodinámico con visibilidad panorámica.",
    },
    {
      id: 6,
      image: "/placeholder-parts-6.jpg",
      name: "Manillar Deportivo",
      description: "Ergonomía perfecta para máximo control y confort.",
    },
  ]

  const motocargueros = [
    {
      id: 1,
      image: "/assets/motocarguero-test.jpg",
      name: "Kameyo 300",
      description: "Potencia y diseño deportivo en perfecta armonía.",
    },
    {
      id: 2,
      image: "/placeholder-bike-2.jpg",
      name: "Cruiser Classic 800",
      description: "Estilo atemporal con tecnología moderna.",
    },
    {
      id: 3,
      image: "/placeholder-bike-3.jpg",
      name: "Naked Street 600",
      description: "Agilidad urbana con carácter agresivo.",
    },
    {
      id: 4,
      image: "/placeholder-bike-4.jpg",
      name: "Adventure 1200 GS",
      description: "Lista para cualquier aventura, en cualquier terreno.",
    },
    {
      id: 5,
      image: "/placeholder-bike-5.jpg",
      name: "Urban Scooter 300",
      description: "Movilidad urbana eficiente y elegante.",
    },
    {
      id: 6,
      image: "/placeholder-bike-6.jpg",
      name: "Custom Bobber 750",
      description: "Personalización extrema con alma rebelde.",
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
