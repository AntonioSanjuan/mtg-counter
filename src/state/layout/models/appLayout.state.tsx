import { NotificationAlertPropsModel } from '../../../models/internal/models/alertProps.model';
import { DynamicAlertTypes } from '../../../models/internal/types/DynamicAlertEnum.model';

export interface AlertContent {
  type: DynamicAlertTypes|undefined,
  props: NotificationAlertPropsModel | object
}

export interface LayoutState {
  isSidenavOpened: boolean,
  alert: {
    isAlertOpened: boolean,
    alertContent: AlertContent
  }
}
