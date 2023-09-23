import { useEffect, useMemo, useState } from 'react';
import {
  projectsToDropdownList,
  stacksToDropdownList,
} from '../../common/utils';
import {
  VercelProjectItem,
  VercelIntegrationItem,
  StackItem,
  LoadingState,
} from '../../common/types';
import { getAddButton, getEnvListInit, rowMemoInit } from './constants';
import { fetchEnvs, VercelIntegrationConfig } from '../../helper/vercel';

/** PropTypes of Projects component. */
export interface LandingPageProjectsProps {
  state: string;
  remainingProjectsCount: number;
  vercelProjects: VercelProjectItem[];
  addedIntegrations: VercelIntegrationItem[];
  stackItems: StackItem[];
  addRowFunc: () => void;
  deleteRowFunc: (rowIndex: number) => void;
  updateIntegrationItemFunc: (
    itemPatch: Partial<VercelIntegrationItem>,
    rowIndex: number,
  ) => void;
  loadingState: LoadingState;
  vercelIntegrationConfig: VercelIntegrationConfig | undefined;
}

const Projects = ({
  state,
  addedIntegrations,
  vercelProjects,
  remainingProjectsCount,
  stackItems,
  addRowFunc,
  deleteRowFunc,
  updateIntegrationItemFunc,
  vercelIntegrationConfig,
}: LandingPageProjectsProps) => {
  const [rows, setRows] = useState<JSX.Element[]>([]);

  const stackListItems = useMemo(
    () => stacksToDropdownList(stackItems),
    [stackItems],
  );
  const projectListItems = useMemo(
    () => projectsToDropdownList(vercelProjects),
    [vercelProjects],
  );

  const getEnvList = useMemo(
    () => getEnvListInit(state, stackItems, fetchEnvs),
    [state, stackItems],
  );
  const getIntegrationRow = useMemo(
    () =>
      rowMemoInit(
        updateIntegrationItemFunc,
        projectListItems,
        stackListItems,
        getEnvList,
        deleteRowFunc,
        vercelIntegrationConfig,
      ),
    [
      updateIntegrationItemFunc,
      projectListItems,
      stackListItems,
      getEnvList,
      deleteRowFunc,
      vercelIntegrationConfig,
    ],
  );
  const AddIntegrationBtn = useMemo(
    () => getAddButton(addRowFunc, remainingProjectsCount),
    [addRowFunc, remainingProjectsCount],
  );
  useEffect(() => {
    Promise.allSettled(
      addedIntegrations.map(
        async (source: VercelIntegrationItem, rowIndex) =>
          await getIntegrationRow(rowIndex, source),
      ),
    ).then((asyncUpdatedRows: PromiseSettledResult<JSX.Element>[]) => {
      const fulfilledPromises = asyncUpdatedRows.filter(
        ({ status }) => status === 'fulfilled',
      ) as PromiseFulfilledResult<JSX.Element>[];

      setRows(fulfilledPromises.map(({ value }) => value));
    });
  }, [addedIntegrations, getIntegrationRow]);
  return (
    <div className="projects">
      {rows}
      {AddIntegrationBtn}
    </div>
  );
};

export default Projects;
