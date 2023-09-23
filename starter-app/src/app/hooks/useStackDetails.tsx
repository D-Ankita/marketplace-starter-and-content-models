import { useAtom, atom } from "jotai";

const stackDetails = atom<any>({});
export const useStackDetails = () => {
  return useAtom(stackDetails);
};
const stackList = atom<any>([]);
export const useStackList = () => {
  return useAtom(stackList);
};
const stackName = atom<any>({});
export const useStackName = () => {
  return useAtom(stackName);
};

const logger = atom<any>(false);
export const useLogger = () => {
  return useAtom(logger);
};

const channelId = atom<any>(null);
export const useChannelId = () => {
  return useAtom(channelId);
};

const environment = atom<any>(null);
export const useEnvironment = () => {
  return useAtom(environment);
};
