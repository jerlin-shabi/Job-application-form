// filepath: e:\Job-application-form\lib\utils.ts
export function exampleUtility() {
  console.log("Utility function");
}import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
