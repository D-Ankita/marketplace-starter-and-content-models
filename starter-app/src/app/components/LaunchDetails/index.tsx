import { useEffect, useState } from "react";
import { Info, Icon, ClipBoard, Truncate } from "@contentstack/venus-components";
import { isEmptyObject } from "../../common/utils";
import { LaunchDeploymentCard } from "../LaunchDeploymentCard";



export const LaunchDetails = ({ details, stackDetails }) => {
  const [deploymentStatus, setDeploymentStatus] = useState<boolean>(false);
  const [launchRows, setLaunchRows] = useState<any>([]);
  const [gitRows, setGitRows] = useState<any>([]);

  let csRows = [
    {
      title: "Stack URL",
      content: (
        <>
          <a className="accordion-links" href={stackDetails?.stackUrl} target="_blank" rel="noreferrer">
            {/* @ts-ignore */}
            <Truncate>{stackDetails?.stackUrl} </Truncate>
          </a>
          <ClipBoard
            copyLabel="copy"
            copyText={stackDetails?.stackUrl}
            position="right"
            type="default"
            withArrow={false}>
            <Icon className="copy-links" icon="Copy"></Icon>
          </ClipBoard>
        </>
      ),
    },
  ];
  launchRows.length && csRows.push(launchRows[1]) && csRows.push(launchRows[0]);

  useEffect(() => {
    if (!isEmptyObject(details)) {
      setLaunchRows([
        {
          title: "Deployment Dashboard URL",
          content: (
            <>
              <a
                className="accordion-links"
                href={details["deployment-dashboard-url"]}
                target="_blank"
                rel="noreferrer">
                {/* @ts-ignore */}
                <Truncate>{details["deployment-dashboard-url"]}</Truncate>
              </a>
              <ClipBoard
                className="copy-links"
                copyLabel="copy"
                copyText={details["deployment-dashboard-url"]}
                position="right"
                type="default"
                withArrow={false}>
                <Icon className="copy-links" icon="Copy"></Icon>
              </ClipBoard>
            </>
          ),
        },
        {
          title: "Deployment URL",
          content: (
            <>
              <a className="accordion-links" href={details["deployment-url"]} target="_blank" rel="noreferrer">
                {/* @ts-ignore */}
                <Truncate>{details["deployment-url"]}</Truncate>
              </a>
              <ClipBoard
                className="copy-links"
                copyLabel="copy"
                copyText={details["deployment-url"]}
                position="right"
                type="default"
                withArrow={false}>
                <Icon className="copy-links" icon="Copy"></Icon>
              </ClipBoard>
            </>
          ),
        },
        {
          title: "Project Dashboard URL",
          content: (
            <>
              <a className="accordion-links" href={details["project-dashboard-url"]} target="_blank" rel="noreferrer">
                {/* @ts-ignore */}
                <Truncate>{details["project-dashboard-url"]}</Truncate>
              </a>
              <ClipBoard
                className="copy-links"
                copyLabel="copy"
                copyText={details["project-dashboard-url"]}
                position="right"
                type="default"
                withArrow={false}>
                <Icon className="copy-links" icon="Copy"></Icon>
              </ClipBoard>
            </>
          ),
        },
      ]);
      setGitRows([
        {
          title: "Repository URL",
          content: (
            <>
              <a className="accordion-links" href={details["repository-url"]} target="_blank" rel="noreferrer">
                {/* @ts-ignore */}
                <Truncate>{details["repository-url"]}</Truncate>
              </a>
              <ClipBoard
                className="copy-links"
                copyLabel="copy"
                copyText={details["repository-url"]}
                position="right"
                type="default"
                withArrow={false}>
                <Icon className="copy-links" icon="Copy"></Icon>
              </ClipBoard>
            </>
          ),
        },
      ]);
      setDeploymentStatus(true);
    }
  }, [details]);

  return (
    <div>
      {!deploymentStatus ? (
        <>
          <p className="form-p-description">Starter app setup is completed. Navigate to the links given below.</p>
          <div className="form">
            <div className="form-content starterDeployed">
              <p>We will share some links that will be helpful for you.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>The starter setup is completed.</p>
          <div className="form">
            <Info
              icon={<Icon icon="Success" />}
              content="The starter is successfully installed. Navigate to the links given below."
              type="success"
            />
          </div>
          <LaunchDeploymentCard
            rows={[
              [
                {
                  title: "Stack Name",
                  content: stackDetails?.stack,
                },
              ],
              csRows,
            ]}
            cardName="Contentstack"
            cardLogo="CSLogo"
            buttonDetails={[
              {
                url: !isEmptyObject(details) && details["deployment-url"],
                type: "primary",
                iconFirst: true,
                iconName: "Global",
                iconSize: "mini",
                className: "stack-link",
                innerText: "View Website",
              },
              {
                url: stackDetails.stackUrl,
                type: "secondary",
                iconFirst: false,
                iconName: "NewTab",
                iconSize: "mini",
                className: "external-Links-1",
                innerText: "Open Stack",
              },
            ]}
          />
          <LaunchDeploymentCard
            rows={[
              [
                {
                  title: "Project Name",
                  content: details["project-name"],
                },
              ],
              launchRows,
            ]}
            cardName="Launch"
            cardLogo="LaunchLogo"
            buttonDetails={[
              {
                url: !isEmptyObject(details) && details["deployment-url"],
                type: "primary",
                iconFirst: true,
                iconSize: "mini",
                customIcon: "launch",
                className: "stack-link",
                innerText: "Open Launch Project",
              },
            ]}
          />
          <LaunchDeploymentCard
            rows={[
              [
                {
                  title: "Repo Name",
                  content: details["project-name"],
                },
                gitRows[0],
              ],
            ]}
            cardName="Git Repo"
            cardLogo="GitHubLogo"
            buttonDetails={[
              {
                url: !isEmptyObject(details) && details["repository-url"],
                type: "primary",
                iconFirst: true,
                iconSize: "mini",
                customIcon: "github",
                className: "stack-link",
                innerText: "View Repository",
              },
            ]}
          />
        </>
      )}
    </div>
  );
};
