import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import WarningIcon from '@mui/icons-material/WarningAmberOutlined';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import NotificationActions from './NotificationActions';

const ALERT_LEVEL_COLOR_MAPPING = {
  SUCCESS: 'success',
  WARN: 'warning',
  INFO: 'info',
  ERROR: 'error',
};

const ALERT_LEVEL_ICON_MAPPING = {
  SUCCESS: CheckCircleIcon,
  WARN: WarningIcon,
  INFO: InfoIcon,
  ERROR: ReportIcon,
};

const NotificationItem = ({ notification, onNotificationAction }) => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = router;

  const notificationColorId =
    notification.alertLevel &&
    ALERT_LEVEL_COLOR_MAPPING[notification.alertLevel.toUpperCase()];

  const NotificationIcon =
    notification.alertLevel &&
    ALERT_LEVEL_ICON_MAPPING[notification.alertLevel.toUpperCase()];

  //console.log translate this error
  const notificationTitle =
    notification.title?.i18n?.[locale] ||
    notification.title?.i18n?.[en] ||
    'Error reading title';
    const imageUrl = notification?.media?.thumbnailUrl || notification?.media?.url;
  return (
    <React.Fragment>
      <ListItem
        className={`NotificationItem ${
          notification.dismissedForUser ? 'NotificationItem--dismissed' : ''
        }`}
        style={{
          backgroundColor: notification.dismissedForUser
            ? null
            : theme.palette.primary.light,
          borderColor:
            (notificationColorId && theme.palette[notificationColorId].main) ||
            theme.palette.primary.dark,
        }}
        alignItems="flex-start"
      >
        <ListItemAvatar className="NotificationItem__Image">
          {imageUrl ? (
            <Avatar src={imageUrl} />
          ) : (
            <Avatar>
              {notification.dismissedForUser ? (
                <NotificationsNoneIcon />
              ) : (
                <NotificationsActiveIcon />
              )}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          className={`NotificationItem__Text ${
            notification.dismissedForUser
              ? 'NotificationItem__Text--dismissed'
              : ''
          }`}
          primary={
            <React.Fragment>
              <NotificationIcon
                className="NotificationItem__AlertIcon"
                color={notificationColorId}
                fontSize="small"
              />
              <Typography
                variant="subtitle1"
                className="NotificationItem__Title"
              >
                {notificationTitle}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={`NotificationItem__Message ${
                notification.dismissedForUser
                  ? 'NotificationItem__Text--dismissed'
                  : ''
              }`}
              color="textPrimary"
            >
              {/* console.log translate this */}
              {console.log('GYGYUUUUUUUUUUUU')}
              {console.log(notification.message?.i18n?.[locale])}
              {notification.message?.i18n?.[locale] ||
                notification.message?.i18n?.[en] ||
                'Error reading message'}
            </Typography>
          }
        />
        {notification.actions && (
          <NotificationActions
            actions={notification.actions}
            dismissedForUser={notification.dismissedForUser}
            onNotificationAction={onNotificationAction}
          />
        )}
      </ListItem>
    </React.Fragment>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;
