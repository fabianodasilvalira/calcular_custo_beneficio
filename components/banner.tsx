"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Banner() {
  const [currentImage, setCurrentImage] = useState(0)

  // Imagens locais para o banner
  const images = [
    "/media/jg.jpg", // Imagem local 1
    "/media/sm.jpg", // Imagem local 2
  ]

  // Auto-rotacionar imagens a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  // Navegação para a próxima imagem
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  // Navegação para a imagem anterior
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  // Estilos reutilizáveis para os botões de navegação
  const navigationButtonStyles =
    "absolute top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50 z-10"

  return (
    <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded-t-lg">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
            aria-hidden={index !== currentImage} // Melhora a acessibilidade
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            {/* Adicione conteúdo adicional aqui, se necessário */}
          </div>
        </div>
      ))}

      {/* Botão de navegação para a esquerda */}
      <button
        onClick={prevImage}
        className={`left-2 ${navigationButtonStyles}`}
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Botão de navegação para a direita */}
      <button
        onClick={nextImage}
        className={`right-2 ${navigationButtonStyles}`}
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicadores de imagem */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir para a imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}