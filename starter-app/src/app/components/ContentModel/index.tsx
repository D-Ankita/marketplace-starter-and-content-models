import "./style.scss";
import "./animation.scss";
import { Accordion, VerticalStepper } from "@contentstack/venus-components";
import { useCallback, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ImportContentModel from "../ImportContentModel";
import CompletionStatus from "../CompletionStatus";
import { ReactComponent as ContentModelIcon } from "../../assets/ContentModelLogo.svg";
import { USER_UID_SESSION_PARAMETER, alertUserBeforeUnload } from "../../common/constants";
import { getEnvVariables } from "app/helper/vercel";
import { setGlobalData, setUserId, trackEvent } from "app/helper/analytics";
import { addMetadata } from "app/hooks/useJsErrorTracker";

export const ContentModel = () => {
  const [activeStep, setActiveStep] = useState<0 | 1 >(0);
  const [searchParams, setSearchParams] = useState<any>({});
  const [status, setStatus] = useState<boolean>(false);
  const [importComplete, setImportComplete] = useState<boolean>(false);

  //Added Page Reload Handler
  useEffect(() => {
    window.addEventListener("beforeunload", alertUserBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", alertUserBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (activeStep === 1) {
      window.removeEventListener("beforeunload", alertUserBeforeUnload);
    }
  }, [activeStep]);

  useEffect(() => {
    //setting search params from URL
    let urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams);
    setSearchParams(params);
  }, []);

  const handelStepper = useCallback((stepName?: string) => {
    if (stepName === "complete") {
      setActiveStep(1);
      setImportComplete(true);
    } else setActiveStep(0);
  }, []);

  const handleTitleClick = useCallback(
    (currentStep?: string) => {
      currentStep === "import" ? setActiveStep(0) : importComplete ? setActiveStep(1) : setActiveStep(0);
    },
    [importComplete]
  );

  //  Added Trackers.
  useEffect(() => {
    if (searchParams.state) {
      getEnvVariables(searchParams.state).then(({ userUid }) => {
        sessionStorage.setItem(USER_UID_SESSION_PARAMETER, userUid);
        if (window.location.href.indexOf("project-dashboard-url") === -1) {
          //setting userID for heap
          setUserId(userUid);
          // register global-data for heap
          setGlobalData({
            "Application Type": "Content Model",
            "Application Name": `${searchParams?.contentModelName} Content Model`,
            Organization: `${searchParams?.orgUid}`,
          });
          //initiating process for heap
          trackEvent("Process Initiated");
        }
        addMetadata("user_uid", userUid);
      });
    }
  }, [searchParams]);

  const StepperComponents = [
    {
      id: "import-content-model",
      title: () => "Import Content Models",
      hideTabView: true,
      data: (
        <Accordion
          dashedLineVisibility="hidden"
          hasBackgroundColor
          isAccordionOpen={activeStep === 0}
          title={<h5>Import Content Model to Stack</h5>}
          onTitleClick={() => handleTitleClick("import")}
          preRender={true}
          className="import-contentmodel-stepper"
          actionClassName="transition-import">
          <CSSTransition in={activeStep === 0} timeout={1000} classNames="transition">
            <ImportContentModel
              activeStep={activeStep}
              setNextStep={() => {
                handelStepper("complete");
              }}
              searchParams={searchParams}
              setStatus={setStatus}
            />
          </CSSTransition>
        </Accordion>
      ),
      status: activeStep === 0 && importComplete === true ? "COMPLETED" : importComplete ? "COMPLETED" : "ACTIVE",
    },
    {
      id: "completion-status",
      title: () => "Completion Status",
      hideTabView: true,
      data: (
        <Accordion
          dashedLineVisibility="hidden"
          hasBackgroundColor
          isAccordionOpen={activeStep === 1}
          title={<h5>Completion Status</h5>}
          onTitleClick={() => handleTitleClick("complete")}
          preRender={true}
          className="completion-status-stepper"
          actionClassName="transition-import">
          <CSSTransition in={activeStep === 1} timeout={1000} classNames="transition">
            <CompletionStatus />
          </CSSTransition>
        </Accordion>
      ),
      status: activeStep === 1 ? "COMPLETED" : importComplete ? "COMPLETED" : "DISABLED",
    },
  ] as any;

  return (
    <div className="content-wrapper">
      <div className="step-wrapper">
        <div className="step">
          <div>
            <div className="circle" style={{ right: "14px", bottom: "7px", background: "rgb(247 249 252)" }}>
              <ContentModelIcon />
            </div>
          </div>
          <div className="starter-intro">
            <h5>{searchParams && searchParams.contentModelName} Content Model</h5>
            <p>
              Contentstack Content Models are designed to help beginners use pre-defined content model template. In this
              example, let's import the {searchParams.contentModelName} content model in your stack.
            </p>
          </div>
        </div>
        <VerticalStepper
          steps={StepperComponents}
          className="step step-active vertical-steps"
          stepTitleClassName="flex-start"
          stepContentClassName="flex-start"
        />
      </div>
    </div>
  );
};
