import { DropdownPurpose, LandingProjectDropdownItem } from './types';
import {
  Button,
  Icon,
  Select,
  AsyncSelect,
} from '@contentstack/venus-components';
import { DropdownListItem, VercelIntegrationItem } from '../../common/types';
import {
  stringsToDropdownList,
  projectsToDropdownList,
} from '../../common/utils';
import { fetchVercelProjects } from '../../helper/vercel';
import { StackItem } from '../../common/types';

/** Labels for dropdowns on Vercel integration form. */
export const DropdownLabels = {
  [DropdownPurpose.PROJECT]: 'Vercel Project',
  [DropdownPurpose.STACK]: 'Stack',
  [DropdownPurpose.ENV]: 'Environment',
};

/** Datasource key for dropdown selection. */
export const DropdownSourceKey = {
  [DropdownPurpose.PROJECT]: 'project',
  [DropdownPurpose.STACK]: 'stack',
  [DropdownPurpose.ENV]: 'environment',
};

/** Add integration item button. */
export const getAddButton = (
  addRowFunc: () => void,
  remainingProjectsCount: number,
): JSX.Element => (
  <Button
    onClick={addRowFunc}
    disabled={remainingProjectsCount <= 0}
    buttonType="secondary"
    icon="Plus"
  >{`Add another Vercel Project (${remainingProjectsCount} remaining)`}</Button>
);

/** Memoized initializer function for environment map (Stack <> Env list), which
 * requests envs of specific env if not requested previously or returns cached value otherwise. */
export function getEnvListInit(
  state: string,
  stackItems: StackItem[],
  fetchStackEnvironmentsFunc: (
    stack: string,
    state: string,
  ) => Promise<string[]>,
): (stackUid: string | null) => Promise<DropdownListItem[]> {
  const envMap = new Map<string, DropdownListItem[]>();

  return async (
    stackUid: string | null | undefined,
  ): Promise<DropdownListItem[]> => {
    if (!stackUid) {
      return [];
    }

    if (!envMap.has(stackUid)) {
      const stackData = stackItems.find(stack => stack.uid === stackUid);
      if (!stackData) envMap.set(stackUid, []);
      else
        envMap.set(
          stackUid,
          stringsToDropdownList(
            await fetchStackEnvironmentsFunc(stackUid, state),
          ),
        );
    }

    return envMap.get(stackUid)!;
  };
}

/** Memoized initializer function for Vercel integration item settings dropdown components, which
 * renders JSX components if props updated or returns cached value otherwise. */
export function rowMemoInit(
  updateIntegrationItemFunc: (
    itemPatch: Partial<VercelIntegrationItem>,
    rowIndex: number,
  ) => void,
  projectListItems: DropdownListItem[],
  stackListItems: DropdownListItem[],
  envListFunc: (stackUid: string | null) => Promise<DropdownListItem[]>,
  deleteRowFunc: (rowIndex: number) => void,
  vercelIntegrationConfig,
): (rowIndex: number, source: VercelIntegrationItem) => Promise<JSX.Element> {
  const optionsSource = {
    [DropdownPurpose.PROJECT]: projectListItems,
    [DropdownPurpose.STACK]: stackListItems,
    [DropdownPurpose.ENV]: envListFunc,
  };
  const memo = new Map<number, LandingProjectDropdownItem>();
  // Ensures whether source data of dropdown didn't change.
  const isSourceUpdated = (
    rowIndex: number,
    source: VercelIntegrationItem,
  ): boolean => {
    const { source: itemSource } = memo.get(rowIndex)!;
    return !Object.keys(source).some(key => itemSource[key] !== source[key]);
  };
  // Creates new dropdown row
  const createDropdownRow = async (
    source: VercelIntegrationItem,
    rowIndex: number,
  ): Promise<JSX.Element> => {
    let paginationToken;
    const divProps = {
      className: 'Dropdown-wrapper',
      key: `${rowIndex}-dropdown-integration-wrapper`,
    };
    const dropdowns = (
      (
        await Promise.allSettled(
          [
            DropdownPurpose.PROJECT,
            DropdownPurpose.STACK,
            DropdownPurpose.ENV,
          ].map(async purpose => {
            const options: DropdownListItem[] = (
              typeof optionsSource[purpose] === 'function'
                ? await (
                    optionsSource[purpose] as (
                      stackUid: string | null | undefined,
                    ) => Promise<DropdownListItem[]>
                  )(source.stack)
                : optionsSource[purpose]
            ) as DropdownListItem[];

            const dropdownProps = {
              key: `${divProps.key}--dropdown-${purpose.toString()}`,
              selectLabel: rowIndex === 0 ? DropdownLabels[purpose] : '',
              value: source[DropdownSourceKey[purpose]]
                ? options.find(
                    ({ value }) => value === source[DropdownSourceKey[purpose]],
                  )
                : null,
              onChange: item =>
                updateIntegrationItemFunc(
                  { [DropdownSourceKey[purpose]]: item ? item.value : null },
                  rowIndex,
                ),
              options: options,
              placeholder: `Choose ${DropdownLabels[purpose]}`,
              isClearable: true,
              isSearchable: true,
              isDisabled: false,
              hideSelectedOptions: true,
              noOptionsMessage: () => 'No labels created yet',
            };

            const loadMoreOptions: any = async () => {
              if (vercelIntegrationConfig) {
                const { accessToken, teamId } = vercelIntegrationConfig;
                const data: any = await fetchVercelProjects(
                  accessToken,
                  teamId,
                  paginationToken,
                );
                paginationToken = data.pagination.next;

                let options = projectsToDropdownList(data.projects);

                return {
                  options: options,
                  hasMore: data.pagination.next !== null,
                };
              }
            };

            return DropdownLabels[purpose] === 'Vercel Project' ? (
              <AsyncSelect
                width={'200px'}
                loadMoreOptions={loadMoreOptions}
                {...dropdownProps}
              />
            ) : (
              <Select {...dropdownProps} />
            );
          }),
        )
      ).filter(
        ({ status }) => status === 'fulfilled',
      ) as PromiseFulfilledResult<JSX.Element>[]
    ).map(({ value }) => value);

    return (
      <div {...divProps}>
        {dropdowns}
        {rowIndex > 0 && (
          <div>
            <Icon
              icon={'DeleteSmall'}
              onClick={() => deleteRowFunc(rowIndex)}
            />
          </div>
        )}
      </div>
    );
  };

  return async (
    rowIndex: number,
    source: VercelIntegrationItem,
  ): Promise<JSX.Element> => {
    if (!memo.has(rowIndex) || isSourceUpdated(rowIndex, source)) {
      memo.set(rowIndex, {
        source,
        component: await createDropdownRow(source, rowIndex),
      });
    }

    return new Promise(resolve => resolve(memo.get(rowIndex)!.component));
  };
}
