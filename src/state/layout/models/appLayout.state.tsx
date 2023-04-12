import { DynamicModalTypes } from '../../../models/internal/types/DynamicModalEnum.model';

export interface AlertContent {
  type: DynamicModalTypes|undefined,
  props: object
}
export interface LayoutState {
  isSidenavOpened: boolean,
  alert: {
    isAlertOpened: boolean,
    alertContent: AlertContent
  }
}
