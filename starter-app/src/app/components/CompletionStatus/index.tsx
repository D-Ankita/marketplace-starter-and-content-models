import { Icon, Info } from "@contentstack/venus-components";
import { useStackDetails } from "app/hooks/useStackDetails";
import { DeploymentLinksCard } from "../DeploymentCards";
const CompletionStatus = () => {
  const stackDetails = useStackDetails();
  const contentModelDashboardUrl = stackDetails[0]?.stackUrl?.replace("/dashboard", "/content-types");
  return (
    <>
      <div className="form">
        {contentModelDashboardUrl ? (
          <Info
            icon={<Icon icon="Success" />}
            content="The content model was imported successfully. Navigate to the respective stack."
            type="success"
          />
        ) : (
          <Info
            icon={<Icon icon="InfoLight" />}
            content="The Content Models import is still in progress. Please wait.. "
            type={"light"}
          />
        )}
      </div>
      {contentModelDashboardUrl ? (
        <DeploymentLinksCard
          rows={[
            [
              {
                title: "Stack Name",
                content: stackDetails[0]?.name,
              },
            ],
          ]}
          cardName="Contentstack"
          cardLogo="CSLogo"
          buttonDetails={[
            {
              url: contentModelDashboardUrl,
              type: "secondary",
              iconFirst: false,
              iconName: "NewTab",
              iconSize: "mini",
              className: "external-Links-1",
              innerText: "View Content Models",
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default CompletionStatus;
