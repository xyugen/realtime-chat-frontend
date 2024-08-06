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

/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The input string to capitalize.
 * @return {string} The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (str.length == 0) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}