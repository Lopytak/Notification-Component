import { FC, useContext, useEffect, useRef } from 'react';
import styles from './Notification.module.scss'
import errorIcon from '/error_icon.png'
import successIcon from '/success_icon.png'
import { INotificationProps } from '../../types/notification.interface';
import { jsEvent, requestStatus } from '../../enums';
import ProgressBar from '../ProgressBar/ProgressBar';
import { NotificationContext } from '../../providers/NotificationProvider';

const Notification: FC<INotificationProps> = ({ status, label, text }) => {
    const notificationRef = useRef<HTMLDivElement>(null)
    const { setIsProgressBarStop } = useContext(NotificationContext)

    useEffect(() => {
        if (!notificationRef.current) return

        notificationRef.current.addEventListener(jsEvent.mouseenter, () => {
            setIsProgressBarStop(true)
        })
        notificationRef.current.addEventListener(jsEvent.mouseleave, () => {
            setIsProgressBarStop(false)
        })

        return () => {
            if (!notificationRef.current) return
            
            notificationRef.current.removeEventListener(jsEvent.mouseenter, () => {
                setIsProgressBarStop(true)
            })
            notificationRef.current.removeEventListener(jsEvent.mouseleave, () => {
                setIsProgressBarStop(false)
            })
        }
    }, [])
    
    return (
        <div className={ styles.notification } ref={ notificationRef }>
            <img src={ status === requestStatus.success ? successIcon : errorIcon } alt='icon' className={ styles.notification__icon }/>
            <div className={ styles.notificationInfo }>
                <label htmlFor='notificationText' className={ styles.notificationInfo__label }>{ label }</label>
                <p id='notificationText' className={ styles.notificationInfo__text }>{ text }</p>
                <ProgressBar miliseconds={ 3000 }/>
            </div>
        </div>
    )
}

export default Notification