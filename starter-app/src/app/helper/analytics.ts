interface SuperProps {
  "Application Type": string;
  "Application Name": string;
  Organization: string;
}

declare global {
  interface Window {
    heap: any;
  }
}

export const trackEvent = (event: string, eventData: any = {}) => {
  if (window?.heap) {
    window.heap.track(event, eventData);
  }
};

export const setGlobalData = (properties: SuperProps) => {
  if (window?.heap) window.heap.addEventProperties(properties);
};

export const setUserId = (userId: string) => {
  if (window?.heap) window.heap.identify(userId);
};
