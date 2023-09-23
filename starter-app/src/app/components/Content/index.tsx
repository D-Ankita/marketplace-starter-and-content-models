import { useCallback, useEffect, useState } from "react";
import { ImportStack } from "../ImportStack";
import { DeployButton } from "../DeployButton";
import { ReactComponent as PublishIcon } from "../../assets/publish-icon.svg";
import "./style.scss";
import "./animation.scss";
import { addMetadata } from "app/hooks/useJsErrorTracker";
import { trackEvent, setGlobalData, setUserId } from "app/helper/analytics";
import { USER_UID_SESSION_PARAMETER, alertUserBeforeUnload } from "../../common/constants";
import { getEnvVariables } from "../../helper/vercel";
import { Accordion, VerticalStepper } from "@contentstack/venus-components";
import { CSSTransition } from "react-transition-group";

import { LaunchDetails } from "../LaunchDetails";
import { VercelDetails } from "../VercelDetails";
import { useDeployPlatform } from "app/hooks/useLaunch";
import { locationToRegion } from "app/common/utils";

export const Content = () => {
  const [apiKey, setApiKey] = useState<string>();
  const [, setToken] = useState<string>();
  const [environment, setEnvironment] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [details, setDetails] = useState({});
  const [stackDetails, setStackDetails] = useState({});
  const [status, setStatus] = useState<boolean>(false);
  const [stackUid, setStackUid] = useState<string | undefined>();
  const [deployStatus, setDeployStatus] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<any>({});
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);
  const [stepIndex, setStepIndex] = useState<0 | 1 | 2>(0);
  const [deployPlatform, setDeployPlatform] = useDeployPlatform();

  useEffect(() => {
    window.addEventListener("beforeunload", alertUserBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", alertUserBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (stepIndex === 2) {
      window.removeEventListener("beforeunload", alertUserBeforeUnload);
    }
  }, [stepIndex]);

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams);
    setSearchParams(params);
    setRegion(locationToRegion(searchParams?.location))

    if (window.location.href.indexOf("project-dashboard-url") >= 0) {
      if (window.opener) {
        window.opener.postMessage({ data: window.location.search }, "*");
        window.close();
      }
    }
    // meta data for error track js
    addMetadata("region", `${params?.location}`);
    addMetadata("organization", `${params?.orgUid}`);
    //sending error tracking metadata to Datadog RUM
  }, []);

  useEffect(() => {
    if (searchParams.state) {
      getEnvVariables(searchParams.state).then(({ userUid }) => {
        sessionStorage.setItem(USER_UID_SESSION_PARAMETER, userUid);
        if (window.location.href.indexOf("project-dashboard-url") === -1) {
          //setting userID for heap
          setUserId(userUid);
          setRegion(locationToRegion(searchParams?.location))
          // register global-data for heap
          setGlobalData({
            "Application Type": "Marketplace Starter",
            "Application Name": `${searchParams?.starterName} Starter`,
            Organization: `${searchParams?.orgUid}`,
          });
          //initiating process for heap
          trackEvent("Process Initiated");
        }
        addMetadata("user_uid", userUid);
      });
    }
  }, [searchParams]);

  const handelStepper = useCallback((stepName?: string) => {
    stepName === "import" ? setActiveStep(1) : stepName === "deploy" ? setActiveStep(2) : setActiveStep(0);
  }, []);

  const StepperComponents = [
    {
      id: "import-stack",
      title: () => "Import Starter to Stack",
      hideTabView: true,
      data: (
        <Accordion
          dashedLineVisibility="hidden"
          hasBackgroundColor
          isAccordionOpen={activeStep === 0}
          title={<h5>Import Starter to Stack</h5>}
          onTitleClick={handelStepper}
          preRender={true}
          className="import-stack-stepper"
          actionClassName="transition-import">
          <CSSTransition in={activeStep === 0} timeout={1000} classNames="transition">
            <ImportStack
              setApiKey={setApiKey}
              setToken={setToken}
              setEnvironment={setEnvironment}
              setStatus={setStatus}
              setStackUid={setStackUid}
              setNextStep={() => {
                setStepIndex(1);
                handelStepper("import");
              }}
              setStackDetails={setStackDetails}
              searchParams={searchParams}
            />
          </CSSTransition>
        </Accordion>
      ),
      status: activeStep === 0 ? "ACTIVE" : stepIndex > 0 ? "COMPLETED" : "DISABLED",
    },
    {
      id: "deploy",
      title: () => "Deploy",
      data: (
        <Accordion
          dashedLineVisibility="hidden"
          hasBackgroundColor
          isAccordionOpen={activeStep === 1}
          title={<h5>Deploy</h5>}
          onTitleClick={() => handelStepper("import")}
          preRender={true}
          className="deploy-vercel-stepper">
          <CSSTransition in={activeStep === 1} timeout={1000} classNames="transition">
            <DeployButton
              apiKey={apiKey}
              region={region}
              environment={environment}
              setDetails={setDetails}
              setStatus={(state: boolean) => {
                setStepIndex(2);
                setStatus(state);
                handelStepper("deploy");
              }}
              status={status}
              stackUid={stackUid}
              setDeployStatus={setDeployStatus}
              stackDetails={stackDetails}
              deployStatus={deployStatus}
              searchParams={searchParams}
            />
          </CSSTransition>
        </Accordion>
      ),
      status: activeStep === 1 ? "ACTIVE" : stepIndex > 1 ? "COMPLETED" : "DISABLED",
    },
    {
      id: "successful-deployment",
      title: () => "Setup Complete!",
      data: (
        <Accordion
          dashedLineVisibility="hidden"
          hasBackgroundColor
          isAccordionOpen={activeStep === 2}
          title={<h5>Setup Complete!</h5>}
          onTitleClick={() => handelStepper("deploy")}
          preRender={true}
          className="deployed-links-stepper">
          <CSSTransition in={activeStep === 2} timeout={1000} classNames="transition">
            {deployPlatform === "launch" ? (
              <LaunchDetails details={details} stackDetails={stackDetails} />
            ) : (
              <VercelDetails details={details} stackDetails={stackDetails} />
            )}
          </CSSTransition>
        </Accordion>
      ),
      status: activeStep === 2 ? "ACTIVE" : stepIndex === 2 ? "COMPLETED" : "DISABLED",
    },
  ] as any;

  return (
    <div className="content-wrapper">
      <div className="step-wrapper">
        <div className="step">
          <div>
            <div className="circle" style={{ right: "14px", bottom: "7px" }}>
              <PublishIcon />
            </div>
          </div>
          <div className="starter-intro">
            <h5>{searchParams && searchParams.starterName} Starter</h5>
            <p>
              Contentstack starters are designed to help beginners learn how to build websites using Contentstack. In
              this example, let's learn how to set up a starter website using {searchParams && searchParams.starterName}{" "}
              and Contentstack and then deploy it to Vercel.
            </p>
          </div>
        </div>
        <VerticalStepper
          className="step step-active vertical-steps"
          steps={StepperComponents}
          stepTitleClassName="flex-start"
          stepContentClassName="flex-start"
        />
      </div>
    </div>
  );
};
