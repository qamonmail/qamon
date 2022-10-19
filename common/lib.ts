import { rem } from "polished";
import { format } from "date-fns";
import appConfig from "../app.config";
import ELanguage from "../models/enums/ELanguage";

export const px2rem = (px: number): string => {
  return rem(px, 14);
};

export const getDateFormat = (
  timestamp: number,
  formatType: string,
): string => {
  const a = new Date(timestamp * 1000);
  return format(a, formatType);
};

export const getAddressHidden = (address: string): string => {
  return `${address.slice(0, 10)}...${address.slice(-5)}`;
};

export const clearStorage = (): void => {
  const currentLocale = localStorage.getItem(appConfig.keys.settingsLocale);
  localStorage.clear();
  localStorage.setItem(appConfig.keys.settingsLocale, currentLocale || ELanguage.Korean);
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
