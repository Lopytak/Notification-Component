import { requestLabel, requestStatus, requestText } from "../enums";

export interface INotificationProps {
    status: requestStatus.success | requestStatus.error
    label: requestLabel.success | requestLabel.error
    text: requestText.success | requestText.error
}