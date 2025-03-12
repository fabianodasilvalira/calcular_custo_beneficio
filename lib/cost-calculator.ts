import type { DrinkWithValue } from "./types"

/**
 * Calculates the cost per liter for a given volume and price
 * @param volumeInMl Volume in milliliters
 * @param price Price in currency units
 * @returns Cost per liter
 */
export function calculateCostPerLiter(volumeInMl: number, price: number): number {
  if (volumeInMl <= 0 || price <= 0) return 0

  // Convert ml to liters and calculate cost per liter
  const volumeInLiters = volumeInMl / 1000
  return price / volumeInLiters
}

/**
 * Finds the drink with the best value (lowest cost per liter)
 * @param drinks Array of drinks with calculated cost per liter
 * @returns The drink with the best value or null if no valid drinks
 */
export function findBestValue(drinks: DrinkWithValue[]): DrinkWithValue | null {
  if (drinks.length === 0) return null

  // Filter out invalid entries
  const validDrinks = drinks.filter((drink) => drink.volume > 0 && drink.price > 0 && drink.costPerLiter > 0)

  if (validDrinks.length === 0) return null

  // Find the drink with the lowest cost per liter
  return validDrinks.reduce(
    (best, current) => (current.costPerLiter < best.costPerLiter ? current : best),
    validDrinks[0],
  )
}

