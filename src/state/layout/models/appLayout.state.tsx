import { DynamicModalTypes } from '../../../models/internal/types/DynamicModalEnum.model';

export interface LayoutState {
  isSidenavOpened: boolean,
  alert: {
    isAlertOpened: boolean,
    alertContent: DynamicModalTypes|undefined
  }
}
