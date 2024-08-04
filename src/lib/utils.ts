import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and combines the given class values using clsx and tailwind-merge.
 *
 * @param inputs - The class values to be merged and combined.
 * @returns The merged and combined class value.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
}