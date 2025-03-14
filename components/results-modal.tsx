"use client"

import { Beer, Trophy, Info, ArrowUp, HelpCircle, ArrowUpDown } from "lucide-react"
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
            Resultado da Análise
          </DialogTitle>
          <DialogDescription>Compare os preços e encontre a melhor opção</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-1">
          {bestValue && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-green-600" /> {/* Ícone de preço caindo */}
                <h3 className="font-bold text-green-800">Melhor Custo-Benefício</h3>
              </div>
              <div className="mt-2">
                <p className="text-lg font-semibold text-green-700">{bestValue.volume}ml</p>
                <p className="text-sm text-green-700">R$ {bestValue.price.toFixed(2)} por unidade</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-green-700">Preço por litro:</span>
                  <span className="text-sm font-semibold text-green-700">
                    R$ {bestValue.costPerLiter.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-bold text-blue-800">Comparação Detalhada</h3>
            {drinks.map((drink, index) => {
              const isBest = bestValue && drink.id === bestValue.id
              const difference = bestValue ? drink.costPerLiter - bestValue.costPerLiter : 0
              const percentage = bestValue ? ((difference / bestValue.costPerLiter) * 100).toFixed(0) : 0

              return (
                <div
                  key={drink.id}
                  className={`p-4 rounded-lg flex flex-col gap-2 ${
                    isBest
                      ? "bg-gradient-to-r from-green-100 to-green-200 border border-green-300"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{index + 1}º</span>
                      <span className="text-sm font-semibold">{drink.volume}ml</span>
                    </div>
                    <span className="text-sm text-gray-700">R$ {drink.price.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Preço por litro: <strong>R$ {drink.costPerLiter.toFixed(2)}</strong>
                  </div>
                  {!isBest && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <ArrowUp className="h-4 w-4 text-red-600" />
                      <span>
                        Economia: R$ {difference.toFixed(2)} por litro ({percentage}% mais caro que a melhor opção)
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Seção de "Como entender este cálculo?" */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              {/* Ícone de ajuda (círculo com interrogação) */}
              <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" /> {/* Ícone ao lado do texto */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2"> {/* Container para ícone e texto "Como entender este cálculo?" */}
                  <span className="text-sm text-blue-700">
                    Como entender este cálculo?
                  </span>
                </div>
                <span className="text-sm text-gray-600 mt-1">
                  As economias mostradas representam quanto você economiza por litro ao escolher a melhor opção (275ml) em vez de cada uma das outras opções.
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}