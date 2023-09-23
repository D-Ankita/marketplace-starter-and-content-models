/*eslint-disable no-restricted-globals */
import { useEffect, useState, useMemo, useCallback } from "react";
import { Button, Tooltip } from "@contentstack/venus-components";
import { PopupObject } from "../../model/popUp";
import { trackEvent } from "app/helper/analytics";
import { getEnvVariables } from "../../helper/vercel";
import { useDeployPlatform } from "app/hooks/useLaunch";
import { ReactComponent as Hotspot } from "../../assets/Hotspot.svg";

export const DeployButton = ({
  apiKey,
  region,
  environment,
  setDetails,
  setStatus,
  status,
  setDeployStatus,
  deployStatus,
  stackDetails,
  searchParams,
  stackUid,
}) => {
  const [deliveryToken, setDeliveryToken] = useState<string | undefined>();
  const [managementToken, setManagementToken] = useState<string | undefined>();
  const [appHost, setAppHost] = useState<string | undefined>();
  const startersSupported = process.env.REACT_APP_LAUNCH_SUPPORTED_STARTERS as string;
  const [showTooltip, setShowTooltip] = useState(true);
  const launchSupportedStarters = startersSupported?.split(",");
  const launchSupport = !!launchSupportedStarters?.includes(`${searchParams?.starterName}`);
  const [childWindow, setChildWindow] = useState<any>(null);
  const [deployPlatform, setDeployPlatform] = useDeployPlatform();
  const [vercel, setVercel] = useState<boolean>();
  const [launch, setLaunch] = useState<boolean>();

  useEffect(() => {
    const storedValue = localStorage.getItem("tooltipClosed");
    if (storedValue === "true") {
      setShowTooltip(false);
    }
  }, []);

  const url = useMemo(
    () =>
      `https://vercel.com/new/clone?repository-url=${searchParams.repoUrl}&repository-name=${stackDetails.stack}&integration-ids=${process.env.REACT_APP_CLIENT_ID}&external-id=${apiKey},${deliveryToken},${environment},${region},${stackDetails.apiHost},${searchParams.repoUrl},${appHost},${managementToken}&redirect-url=${window.location.origin}/ui/callback`,
    [searchParams, stackDetails, apiKey, deliveryToken, environment,region, appHost, managementToken]
  );

  const launchUrl = useMemo(
    () =>
      `https://${appHost}/#!/launch/clone?repository-url=${searchParams.repoUrl}&repository-name=${stackDetails.stack}&orgUid=${searchParams.orgUid}&cs-stack-api-key=${apiKey}&cs-stack-delivery-token=${deliveryToken}&redirect-url=${window.location.origin}/ui/callback`,
    [apiKey, appHost, deliveryToken, searchParams.orgUid, searchParams.repoUrl, stackDetails.stack]
  );

  useEffect(() => {
    if (status) {
      getEnvVariables(searchParams.state, stackUid, environment, searchParams.orgUid).then(
        ({ deliveryToken, appHost, managementToken }) => {
          setDeliveryToken(deliveryToken);
          setManagementToken(managementToken);
          setAppHost(appHost);
        }
      );
    }
  }, [status, searchParams, searchParams.state, stackUid, environment, searchParams.orgUid]);

  useEffect(() => {
    const receiveMessage = (event: PopupObject) => {
      const {
        data: { data },
      } = event;
      if (data) {
        let urlParams = new URLSearchParams(data);
        let params = Object.fromEntries(urlParams);
        setDetails(params);
        setStatus(false);
        setDeployStatus(false);
      }
    };
    window.addEventListener("message", receiveMessage, false);
  });

  const popupwindow = ({ popUpUrl, title, w, h }) => {
    var left = screen.width / 2 - w / 2;
    var top = screen.height / 2 - h / 2;
    return window.open(
      popUpUrl,
      title,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };

  const openPopup = useCallback(
    (platform) => {
      setDeployStatus(true);
      platform === "vercel" ? setVercel(true) : setLaunch(true);
      if (!childWindow) {
        const child: any = popupwindow({
          popUpUrl: platform === "vercel" ? url : launchUrl,
          title: `Deploy on ${deployPlatform}`,
          w: 800,
          h: 500,
        });
        setChildWindow(child);

        let timer = setInterval(function () {
          if (child.closed) {
            clearInterval(timer);
            setDeployStatus(false);
            setChildWindow(undefined);
            setVercel(undefined);
            setLaunch(undefined);
          }
        }, 1000);
      } else childWindow.focus();
    },
    [childWindow, deployPlatform, launchUrl, setDeployStatus, url]
  );

  const handleVercelClick = () => {
    setDeployPlatform("vercel");
    setDeployStatus(true);
    openPopup("vercel");
  };

  const handleLaunchClick = () => {
    setDeployPlatform("launch");
    setDeployStatus(true);
    openPopup("launch");
  };

  const handelTooltipClose = () => {
    localStorage.setItem("tooltipClosed", "true");
    setShowTooltip(false);
  };

  return (
    <div className="tooltip-container">
      <div>
        <p className="form-p-description">
          To deploy your Starter app, you can connect your account with{" "}
          {launchSupport ? `either Launch or Vercel` : `Vercel`}
        </p>

        <div>
          <div className="form">
            <div className="form-content deployForm">
              {launchSupport && !vercel ? (
                <>
                  <Tooltip
                    content={
                      <div>
                        <h6>Introducing Contentstack Launch</h6>
                        <p>
                          Contentstack’s new fully integrated, fully automated, MACH-compliant front-end hosting
                          solution. Now you can easily deploy your website with Launch!
                        </p>
                      </div>
                    }
                    position="left"
                    appendTo={document.body}
                    showArrow={true}
                    variantType="light"
                    type="secondary"
                    showClose={showTooltip}
                    onClose={handelTooltipClose}
                    disabled={!showTooltip}>
                    {showTooltip ? <Hotspot className="hoverIcon" /> : undefined}
                  </Tooltip>
                  <Button
                    onClick={handleLaunchClick}
                    isFullWidth
                    disabled={!status || !deliveryToken}
                    icon={deployStatus ? "" : "LaunchLogo"}
                    buttonType={!deployStatus ? "primary" : "secondary"}
                    id="launchBtn"
                    className={
                      deployStatus ? (vercel ? "singleBtn deployBtns" : "in-progress deployBtns") : "deployBtns"
                    }>
                    <span className="deployStatus">
                      {deployPlatform === "launch" && deployStatus ? (
                        <div>
                          <img src="/images/spinner.gif" alt="loader" /> Deploying to Launch
                        </div>
                      ) : (
                        "Deploy in Launch"
                      )}
                    </span>
                  </Button>
                </>
              ) : null}
              {!launch ? (
                <Button
                  onClick={handleVercelClick}
                  isFullWidth
                  disabled={!status || !deliveryToken}
                  icon={deployStatus ? "" : "VercelLogo"}
                  buttonType="secondary"
                  className={
                    deployStatus ? (launch ? "singleBtn deployBtns" : "in-progress deployBtns") : "deployBtns"
                  }>
                  <span className="deployStatus">
                    {deployPlatform === "vercel" && deployStatus ? (
                      <>
                        <img src="/images/spinner.gif" alt="loader" /> Deploying to Vercel
                      </>
                    ) : (
                      "Deploy in Vercel"
                    )}
                  </span>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
