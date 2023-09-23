import { Region } from "contentstack";
import {
  StackItem,
  DropdownListItem,
  VercelProjectItem,
  VercelIntegrationItem,
} from './types';

/** Returns prefix for Vercel env variable name based on URL. */
export function getPrefix(url) {
  if (/react/g.test(url)) {
    return 'REACT_APP_';
  } else if (/vue/g.test(url)) {
    return 'VUE_APP_';
  } else if (/nuxt3/g.test(url)) {
    return 'VITE_';
  } else {
    return '';
  }
}

/** List of Vercel env variables added as result of integration. */
const VERCEL_ENV_ALIASES: string[] = [
  'CONTENTSTACK_DELIVERY_TOKEN',
  'CONTENTSTACK_API_KEY',
  'CONTENTSTACK_ENVIRONMENT',
  'CONTENTSTACK_REGION',
  'CONTENTSTACK_API_HOST',
  'CONTENTSTACK_APP_HOST',
  'CONTENTSTACK_MANAGEMENT_TOKEN',
  'CONTENTSTACK_LIVE_PREVIEW',
];

/** Returns list of Vercel env variables to be added during the integration. */
export function getVercelEnvKeys(repoUrl: string = ''): string[] {
  return VERCEL_ENV_ALIASES.map(el => `${getPrefix(repoUrl)}${el}`);
}

/** Converts list of stack items into list of dropdown option items. */
export function stacksToDropdownList(
  stackList: StackItem[],
): DropdownListItem[] {
  return stackList.map(({ name: label, uid: value }) => ({
    label,
    value,
  }));
}

/** Converts list of vercel project items into list of dropdown option items. */
export function projectsToDropdownList(
  projectItems: VercelProjectItem[],
): DropdownListItem[] {
  return projectItems.map(({ name: label, id: value }) => ({
    label,
    value,
  }));
}

/** Converts string array into list of dropdown option items. */
export function stringsToDropdownList(strings: string[]): DropdownListItem[] {
  if (!strings || !Array.isArray(strings) || strings.length === 0) return [];
  return strings.map(item => ({
    label: item,
    value: item,
  }));
}

/** Returns true of vercel integration item is populated. */
export function isEmptyIntegrationItemFilter(
  item: VercelIntegrationItem,
): boolean {
  return !Object.values(item).some(val => !val);
}

/** Returns true if obj is empty. */
export function isEmptyObject(obj: { [index: string]: string }): boolean {
  return !Object.keys(obj).length;
}

export function locationToRegion(location: "NA" | string | keyof typeof Region) {
  return location === "NA" ? Region["US"] : Region[location];
}
