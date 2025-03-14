import React from "react"

interface DescriptionTextProps {
  className?: string; // Definição da interface
}

export default function DescriptionText({ className }: DescriptionTextProps) {
  return (
    <div className={`mb-4 ml-5 text-sm text-primary ${className}`}>
      {/* Texto "Calculadora de Benefícios JG" em azul, negrito e tamanho h4 */}
      <h4 className="text-blue-700 font-bold text-lg mb-2">
        Calculadora de Benefícios JG
      </h4>
      {/* Texto "Compare preços..." */}
      <p>
        Compare preços de diferentes tamanhos de cerveja e descubra a melhor opção de custo-benefício para o seu bolso.
      </p>
    </div>
  );
}