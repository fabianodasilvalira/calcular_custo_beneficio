"use client"

import { Beer, Trophy } from "lucide-react"
import type { DrinkWithValue } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
  drinks: DrinkWithValue[]
  bestValue: DrinkWithValue | null
}

export default function ResultsModal({ isOpen, onClose, drinks, bestValue }: ResultsModalProps) {
  if (drinks.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Resultados da Comparação
          </DialogTitle>
          <DialogDescription>Comparação de custo-benefício entre as bebidas</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4 max-h-[60vh] overflow-y-auto pr-1">
          {drinks.map((drink) => {
            const isBest = bestValue && drink.id === bestValue.id

            return (
              <div
                key={drink.id}
                className={`p-3 rounded-lg flex items-center gap-3 ${
                  isBest
                    ? "bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className={`p-2 rounded-full ${isBest ? "bg-blue-500" : "bg-gray-300"}`}>
                  <Beer className={`h-5 w-5 ${isBest ? "text-white" : "text-gray-600"}`} />
                </div>

                <div className="flex-1">
                  <div className="text-sm text-gray-600">
                    {drink.containerType}: {drink.volume}ml por R${drink.price.toFixed(2)}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-bold ${isBest ? "text-blue-700" : "text-gray-700"}`}>
                    R${drink.costPerLiter.toFixed(2)}/L
                  </div>
                  {isBest && <div className="text-xs text-blue-600 font-medium">Melhor opção!</div>}
                </div>
              </div>
            )
          })}
        </div>

        {bestValue && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-1">Melhor Custo-Benefício:</h3>
            <p className="text-blue-700">
              <strong>{bestValue.containerType}</strong> ({bestValue.volume}ml) por R${bestValue.price.toFixed(2)}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Custo por litro: <strong>R${bestValue.costPerLiter.toFixed(2)}</strong>
            </p>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

