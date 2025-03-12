"use client"

import { useState } from "react"
import { Beer, Trash2, Share2, Plus, Calculator, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DrinkForm from "@/components/drink-form"
import ResultsModal from "@/components/results-modal"
import BarMascot from "@/components/bar-mascot"
import { calculateCostPerLiter, findBestValue } from "@/lib/cost-calculator"
import type { Drink, DrinkWithValue } from "@/lib/types"
import Banner from "@/components/banner"
import DescriptionText from "@/components/descriptionText"

export default function DrinkCalculator() {
  const [drinks, setDrinks] = useState<Drink[]>([
    { id: 1, name: "", volume: 0, price: 0, containerType: "" },
    { id: 2, name: "", volume: 0, price: 0, containerType: "" },
  ])
  const [showResults, setShowResults] = useState(false)

  const addDrink = () => {
    const newId = drinks.length > 0 ? Math.max(...drinks.map((d) => d.id)) + 1 : 1
    setDrinks([
      ...drinks,
      {
        id: newId,
        name: "",
        volume: 0,
        price: 0,
        containerType: "",
      },
    ])
  }

  const updateDrink = (updatedDrink: Drink) => {
    // If the container type changes, update the name to reflect the container type
    const drinkToUpdate = { ...updatedDrink }

    if (updatedDrink.containerType && updatedDrink.volume) {
      const index = drinks.findIndex((d) => d.id === updatedDrink.id)
      drinkToUpdate.name = `${updatedDrink.containerType}: ${updatedDrink.volume}ml`
    }

    setDrinks(drinks.map((drink) => (drink.id === updatedDrink.id ? drinkToUpdate : drink)))
  }

  const removeDrink = (id: number) => {
    setDrinks(drinks.filter((drink) => drink.id !== id))
  }

  const clearAll = () => {
    setDrinks([
      { id: 1, name: "", volume: 0, price: 0, containerType: "" },
      { id: 2, name: "", volume: 0, price: 0, containerType: "" },
    ])
  }

  const shareBestValue = () => {
    const drinksWithValues = drinks
      .filter((drink) => drink.volume > 0 && drink.price > 0)
      .map((drink) => ({
        ...drink,
        costPerLiter: calculateCostPerLiter(drink.volume, drink.price),
      }))

    const bestDrink = findBestValue(drinksWithValues)

    if (bestDrink) {
      const text = `Encontrei a melhor opção de bebida! ${bestDrink.containerType} (${bestDrink.volume}ml) por R$${bestDrink.price.toFixed(2)} - Custo por litro: R$${bestDrink.costPerLiter.toFixed(2)}`

      if (navigator.share) {
        navigator
          .share({
            title: "Melhor Custo-Benefício de Bebida",
            text: text,
          })
          .catch((err) => {
            console.error("Erro ao compartilhar:", err)
          })
      } else {
        navigator.clipboard
          .writeText(text)
          .then(() => alert("Texto copiado para a área de transferência!"))
          .catch((err) => console.error("Erro ao copiar:", err))
      }
    }
  }

  const calculateResults = () => {
    setShowResults(true)
  }

  // Calculate values for all valid drinks
  const drinksWithValues: DrinkWithValue[] = drinks
    .filter((drink) => drink.volume > 0 && drink.price > 0)
    .map((drink) => ({
      ...drink,
      costPerLiter: calculateCostPerLiter(drink.volume, drink.price),
    }))

  const bestValue = findBestValue(drinksWithValues)

  return (
    <>
      <Card className="shadow-xl border-blue-300 bg-white">
        <Banner />
        <CardHeader className="bg-blue-600 text-white relative px-4 py-4">
          <div className="flex flex-col items-center justify-center w-full">
            <CardTitle className="text-xl sm:text-2xl text-center flex items-center gap-2">
              <Beer className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Ícone de cerveja */}
              JG DEPÓSITO DE BEBIDAS
            </CardTitle>
            <div className="flex items-center mt-1 text-sm">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" /> {/* Ícone do WhatsApp */}
              <span>(86) 99528-3262</span> {/* Número de telefone */}
            </div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <BarMascot /> {/* Componente BarMascot */}
          </div>
        </CardHeader>
        <DescriptionText className="relative px-4 py-4" />

        <CardContent className="">
          <div className="space-y-4">
            {drinks.map((drink) => (
              <DrinkForm
                key={drink.id}
                drink={drink}
                onUpdate={updateDrink}
                onRemove={removeDrink}
                canRemove={drinks.length > 1}
              />
            ))}

            {drinks.length < 5 && (
              <Button
                variant="outline"
                className="w-full border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50"
                onClick={addDrink}
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar Bebida
              </Button>
            )}

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={calculateResults}
              disabled={drinksWithValues.length < 2}
            >
              <Calculator className="mr-2 h-4 w-4" /> Calcular
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={clearAll}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Limpar
              </Button>

              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={shareBestValue} disabled={!bestValue}>
                <Share2 className="mr-2 h-4 w-4" /> Compartilhar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        drinks={drinksWithValues}
        bestValue={bestValue}
      />
    </>
  )
}