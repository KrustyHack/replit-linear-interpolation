import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Linear interpolation function
 * Calculates y value for a given x between two points (x1,y1) and (x2,y2)
 * Formula: y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)
 */
export function linearInterpolate(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number
): number | null {
  // Check for division by zero
  if (x1 === x2) {
    return null;
  }
  
  return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
}
