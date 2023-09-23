import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@contentstack/venus-components";
import AppLoader from "./AppLoader";
import AppHeader from "./AppHeader";
import LandingPageHeader from "./LandingPageHeader";
import LandingPageProjects, { LandingPageProjectsProps } from "./LandingPageProjects";
import "./styles.scss";
import { LoadingState, VercelIntegrationItem, VercelProjectItem } from "../../common/types";
import {
  EnvVariables,
  fetchStacks,
  fetchVercelIntegrationConfig,
  fetchVercelProjects,
  getEnvVariables,
  VercelIntegrationConfig,
  getVercelIntegrationConfig,
  saveVercelIntegrationConfig,
} from "../../helper/vercel";
import { getVercelEnvKeys, isEmptyIntegrationItemFilter } from "../../common/utils";
import { updateOrCreateEnvs } from "../../helper/create-env";
import { USER_UID_SESSION_PARAMETER, STARTER_LIVE_PREVIEW_STATE, alertUserBeforeUnload } from "../../common/constants";
import { FullPageLoader } from "@contentstack/venus-components";

const LandingPage = ({ params }) => {
  const { orgUid, state } = params;
  const [stackItems, setStacks] = useState<any[]>([]);
  const [envVariables, setEnvVariables] = useState<EnvVariables>();
  const [vercelIntegrationConfig, setVercelIntegrationConfig] = useState<VercelIntegrationConfig>();
  const [vercelProjects, setVercelProjects] = useState<VercelProjectItem[]>([]);
  const [error, setError] = useState<string>("");
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.LOADING);
  const [configureIntegrationCase, setConfigureIntegrationCase] = useState<boolean>(false);
  const [addedIntegrations, setAddedIntegrations] = useState<VercelIntegrationItem[]>([
    { project: null, stack: null, environment: null },
  ]);
  const remainingProjectsCount = useMemo(
    () => vercelProjects.length - addedIntegrations.length,
    [vercelProjects.length, addedIntegrations.length]
  );
  const updateIntegrationItemFunc = useCallback(
    (patch: Partial<VercelIntegrationItem>, rowIndex) => {
      const patchedIntegration = { ...patch };

      if (patch.stack || patch.stack === null || patch.environment || patch.environment === null) {
        Object.assign(patchedIntegration, {
          project: addedIntegrations[rowIndex].project,
        });
      }

      if (patch.environment || patch.environment === null) {
        Object.assign(patchedIntegration, {
          stack: addedIntegrations[rowIndex].stack,
        });
      }

      if (patch.project || patch.project === null) {
        Object.assign(patchedIntegration, {
          stack: addedIntegrations[rowIndex].stack,
          environment: addedIntegrations[rowIndex].environment,
        });
      }

      setAddedIntegrations([
        ...addedIntegrations.slice(0, rowIndex),
        patchedIntegration as VercelIntegrationItem,
        ...addedIntegrations.slice(rowIndex + 1),
      ]);
    },
    [addedIntegrations, setAddedIntegrations]
  );
  const addRowFunc = useCallback(() => {
    setAddedIntegrations([...addedIntegrations, { project: null, stack: null, environment: null }]);
  }, [addedIntegrations, setAddedIntegrations]);
  const deleteRowFunc = useCallback(
    (rowIndex) => {
      setAddedIntegrations([...addedIntegrations.slice(0, rowIndex), ...addedIntegrations.slice(rowIndex + 1)]);
    },
    [addedIntegrations, setAddedIntegrations]
  );
  const handleAddIntegration = useCallback(() => {
    setLoadingState(LoadingState.SUBMITTING);
  }, []);
  const landingPageProjectsProps: LandingPageProjectsProps = useMemo(
    () => ({
      state,
      addedIntegrations,
      vercelProjects,
      remainingProjectsCount,
      stackItems,
      addRowFunc,
      deleteRowFunc,
      updateIntegrationItemFunc,
      loadingState,
      vercelIntegrationConfig,
    }),
    [
      state,
      addedIntegrations,
      vercelProjects,
      remainingProjectsCount,
      stackItems,
      addRowFunc,
      deleteRowFunc,
      updateIntegrationItemFunc,
      loadingState,
      vercelIntegrationConfig,
    ]
  );

  useEffect(() => {
    if (state) {
      //get vercel integration auth data and env variables.
      Promise.all([fetchVercelIntegrationConfig(state), getEnvVariables(state)]).then(
        ([vercelIntegrationConfig, envVars]) => {
          setVercelIntegrationConfig(vercelIntegrationConfig);
          setEnvVariables(envVars);

          sessionStorage.setItem(USER_UID_SESSION_PARAMETER, envVars.userUid);

          // After env config and vercel config loaded,
          if (![vercelIntegrationConfig, envVars, state].some((el) => !el)) {
            const { accessToken, teamId, configurationId } = vercelIntegrationConfig!;

            Promise.all([
              // 1. Fetching stacks.
              fetchStacks(state, { roles: ["Admin", "Developer", "Owner"] }),
              // 2. Fetching vercel projects.
              fetchVercelProjects(accessToken, teamId),
              // 3. Fetching vercel integration configuration
              configurationId ? getVercelIntegrationConfig(state, configurationId) : Promise.resolve([]),
            ])
              .then(([stackItems, { projects }, vercelConfigInfo]: any) => {
                setStacks(stackItems);
                setVercelProjects(projects as VercelProjectItem[]);
                if (vercelConfigInfo.length) {
                  setAddedIntegrations([...vercelConfigInfo]);
                  setConfigureIntegrationCase(true);
                }
                setLoadingState(LoadingState.LOADED);
              })
              .catch((promises) => {
                const errorText = promises.filter
                  ? promises
                      .filter(({ state }) => state === "rejected")
                      .map(({ reason }) => reason)
                      .join(". ")
                  : promises;
                setError(errorText);
                setLoadingState(LoadingState.LOADED);
              });
          }
        }
      );
    }
  }, [state]);

  useEffect(() => {
    if (loadingState === LoadingState.SUBMITTING && vercelIntegrationConfig && envVariables && state) {
      const { accessToken, teamId, userId } = vercelIntegrationConfig!;
      const { apiHost } = envVariables!;
      const envKeys = getVercelEnvKeys();
      const nonEmptyIntegrations = addedIntegrations.filter(isEmptyIntegrationItemFilter);
      Promise.all(
        nonEmptyIntegrations.map(({ stack: stackUid, environment }) =>
          getEnvVariables(state, stackUid!, environment!, envVariables?.orgId)
        )
      )
        .then((res) =>
          Promise.all(
            res.map((resItem, index) => {
              const { apiKey, deliveryToken, environment, region, appHost, managementToken } = resItem;
              const { project: projectId } = nonEmptyIntegrations[index];

              return updateOrCreateEnvs({
                projectId,
                config: { accessToken, teamId, userId },
                envs: [
                  deliveryToken,
                  apiKey,
                  environment,
                  region,
                  apiHost,
                  appHost,
                  managementToken,
                  STARTER_LIVE_PREVIEW_STATE,
                ].map((value, i) => ({
                  type: "encrypted",
                  key: envKeys[i],
                  value: (value || "").toString(),
                  target: ["development", "preview", "production"],
                })),
              });
            })
          )
        )
        .then(() =>
          vercelIntegrationConfig.configurationId
            ? saveVercelIntegrationConfig(state, vercelIntegrationConfig.configurationId, nonEmptyIntegrations)
            : Promise.resolve()
        )
        .then(() => {
          if (vercelIntegrationConfig.next) {
            window.removeEventListener("beforeunload", alertUserBeforeUnload);
            window.location.href = vercelIntegrationConfig.next;
          } else {
            window.removeEventListener("beforeunload", alertUserBeforeUnload);
            const windowInstance = window.open("about:blank", "_self");

            windowInstance?.close();
          }
        });
    }
  }, [loadingState, addedIntegrations, envVariables, state, vercelIntegrationConfig]);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUserBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", alertUserBeforeUnload);
    };
  }, []);

  const isErrorOccurred = error && !stackItems.length;

  return !orgUid ? (
    <AppLoader />
  ) : (
    <>
      {loadingState === LoadingState.SUBMITTING ? (
        <FullPageLoader resourceName={"Vercel integration"} />
      ) : (
        <div className="vercel-ui-wrapper">
          <AppHeader />
          <div className="landing-page">
            <LandingPageHeader />
            {loadingState !== LoadingState.LOADED ? (
              "loading..."
            ) : (
              <div className="projects-wrapper">
                {isErrorOccurred && <span className={"error-message"}>{error}</span>}
                <LandingPageProjects {...landingPageProjectsProps} />
                <div className="projects-footer">
                  <Button
                    onClick={handleAddIntegration}
                    disabled={!addedIntegrations.length}
                    buttonType="primary"
                    icon={configureIntegrationCase ? "" : "AddPlus"}
                    isLoading={false}>
                    {configureIntegrationCase ? "Save Integration" : "Add Integration"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
