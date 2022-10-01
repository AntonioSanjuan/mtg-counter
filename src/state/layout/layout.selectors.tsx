import { AppRootState } from '../rootState';

export const selectLayout = (state: AppRootState) => state.layout;

export const selectLayoutIsSidenavOpened = (state: AppRootState) => state.layout.isSidenavOpened;

export const selectLayoutAlert = (state: AppRootState) => state.layout.alert;
export const selectLayoutAlertContent = (state: AppRootState) => state.layout.alert.alertContent;
export const selectLayoutIsAlertOpened = (state: AppRootState) => state.layout.alert.isAlertOpened;
