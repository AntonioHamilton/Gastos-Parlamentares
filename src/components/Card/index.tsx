import {ReactNode} from "react"
import styles from './styles.module.scss'

type CardProps = {
    children: ReactNode
}

const Card = ({children}: CardProps) => {
    return (
        <div className={styles['card-container']}>
            {children}
        </div>
    )
}

export default Card