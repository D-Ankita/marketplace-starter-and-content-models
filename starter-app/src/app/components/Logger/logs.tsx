import { useEffect, FunctionComponent } from "react";
import { ClipBoard, Icon } from "@contentstack/venus-components";
import "./style.scss";

export interface LogsProps {
  logs: any;
}

const REMOVE_END_LOG = "IMPORT_COMPLETED";
const REMOVE_DEV_ENV_LOG = "Environment: 'development' already exists";
const REMOVE_ROLE_LOG = "No custom-roles found";

const wrapLogRow = (logMessage, removeString: boolean) => {
  try {
    const msgItems = (logMessage || "").trim().split("\n");
    let firstMsgLevel = "error";
    return msgItems.map((msgItem) => {
      if (!msgItem.includes(":"))
        return (
          <div className={`log-row-${firstMsgLevel}`}>
            {removeString ? (msgItem.includes(REMOVE_END_LOG) ? "" : msgItem) : msgItem}
          </div>
        );

      const msgLevels = ["info", "error", "warning"];
      if (!msgLevels.some((el) => msgItem.includes(el)))
        return (
          <div className={`log-row-${firstMsgLevel}`}>
            {removeString ? (msgItem.includes(REMOVE_END_LOG) ? "" : msgItem) : msgItem}
          </div>
        );

      const [level, ...rest] = msgItem.split(":");
      firstMsgLevel = level;
      const message = rest.join(":");

      return (
        <div className={`log-row-${level}`}>
          [{level.toUpperCase()}]: {removeString ? (msgItem.includes(REMOVE_END_LOG) ? "" : message) : message}
        </div>
      );
    });
  } catch (_) {
    return (
      <div className="log-row-error">
        {removeString ? (logMessage.includes(REMOVE_END_LOG) ? "" : logMessage) : logMessage}
      </div>
    );
  }
};

const skipLog = (logMessage: String) => {
  try {
    const logTypes = [REMOVE_END_LOG, REMOVE_DEV_ENV_LOG, REMOVE_ROLE_LOG];
    if (logTypes.some((el) => logMessage.includes(el))) return true;
    return false;
  } catch (_) {
    return false;
  }
};

export const PusherLogs: FunctionComponent<LogsProps> = ({ logs }) => {
  useEffect(() => {
    const logRef = document.getElementById("log-ref");
    const topPos = logRef?.offsetTop;
    const loggerDiv: any = document.getElementById("log-div")!;
    loggerDiv.scrollTo({
      top: topPos,
      behavior: "smooth",
    });
  }, [logs.length]);

  const CopyLogs: () => JSX.Element = () => {
    const logsToCopy = logs.map(
      ({ message, datetime }) =>
        `${datetime} ${message.replace(
          // eslint-disable-next-line no-control-regex
          /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
          ""
        )}`
    );
    return (
      <div className="copyLogs">
        <ClipBoard copyText={logsToCopy.join("\n")}>
          <Icon icon="CopyWhite" className="ml-5 cursor-pointer" size="tiny" />
        </ClipBoard>
      </div>
    );
  };

  return (
    <div className="log-wrapper">
      {logs && <CopyLogs />}
      <div className="logs font-small fontWeightRegular" id="log-div">
        {logs
          ? logs.map((log, index) => {
              return (
                skipLog(log.message) ? null : (
                  <div className="mb-10 logsRow" key={index}>
                    <span className="mr-15">{log.datetime}</span>
                    {logs.length - 1 === index ? (
                      <span className="logsRowMsg">{wrapLogRow(log.message, true)}</span>
                    ) : (
                      <span className="logsRowMsg">{wrapLogRow(log.message, false)}</span>
                    )}
                  </div>
                )
              );
            })
          : "loading ..."}
        <div id="log-ref" />
      </div>
    </div>
  );
};
