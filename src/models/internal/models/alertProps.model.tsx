export interface NotificationAlertPropsModel {
    title: string
    description?: string
    okButtonText?: string
    cancelButtonText?: string

    onOkButtonClick?: () => void
    onCancelButtonClick?: () => void
  }
