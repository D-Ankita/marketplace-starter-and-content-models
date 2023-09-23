/** Vercel project entity. */
export interface VercelProjectItem {
  name: string;
  id: string;
}

/** Vercel integration entity (vercel project + stack + stack env). */
export interface VercelIntegrationItem {
  project: string | null | undefined;
  stack: string | null | undefined;
  environment: string | null | undefined;
}

/** Stack entity.*/
export interface StackItem {
  name: string;
  uid: string;
}

/** Dropdown option. */
export interface DropdownListItem {
  label: string;
  value: string;
  [index: string]: string;
}

/** Form state. */
export enum LoadingState {
  LOADING,
  LOADED,
  SUBMITTING
}

/** Response of seeder/start call .*/
export interface SeederStartResponse {
  data: {
    stackUrl: string;
    apiHost: string;
    apiKey: string;
    deliveryToken: string;
    environment: string;
    id: string;
    userUid: string;
    stackUid: string;
  }
}

/** Before unload event. */
// @ts-ignore
export interface UnloadEvent extends Event {
  returnValue?: string;
}
