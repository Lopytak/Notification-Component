import { FC, useContext, useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss'
import { IProgressBarProps } from '../../types/progressBar.interface';
import { NotificationContext } from '../../providers/NotificationProvider';

const ProgressBar: FC<IProgressBarProps> = ({miliseconds}) => {
    const [progress, setProgress] = useState<number>(100)
    const [progressPart] = useState<number>(100 / (miliseconds / 100))

    const { setIsNotificationActive, isProgressBarStop } = useContext(NotificationContext)

    useEffect(() => {
        if (isProgressBarStop) return
        if (progress > 0) {
            const s = setTimeout(() => {
                setProgress(prev => prev -= progressPart)
                return clearTimeout(s)
            }, 100)
        } else {
            setIsNotificationActive(false)
        }
    }, [progress, isProgressBarStop])

    return (
        <div className={ styles.progressBar }>
            <div className={ styles.progressBar__inner } style={{ width: `${progress}%` }}></div>
        </div>
    )
}

export default ProgressBar