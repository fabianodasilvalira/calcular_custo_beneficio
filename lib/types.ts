export interface Drink {
  id: number
  name: string
  volume: number
  price: number
  containerType: string
}

export interface DrinkWithValue extends Drink {
  costPerLiter: number
}

