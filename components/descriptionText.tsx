import React from "react"

interface DescriptionTextProps {
  className?: string
}

export default function DescriptionText({ className }: DescriptionTextProps) {
  return (
    <div className={`mb-4 text-sm text-gray-600  ${className}`}>
      <p>
        Escolha os tipos e tamanhos das cervejas para calcular o melhor custo-benefício. 
        Compare os preços e descubra qual cerveja oferece o maior valor por litro!
      </p>
    </div>
  )
}