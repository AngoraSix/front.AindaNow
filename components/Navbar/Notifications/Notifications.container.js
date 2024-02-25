import { useSession } from 'next-auth/react';
import React, { useEffect, useReducer } from 'react';
import api from '../../../api';
import Notification from '../../../models/Notification';
import { mapToHateoasCollectionDto } from '../../../utils/rest/hateoas/hateoasUtils';
import Notifications from './Notifications.component';
import NotificationsReducer, {
  INITIAL_STATE,
  dismissNotificationsAction,
  newNotificationAction,
  startLoadingAction,
  updateAllAction,
} from './Notifications.reducer';

export const ACTION_IDS = {
  GATEWAY_NOTIFICATION_RESPOND: 'gatewayNotificationRespond',
};

const NotificationsContainer = ({}) => {
  console.log('GGGGGGGG0');
  const [state, dispatch] = useReducer(NotificationsReducer, INITIAL_STATE);
  const { data: session } = useSession();

  useEffect(() => {
    const initializeNotifications = async () => {
      console.log('INITIALIZEDDDDD?');
      console.log(state);
      if (session && !session.error && !state?.initialized) {
        // let { streamToken } = await fetchNotifications();
        await fetchNotifications();
        let eventSource = api.front.streamContributorNotifications();
        // streamToken
        // ();
        eventSource.onmessage = (e) => {
          console.log('EVEVEVEVEVEVE1111111');
          console.log(e);
          console.log('EVEVEVEVEVEVE1111111====');
          dispatch(newNotificationAction(JSON.parse(e.data)));
        };

        eventSource.onerror = (e) => eventSource.close();
        return () => {
          eventSource.close();
        };
      }
    };

    initializeNotifications();
  }, [session]);

  const fetchNotifications = async ({ number = state.number } = {}) => {
    console.log('GERB1111111');
    dispatch(startLoadingAction());
    let notificationsResponse = await api.front.getContributorNotifications(
      number
    );
    console.log('GERBYYYY');
    console.log(notificationsResponse);
    const hateoasCollectionDto = mapToHateoasCollectionDto(
      notificationsResponse,
      Notification
    );
    let {
      collection: notificationsData,
      metadata: notificationsMetadata,
      actions: notificationsActions,
    } = hateoasCollectionDto;
    let notificationsList = state.notifications;
    console.log('GERCHHHH');
    console.log(notificationsMetadata);
    console.log(notificationsActions);

    notificationsData.forEach((notification) => {
      notification.dismissed
        ? notificationsList.dismissed.push(notification)
        : notificationsList.toRead.push(notification);
    });
    console.log("LA METAAAAAA");
    console.log(notificationsMetadata);
    dispatch(
      updateAllAction({
        isLoading: false,
        notifications: notificationsList,
        initialized: true,
        actions: notificationsActions, 
        ...notificationsMetadata,
      })
    );
    return { notificationsList }; //, streamToken };
  };

  const dismissAllUserNotifications = async () => {
    api.notifications.dismissNotifications(true);
    dispatch(dismissNotificationsAction());
  };

  const loadMoreNotifications = async () => {
    fetchNotifications({ number: state.number + 1 });
  };

  return (
    <Notifications
      notifications={state.notifications}
      totalToRead={state.totalToRead}
      isLoading={state.isLoading}
      hasImportantNotification={state.hasImportantNotification}
      onClose={dismissAllUserNotifications}
      onLoadMore={loadMoreNotifications}
      notificationActions={state.actions}
    />
  );
};

NotificationsContainer.defaultProps = {};

NotificationsContainer.propTypes = {};

export default NotificationsContainer;
