export async function updateOrCreateEnvs({ envs, projectId, config }) {
  const ctx = { accessToken: config.accessToken, teamId: config.teamId };
  const { envs: projectEnvs } = await getEnvs({ id: projectId, ...ctx });

  await Promise.all(
    envs.map(async payload => {
      const env = projectEnvs.find(data => data.key === payload.key);

      if (env) {
        if (env.value !== payload.value) {
          await updateEnv({ projectId, envId: env.id, ...ctx }, payload);
        }
      } else {
        await createEnv({ projectId, ...ctx }, payload);
      }
    }),
  );
}

async function getEnvs({ id, accessToken, teamId }) {
  const res = await fetch(
    `${process.env.REACT_APP_VERCEL_DOMAIN}/v8/projects/${id}/env${
      teamId ? `?teamId=${teamId}` : ''
    }`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `Could not retrieve environment variables: ${
        res.status
      } json=${JSON.stringify(data)}`,
    );
  }

  return data;
}

async function updateEnv({ envId, projectId, accessToken, teamId }, payload) {
  const res = await fetch(
    `${
      process.env.REACT_APP_VERCEL_DOMAIN
    }/v8/projects/${projectId}/env/${envId}${
      teamId ? `?teamId=${teamId}` : ''
    }`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `Could not update environment variable: ${
        res.status
      } json=${JSON.stringify(data)}`,
    );
  }

  return data;
}

async function createEnv({ projectId, accessToken, teamId }, payload) {
  const res = await fetch(
    `${process.env.REACT_APP_VERCEL_DOMAIN}/v8/projects/${projectId}/env${
      teamId ? `?teamId=${teamId}` : ''
    }`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `Could not create environment variable: ${
        res.status
      } json=${JSON.stringify(data)}`,
    );
  }

  return data;
}
