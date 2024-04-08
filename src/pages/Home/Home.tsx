import styles from './Home.module.scss'
import Notification from '../../components/Notification/Notification'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { INotificationProps } from '../../types/notification.interface'
import { requestLabel, requestStatus, requestText } from '../../enums'
import { NotificationContext } from '../../providers/NotificationProvider'

const Home: FC = () => {
    const [isRequestSent, setIsRequestSent] = useState<boolean>(false)
    const { isNotificationActive, setIsNotificationActive } = useContext(NotificationContext)

    const [notificationInfo, setNotificationInfo] = useState<INotificationProps>({
        status: requestStatus.success,
        label: requestLabel.success,
        text: requestText.success
    })
    
    useEffect(() => { 
        if (!isNotificationActive) setIsRequestSent(prev => prev = false)
    }, [isNotificationActive])

    const showNotification = (isSuccess: boolean) => {

        if (isSuccess) {
            setNotificationInfo({
                status: requestStatus.success,
                label: requestLabel.success,
                text: requestText.success
            })
        } else {
            setNotificationInfo({
                status: requestStatus.error,
                label: requestLabel.error,
                text: requestText.error
            })
        }

        setIsNotificationActive(true)
    }

    const simulateServer = () => {
        setIsRequestSent(prev => prev = true)
        return new Promise((resolve, reject) => {
            if (Math.random() > 0.5) {
                return resolve();
            }
            const t = setTimeout(() => {
                reject();
                return clearTimeout(t);
            }, 1000);
        })
    }

    const sendRequest = () => {
        if (isRequestSent) return
        const response = simulateServer()
        response.then(() => showNotification(true)).catch(() => showNotification(false))
    }

    return (
        <div>
            { 
                isNotificationActive && <Notification { ...notificationInfo  } /> 
            }
            <button className={ styles.sendRequestButton } onClick={ () => sendRequest() } >Отправить запрос</button>
        </div>
    )
}

export default Home