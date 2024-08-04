import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and combines the given class values using clsx and tailwind-merge.
 *
 * @param {ClassValue[]} inputs - The class values to be merged and combined.
 * @return {string} The merged and combined class value.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}