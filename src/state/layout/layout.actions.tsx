import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';

export enum LayoutActions {
    switchSidenavStatus = '@action/switchSidenavStatus',
    openAlert = '@action/openAlert',
    closeAlert = '@action/closeAlert'
}

export const switchSidenavStatusAction = () => ({
  type: LayoutActions.switchSidenavStatus,
});

export const openAlertAction = (alertType: DynamicAlertTypes, props: object = {}) => ({
  type: LayoutActions.openAlert,
  payload: {
    type: alertType,
    props,
  },
});

export const closeAlertAction = () => ({
  type: LayoutActions.closeAlert,
});
