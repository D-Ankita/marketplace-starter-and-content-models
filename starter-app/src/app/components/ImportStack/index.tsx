import { useState } from "react";
import { StackForm } from "../StackForm";
import { seederStart } from "../../helper/api";
import { SeederStartResponse } from "../../common/types";
import { trackError } from "../../hooks/useJsErrorTracker";

export const ImportStack = ({
  setApiKey,
  setToken,
  setStackUid,
  setEnvironment,
  setStatus,
  setNextStep,
  setStackDetails,
  searchParams,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [logger, setLogger] = useState<boolean>(false);
  const [channelId, setChannelId] = useState<string>();

  const forSubmit = (stackData) => {
    seederStart(stackData, searchParams)
      .then((res: SeederStartResponse | unknown) => {
        const {
          data: { apiKey, deliveryToken, environment, id, stackUrl, apiHost, stackUid },
        } = res as SeederStartResponse;
        stackData["stackUrl"] = stackUrl;
        stackData["apiHost"] = apiHost;
        setApiKey(apiKey);
        setToken(deliveryToken);
        setEnvironment(environment);
        setStackDetails(stackData);
        setStackUid(stackUid);
        setChannelId(id);
        setLogger(true);
      })
      .catch((err) => {
        trackError(err);
        setError(true);
      });
  };

  return (
    <div>
      <p className="form-p-description">
        Give the stack where you want to install this starter app a name. This is where CS would import the content
        types, entries etc. to the stack and publish it to the required environment.
      </p>
      <div className="form">
        <StackForm
          onSubmit={forSubmit}
          logger={logger}
          error={error}
          channelId={channelId}
          setStatus={setStatus}
          setNextStep={setNextStep}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};
