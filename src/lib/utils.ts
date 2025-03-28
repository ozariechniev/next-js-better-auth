import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeDataToProps<T>(data: T | null): T | null {
  if (!data) {
    return null;
  }

  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Serialization error:', error);
    return null;
  }
}
