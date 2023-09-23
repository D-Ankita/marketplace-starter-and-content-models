import { StackItem, VercelIntegrationItem } from "../common/types";
const { REACT_APP_VERCEL_DOMAIN, REACT_APP_BASE_URL } = process.env;

/** Vercel API config interface (credentials and API URLs). */
export interface EnvVariables {
  accessToken: string;
  appHost: string;
  apiHost: string;
  location: string;
  orgId: string;
  datacenter?: string;
  // Below values are available only if request has environment, stackUid, orgId parameters.
  apiKey?: string;
  deliveryToken?: string;
  environment?: string;
  region: string;
  userUid: string;
  managementToken?: string;
}

/** Seeder API datacenter item. */
export interface DatacenterItem {
  title: string;
  value: string;
  host: string;
}

/** Vercel integration credentials. */
export interface VercelIntegrationConfig {
  accessToken: string;
  installationId: string;
  userId: string;
  teamId: string | null;
  configurationId?: string;
  next?: string;
}

const StackRoles = ["Admin", "Developer", "Owner"] as const;
type StackRole = (typeof StackRoles)[number];

interface FetchStackOptions {
  roles?: StackRole[];
}

/** Returns list of vercel project items. */
export const fetchVercelProjects = async (
  accessToken: string,
  teamId: string | null = "",
  paginationToken?: string
) => {
  try {
    let uriParams = teamId ? `teamId=${teamId}` : "";
    uriParams = paginationToken ? uriParams + `&until=${paginationToken}` : uriParams;

    return fetch(`${REACT_APP_VERCEL_DOMAIN}/v9/projects?${uriParams}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(({ projects, pagination }) => {
        return { projects, pagination };
      });
  } catch (err) {
    return [];
  }
};

/** Returns list of stack items. */
export const fetchStacks = async (state: string, options?: FetchStackOptions): Promise<StackItem[]> => {
  try {
    return fetch(
      `${REACT_APP_BASE_URL}/stack?state=${state}${options?.roles?.length ? `&roles=${options.roles.join(",")}` : ""}`
    ).then((res) => res.json());
  } catch (error) {
    return [];
  }
};

/** Returns list of stack environment items. */
export const fetchEnvs = async (stackUid: string, state: string): Promise<string[]> => {
  try {
    const result = await fetch(`${REACT_APP_BASE_URL}/stack/environments/${stackUid}?state=${state}`, {
      method: "GET",
    });

    if (!result.ok) {
      return [];
    }
    return await result.json();
  } catch (e) {
    return [];
  }
};

/** Returns list of datacenter items. */
export const fetchDataCenter = async (): Promise<DatacenterItem[]> => {
  try {
    return fetch(`${REACT_APP_BASE_URL}/datacenters`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (e) {
    return [];
  }
};

/** Returns seeder env variables. */
export const getEnvVariables = async (
  state: string,
  stack?: string,
  environment?: string,
  orgId?: string
): Promise<EnvVariables> => {
  const uriParamsList = [stack, environment, orgId].some((el) => !el)
    ? { state }
    : { state, stack, environment, orgId };
  const uriParams = Object.keys(uriParamsList).reduce((res, key) => `${res}&${key}=${uriParamsList[key]}`, "?");

  return fetch(`${REACT_APP_BASE_URL}/vercel/environment-variables${uriParams}`).then((res) => res.json());
};

/** Returns vercel integration variables from seeder API. */
export async function fetchVercelIntegrationConfig(state: string): Promise<VercelIntegrationConfig> {
  const result = await fetch(`${REACT_APP_BASE_URL}/vercel/accesstoken?state=${state}`, { method: "GET" });

  return await result.json();
}

/** Returns vercel integration configuration from seeder API. */
export async function getVercelIntegrationConfig(state: string, configId: string): Promise<VercelIntegrationItem[]> {
  const result = await fetch(
    `${REACT_APP_BASE_URL}/vercel/vercel-integration-items?state=${state}&configurationId=${configId}`,
    { method: "GET" }
  );

  return await result.json();
}

/** Sets the vercel integration configuration to secret storage using seeder service. */
export const saveVercelIntegrationConfig = async (
  state: string,
  configId: string,
  payload: VercelIntegrationItem[]
) => {
  const res = await fetch(
    `${REACT_APP_BASE_URL}/vercel/vercel-integration-items?state=${state}&configurationId=${configId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();

  if (!data.ok) {
    throw new Error(`Could not set the Vercel configuration info: ${res.status} json=${JSON.stringify(data)}`);
  }

  return data;
};
