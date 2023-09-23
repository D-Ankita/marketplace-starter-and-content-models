import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { PusherLogs } from "./logs";
import Moment from "moment";
import "./style.scss";

interface LogData {
  message: string;
  error: boolean;
}
const PUSHER_END_LOG = "IMPORT_COMPLETED";

export const Logger = React.memo(({ onSubmit, channelId, searchParams }: any) => {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [pusherClient, setPusherClient] = useState<Pusher>();

  useEffect(() => {
    let channel;
    let pusherBound = false;
    const pusherClient = new Pusher(process.env.REACT_APP_PUSHER_KEY || "", {
      authEndpoint: `/api/pusher/auth?state=${searchParams.state}`,
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });
    setPusherClient(pusherClient);
    if (channelId !== undefined) {
      channel = pusherClient.subscribe("private-" + channelId);

      channel.bind("write", updateLogs);
      pusherBound = true;
    }

    return () => {
      if (pusherBound) {
        channel.unbind("write", updateLogs);
        pusherClient.unsubscribe("private-" + channelId);
      }
    };
  }, []);

  const updateLogs = (data) => {
    if (data && data.message.includes(PUSHER_END_LOG)) {
      window.setTimeout(() => {
        onSubmit();
        // on completed, unsubscribe from pusher
        if (pusherClient) {
          pusherClient.unsubscribe("private-" + channelId);
        }
      }, 1500);
      return;
    }
    setLogs((logs) => [
      ...logs,
      {
        ...data,
        datetime: Moment(Date.now()).format("YYYY-MM-DD HH:mm:ss.SSS"),
      },
    ]);
  };

  return (
    <div id="logger">
      <PusherLogs logs={logs} />
    </div>
  );
});
