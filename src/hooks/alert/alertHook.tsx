import React from 'react';
import ProfileSettings from '../../components/common/profileSettings/profileSettings';
import GameSettings from '../../components/common/gameSettings/gameSettings';
import PlayerDetails from '../../components/common/playerDetails/playerDetails';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';
import { closeAlertAction, openAlertAction } from '../../state/layout/layout.actions';
import { selectLayoutAlertContent } from '../../state/layout/layout.selectors';
import { useAppDispatch, useAppSelector } from '../state/appStateHook';
import { AlertContent } from '../../state/layout/models/appLayout.state';

export function useAlert() {
  const dispatch = useAppDispatch();
  const alertContent = useAppSelector<AlertContent>(selectLayoutAlertContent);

  const getAlertContent = () => {
    let MyComponent: any;

    switch (alertContent.type) {
      case DynamicModalTypes.ProfileSettings:
        MyComponent = ProfileSettings;
        break;
      case DynamicModalTypes.GameSettings:
        MyComponent = GameSettings;
        break;
      case DynamicModalTypes.PlayerDetails:
        MyComponent = PlayerDetails;
        break;
      default:
        break;
    }

    return MyComponent
      ? React.createElement(MyComponent, alertContent.props)
      : undefined;
  };

  const openAlert = (alertType: DynamicModalTypes, props: object = {}) => {
    dispatch(openAlertAction(alertType, props));
  };

  const closeAlert = () => {
    dispatch(closeAlertAction());
  };

  return {
    getAlertContent,
    openAlert,
    closeAlert,
  };
}
