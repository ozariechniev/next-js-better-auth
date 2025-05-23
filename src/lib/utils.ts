import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { twMerge } from 'tailwind-merge';
import { UAParser } from 'ua-parser-js';

dayjs.extend(relativeTime);

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

export function getUAInfo(userAgent: string | '') {
  const parser = new UAParser(userAgent);

  return {
    deviceType: parser.getDevice().type,
    osName: parser.getOS().name,
    browserName: parser.getBrowser().name,
  };
}

export function dateToRelative(dateString: Date): string {
  return dayjs(new Date(dateString)).fromNow();
}

export async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
