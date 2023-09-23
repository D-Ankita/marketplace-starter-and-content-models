import { useAtom, atom } from "jotai";

const deployPlatform = atom<"vercel" | "launch" | undefined>(undefined);
export const useDeployPlatform = () => {
  return useAtom(deployPlatform);
};
