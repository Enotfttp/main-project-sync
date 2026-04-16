import { StyledNotificationStack } from "./NotificationRestApi.styled";
import { useNotificationStore } from "../model/notificationStore";
import { Notification } from "@shared/ui";
import * as React from "react";

export const NotificationRestApi = () => {
  const notifications = useNotificationStore((s) => s.notifications);
  const remove = useNotificationStore((s) => s.remove);

  const timeoutsRef = React.useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  React.useEffect(() => {
    notifications.forEach((n) => {
      if (timeoutsRef.current[n.id]) return;

      timeoutsRef.current[n.id] = setTimeout(() => {
        remove(n.id);
        delete timeoutsRef.current[n.id];
      }, 8000);
    });
  }, [notifications, remove]);

  if (!notifications.length) return null;

  return (
    <StyledNotificationStack>
      {notifications.map((n) => (
        <Notification
          key={n.id}
          status={n.status}
          title={n.title}
          body={n.body}
          isClosable
        />
      ))}
    </StyledNotificationStack>
  );
};
