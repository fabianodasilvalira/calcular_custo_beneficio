import { Beer, Trophy } from "lucide-react"
import type { DrinkWithValue } from "@/lib/types"

interface ResultsDisplayProps {
  drinks: DrinkWithValue[]
  bestValue: DrinkWithValue | null
}

export default function ResultsDisplay({ drinks, bestValue }: ResultsDisplayProps) {
  if (drinks.length === 0) return null

  return (
    <div className="mt-4 space-y-3">
      <h3 className="font-bold text-lg text-blue-800 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        Resultados
      </h3>

      <div className="space-y-2">
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
                <div className="font-medium">{drink.name}</div>
                <div className="text-sm text-gray-600">
                  {drink.volume}ml por R${drink.price.toFixed(2)}
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
    </div>
  )
}

