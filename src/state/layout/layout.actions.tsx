import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';

export enum LayoutActions {
    switchSidenavStatus = '@action/switchSidenavStatus',
    openAlert = '@action/openAlert',
    closeAlert = '@action/closeAlert'
}

export const switchSidenavStatusAction = () => ({
  type: LayoutActions.switchSidenavStatus,
});

export const openAlertAction = (alert: DynamicModalTypes) => ({
  type: LayoutActions.openAlert,
  payload: alert,
});

export const closeAlertAction = () => ({
  type: LayoutActions.closeAlert,
});
