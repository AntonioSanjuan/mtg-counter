import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';

export enum LayoutActions {
    switchSidenavStatus = '@action/switchSidenavStatus',
    openAlert = '@action/openAlert',
    closeAlert = '@action/closeAlert'
}

export const switchSidenavStatusAction = () => ({
  type: LayoutActions.switchSidenavStatus,
});

export const openAlertAction = (alertType: DynamicModalTypes, props: object = {}) => ({
  type: LayoutActions.openAlert,
  payload: {
    type: alertType,
    props,
  },
});

export const closeAlertAction = () => ({
  type: LayoutActions.closeAlert,
});
