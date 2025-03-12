"use client"

import type { ChangeEvent } from "react"
import { Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Drink } from "@/lib/types"

interface DrinkFormProps {
  drink: Drink
  onUpdate: (drink: Drink) => void
  onRemove: (id: number) => void
  canRemove: boolean
}

export default function DrinkForm({ drink, onUpdate, onRemove, canRemove }: DrinkFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "price") {
      // Convert to number and ensure it's not negative
      const numValue = Math.max(0, Number.parseFloat(value) || 0)
      onUpdate({ ...drink, [name]: numValue })
    } else {
      onUpdate({ ...drink, [name]: value })
    }
  }

  const handleSizeSelect = (value: string) => {
    const [containerType, sizeStr] = value.split("|")
    const volume = Number.parseInt(sizeStr)
    onUpdate({ ...drink, containerType, volume })
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm relative">
      <div className="absolute top-3 right-3">
        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
            onClick={() => onRemove(drink.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 mb-3">
        <div className="space-y-1">
          <Label htmlFor={`container-${drink.id}`} className="text-sm text-blue-700">
            Tipo e Tamanho
          </Label>
          <Select 
            onValueChange={handleSizeSelect} 
            value={drink.containerType ? `${drink.containerType}|${drink.volume}` : "placeholder"}
          >
            <SelectTrigger id={`container-${drink.id}`} className="border-blue-200 focus:border-blue-500">
              <SelectValue placeholder="🍺 Selecione um tipo de cerveja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder" disabled>
                🍺 Selecione um tipo de cerveja
              </SelectItem>
              <SelectItem value="Longneck|275">Longneck: 275ml</SelectItem>
              <SelectItem value="Longneck|300">Longneck: 300ml</SelectItem>
              <SelectItem value="Longneck|355">Longneck: 355ml</SelectItem>
              <SelectItem value="Garrafa Tradicional|600">Garrafa Tradicional: 600ml</SelectItem>
              <SelectItem value="Garrafa Tradicional|1000">Garrafa Tradicional: 1L (1000ml)</SelectItem>
              <SelectItem value="Lata|269">Lata: 269ml</SelectItem>
              <SelectItem value="Lata|310">Lata: 310ml</SelectItem>
              <SelectItem value="Lata|350">Lata: 350ml</SelectItem>
              <SelectItem value="Lata|473">Lata: 473ml</SelectItem>
              <SelectItem value="Latão/Litrão|550">Latão/Litrão: 550ml</SelectItem>
              <SelectItem value="Latão/Litrão|710">Latão/Litrão: 710ml</SelectItem>
              <SelectItem value="Latão/Litrão|1000">Latão/Litrão: 1L (1000ml)</SelectItem>
              <SelectItem value="Latão/Litrão|1200">Latão/Litrão: 1,2L</SelectItem>
              <SelectItem value="Growler|1000">Growler: 1L</SelectItem>
              <SelectItem value="Growler|1500">Growler: 1,5L</SelectItem>
              <SelectItem value="Growler|2000">Growler: 2L</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor={`price-${drink.id}`} className="text-sm text-blue-700">
          Preço (R$)
        </Label>
        <Input
          id={`price-${drink.id}`}
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={drink.price || ""}
          onChange={handleChange}
          className="border-blue-200 focus:border-blue-500"
          placeholder="5.00"
        />
      </div>
    </div>
  )
}

