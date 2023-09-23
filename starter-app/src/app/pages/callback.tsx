import { useState, useEffect } from 'react';
import VercelUICallback from '../components/Vercel';
import AppLoader from '../components/Vercel/AppLoader';
import { VercelProjectItem } from '../common/types';
import {
  fetchVercelIntegrationConfig,
  fetchVercelProjects,
  VercelIntegrationConfig,
} from '../helper/vercel';
import { updateOrCreateEnvs } from '../helper/create-env';
import { getVercelEnvKeys } from '../common/utils';
import { addMetadata, trackError } from 'app/hooks/useJsErrorTracker';
import { STARTER_LIVE_PREVIEW_STATE } from '../common/constants';
/** URI params used by Callback component. */
interface UiVercelParams {
  next: string;
  state?: string;
  orgUid?: string;
  location?: string;
  'external-id'?: string;
}

/** encoded URI param used for custom set of extra parameters, used by Callback component. */
interface ExternalIdParams {
  apiKey: string;
  token: string;
  environment: string;
  region:string;
  apiHost: string;
  repoUrl: string;
  appHost: string;
  managementToken: string;
}

const Callback = () => {
  const [externalIdParams, setExternalIdParams] = useState<ExternalIdParams>();
  const [vercelIntegrationConfig, setVercelIntegrationConfig] =
    useState<VercelIntegrationConfig>();
  const [projects, setProjects] = useState<VercelProjectItem[]>([]);

  let urlParams = new URLSearchParams(window.location.search);
  let params: UiVercelParams = Object.fromEntries(
    urlParams,
  ) as unknown as UiVercelParams;
  const {
    next,
    'external-id': externalId,
    state,
    orgUid,
  } = params as UiVercelParams;
  if (!externalIdParams && params['external-id']) {
    const [
      apiKey,
      token,
      environment,
      region,
      apiHost,
      repoUrl,
      appHost,
      managementToken,
    ] = params['external-id'].split(',') as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ];
    setExternalIdParams({
      apiKey,
      token,
      environment,
      region,
      apiHost,
      repoUrl,
      appHost,
      managementToken,
    });
  }

  useEffect(() => {
    //adding error tracker meta data
    // @ts-ignore
    addMetadata('region', params?.location);
    // @ts-ignore
    addMetadata('organization', params?.orgUid);
    //sending error tracking metadata to Datadog RUM
  }, [params?.location, params?.orgUid]);

  useEffect(() => {
    // either state or code should be populated, not both.
    if (state && next) {
      //get vercel integration auth data.
      fetchVercelIntegrationConfig(state)
        .then(vercelIntegrationConfig => {
          setVercelIntegrationConfig(vercelIntegrationConfig);
          const { accessToken, teamId } = vercelIntegrationConfig;

          return fetchVercelProjects(accessToken, teamId).then(
            ({ projects }: any) => {
              setProjects(projects);
            },
          );
        })
        .catch(err => {
          trackError(err);
        });
    }
  }, [state, next]);

  useEffect(() => {
    if (projects.length && vercelIntegrationConfig && externalIdParams) {
      const { accessToken, teamId, userId } = vercelIntegrationConfig;
      const {
        repoUrl,
        environment,
        region,
        apiKey,
        apiHost,
        token,
        appHost,
        managementToken,
      } = externalIdParams;
      const envKeys = getVercelEnvKeys(repoUrl!);
      updateOrCreateEnvs({
        projectId: projects[0].id,
        config: { accessToken, teamId, userId },
        envs: [
          token,
          apiKey,
          environment,
          region,
          apiHost,
          appHost,
          managementToken,
          STARTER_LIVE_PREVIEW_STATE,
        ].map((value, i) => ({
          type: 'encrypted',
          key: envKeys[i],
          value: (value || '').toString(),
          target: ['development', 'preview', 'production'],
        })),
      })
        .then(() => {
          window.location.href = next;
        })
        .catch(err => {
          trackError(err);

        });
    }
  }, [projects, vercelIntegrationConfig, externalIdParams, next]);

  return externalId ? (
    <AppLoader />
  ) : (
    <VercelUICallback params={{ orgUid, state }} />
  );
};

export default Callback;
