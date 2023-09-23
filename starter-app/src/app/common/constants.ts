import { UnloadEvent } from './types';

/** Parameter name to store user_uid in session storage.*/
export const USER_UID_SESSION_PARAMETER = 'user_uid';

/** Starter live preview flag to set in vercel environment variables.*/
export const STARTER_LIVE_PREVIEW_STATE = true;

/** Before unload event handler. */
export const alertUserBeforeUnload = (e:UnloadEvent) => {
  e.preventDefault();
  e.returnValue = 'Are you sure you want to close?'
  return e.returnValue;
}
