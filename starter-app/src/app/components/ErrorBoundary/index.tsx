import React from "react";
import { datadogRum } from "@datadog/browser-rum";

interface MyProps {
  children: React.ReactElement;
}

interface MyState {
  hasError: boolean;
}

datadogRum.init({
  applicationId: `${process.env.REACT_APP_DATADOG_RUM_APPLICATION_ID}`,
  clientToken: `${process.env.REACT_APP_DATADOG_RUM_CLIENT_TOKEN}`,
  site: `${process.env.REACT_APP_DATADOG_RUM_SITE}`,
  service: `${process.env.REACT_APP_DATADOG_RUM_SERVICE}`,
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 20,
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  useCrossSiteSessionCookie: true,
});

// Datadog's Session Replay lets us capture and visually replay  users' web browsing experience for review, analysis, and troubleshooting.
datadogRum.startSessionReplayRecording();
//sending error tracking metadata to Datadog RUM
datadogRum.setGlobalContextProperty("Application Type", "Marketplace");
datadogRum.setGlobalContextProperty("Application Name", "Marketplace Starter App");
class ErrorBoundary extends React.Component<MyProps, MyState> {
  componentDidCatch(error: any) {
    // error tracker for error reporting service
    datadogRum.addError(error);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
