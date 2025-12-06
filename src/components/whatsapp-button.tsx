"use client"

import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber = "573137732492",
  message = "Hola, me interesa información sobre sus motocargueros y repuestos"
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BA5C] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </button>
  )
}
