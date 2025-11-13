import {
  NotificationItem,
  NotificationItemButtonPanel,
  NotificationItemContent,
  NotificationItemTitle,
} from '@admiral-ds/react-ui';
import type { NotificationItemProps } from '@admiral-ds/react-ui';
import React from 'react';

interface INotificationProps {
    title:string,
    body:string,
    buttonChildren?: React.ReactNode
}

export const Notification = ({
  status,
  displayStatusIcon,
  isClosable,
  title,
  body,
  buttonChildren,
  ...props
}: NotificationItemProps & INotificationProps)=>{
  return (
    <NotificationItem {...props} status={status} displayStatusIcon={displayStatusIcon} isClosable={isClosable}>
      <NotificationItemTitle>{title}</NotificationItemTitle>
      <NotificationItemContent>{body}</NotificationItemContent>
      {buttonChildren && (
        <NotificationItemButtonPanel>
          {buttonChildren}
        </NotificationItemButtonPanel>
      )}
    </NotificationItem>
  );
};
