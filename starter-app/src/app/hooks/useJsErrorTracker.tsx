import { datadogRum } from "@datadog/browser-rum";

export const addMetadata = (key: string, value: string | any) => {
  //sending meta data to datadogrum
  datadogRum.setGlobalContextProperty(key, value);
};
export const trackError = (error: any) => {
  //add error in datadog rum
  datadogRum.addError(error);
};
