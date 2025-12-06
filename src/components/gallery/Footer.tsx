import { Facebook, Instagram, Twitter, MapPin } from "lucide-react"
import Image from "next/image"

const locations = [
  { city: "Medellín", address: "Av. 33 #65C-126" },
  { city: "Rionegro", address: "Calle 51 #45-70" },
  { city: "Itagüí", address: "Calle 40 #50A-17" },
  { city: "Bodega principal - Caldas, Antioquia", address: "Cra. 50 #125 Sur-178" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="fade-in-up">
            <div className="flex items-center mb-4">
              <Image
                src="/assets/logo-bdc.png"
                alt="BDC Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Tu destino premium para repuestos y motocargueros de calidad.
            </p>
          </div>

          <div className="fade-in-up delay-100">
            <h3 className="font-medium mb-4 text-foreground">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#repuestos" className="text-muted-foreground hover:text-primary transition-colors">
                  Repuestos
                </a>
              </li>
              <li>
                <a href="#motocargueros" className="text-muted-foreground hover:text-primary transition-colors">
                  Motocargueros
                </a>
              </li>
            </ul>
          </div>

          <div className="fade-in-up delay-200">
            <h3 className="font-medium mb-4 text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Sedes
            </h3>
            <ul className="space-y-3 text-sm">
              {locations.map((location, index) => (
                <li key={index}>
                  <span className="text-foreground font-medium">{location.city}</span>
                  <p className="text-muted-foreground">{location.address}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in-up delay-300">
            <h3 className="font-medium mb-4 text-foreground">Síguenos</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-primary-foreground hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-primary-foreground hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-primary-foreground hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 BDC. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
