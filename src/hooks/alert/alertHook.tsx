import React from 'react';
import ProfileSettings from '../../components/common/profileSettings/profileSettings';
import GameSettings from '../../components/common/gameSettings/gameSettings';
import PlayerDetails from '../../components/common/playerDetails/playerDetails';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';
import { closeAlertAction, openAlertAction } from '../../state/layout/layout.actions';
import { selectLayoutAlertContent } from '../../state/layout/layout.selectors';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { AlertContent } from '../../state/layout/models/appLayout.state';
import Notification from '../../components/common/notification/notification';
import { NotificationAlertPropsModel } from '../../models/internal/models/alertProps.model';
import GameRestart from '../../components/common/gameRestart/gameRestart';

export function useAlert() {
  const dispatch = useAppDispatch();
  const alertContent = useAppSelector<AlertContent>(selectLayoutAlertContent);
  const canBeClosed = alertContent?.type !== DynamicAlertTypes.GameRestart;

  const getAlertContent = () => {
    let MyComponent: any;

    switch (alertContent.type) {
      case DynamicAlertTypes.ProfileSettings:
        MyComponent = ProfileSettings;
        break;
      case DynamicAlertTypes.GameSettings:
        MyComponent = GameSettings;
        break;
      case DynamicAlertTypes.PlayerDetails:
        MyComponent = PlayerDetails;
        break;
      case DynamicAlertTypes.Notification:
        MyComponent = Notification;
        break;
      case DynamicAlertTypes.GameRestart:
        MyComponent = GameRestart;
        break;
      default:
        break;
    }

    return MyComponent
      ? React.createElement(MyComponent, alertContent.props)
      : undefined;
  };

  const openAlert = (alertType: DynamicAlertTypes, props: NotificationAlertPropsModel | object = {}) => {
    dispatch(openAlertAction(alertType, props));
  };

  const closeAlert = () => {
    dispatch(closeAlertAction());
  };

  return {
    getAlertContent,
    openAlert,
    closeAlert,
    canBeClosed,
  };
}
