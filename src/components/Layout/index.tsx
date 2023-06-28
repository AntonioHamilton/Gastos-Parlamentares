import { ReactNode } from "react"
import styles from './styles.module.scss'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({children}: LayoutProps) => (
  <div className={styles["layout-container"]}>
    {children}
  </div>
)

export default Layout