import { createContext, FC, PropsWithChildren, useState } from "react"

export type INotificationContext = {
    isNotificationActive: boolean
    setIsNotificationActive: (state: boolean) => void
    isProgressBarStop: boolean
    setIsProgressBarStop: (state: boolean) => void
};

export const NotificationContext = createContext<INotificationContext | null>(null)

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {

    const [isNotificationActive, setIsNotificationActive] = useState<boolean>(false)
    const [isProgressBarStop, setIsProgressBarStop] = useState<boolean>(false)

    return (
        <NotificationContext.Provider value={{ isNotificationActive, setIsNotificationActive, isProgressBarStop, setIsProgressBarStop }}>
            { children }
        </NotificationContext.Provider>
    )
}