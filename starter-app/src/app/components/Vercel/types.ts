import {VercelIntegrationItem} from "../../common/types";

/** Enum of dropdown purposes on vercel integration form. */
export enum DropdownPurpose {
  PROJECT,
  STACK,
  ENV,
}

/** Interface for binding vercel integration item data to appropriate dropdown row
 * in Vercel Integration form. Its required for memorizing JSX elements and avoidance of
 * redundant re-rendering. */
export interface LandingProjectDropdownItem {
  source: VercelIntegrationItem;
  component: JSX.Element;
}
