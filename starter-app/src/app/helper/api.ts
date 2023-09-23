import { SeederStartResponse } from "../common/types";
import http from "./http";
const { REACT_APP_VERCEL_DOMAIN, REACT_APP_BASE_URL } = process.env;

export const seederStart = async (data, searchParams): Promise<SeederStartResponse | unknown> => {
  try {
    const body = {};
    //WHY IS THIS ORG UID CONDITION APPLIED HERE
    if (searchParams.orgUid && searchParams.location) {
      Object.assign(body, {
        seedTemplate: "starterApp",
        newStack: true,
        stackName: data.stack,
        environment: "development",
        orgUid: searchParams.orgUid,
        location: searchParams.location,
      });
    } else {
      Object.assign(body, {
        seedTemplate: "starterApp",
        newStack: true,
        stackName: data.stack,
        environment: "development",
      });
    }

    return await http({
      method: "POST",
      url: `/api/seeder/start`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    });
  } catch (error: unknown) {
    console.error(error);
    return error;
  }
};

export const validate = async (data, searchParams) => {
  try {
    const body = {};
    if (searchParams.orgUid) {
      Object.assign(body, {
        newStack: false,
        seedTemplate: "starterApp",
        orgUid: searchParams.orgUid,
        stackName: data.name,
        environment: "development",
        location: "NA",
        stackApiKey: data.api_key,
      });
    } else {
      Object.assign(body, {
        newStack: false,
        seedTemplate: "starterApp",
        stackName: data.name,
        environment: "development",
        location: "NA",
        stackApiKey: data.api_key,
      });
    }

    return await http({
      method: "POST",
      url: `${REACT_APP_BASE_URL}/content-models/validate`,
      headers: {
        "Content-Type": "application/json",

      },
      data: JSON.stringify(body),
    });
  } catch (error: unknown) {
    return error;
  }
};

export const importContentModel = async (data, correctionsArray, allData, searchParams) => {
  try {
    const body = {
      newStack: false,
      seedTemplate: "starterApp",
      orgUid: searchParams.orgUid,
      stackName: data.name,
      environment: "development",
      location: "NA",
      stackApiKey: data.api_key,
      corrections: correctionsArray,
      allData: allData,
    };
    return await http({
      method: "POST",
      url: `${REACT_APP_BASE_URL}/content-models/import`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    });
  } catch (error: unknown) {
    return error;
  }
};
