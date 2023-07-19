import { useState } from "react"
import styles from './login.module.scss'
import Card from "@/components/Card"

const Login = () => {
    const [userData, setUserData] = useState<Record<string, string>>({
        email: '',
        password: ''
    })

    const handleDataChange = (name: string, text: string) => {
        const newData = userData
        newData[name] = text
        setUserData(newData)
    }

    const handleLogin = () => {
        console.log(userData)
    }

    return (
        <div className={styles["login-container"]}>
            <Card>
                <h1 className={styles['__title']}>Gastos Parlamentares</h1>
                <div className={styles["login-container__input-wrapper"]}>
                    <label>Email</label>
                    <input onChange={(e) => handleDataChange('email', e.target.value)} />
                </div>
                <div className={styles["login-container__input-wrapper"]}>
                    <label>Senha</label>
                    <input name='password' onChange={(e) => handleDataChange('password', e.target.value)} />
                </div>
                <button className={styles['button-login']} onClick={handleLogin}>
                    Entrar
                </button>
                <a className={styles['anchor-register']} href="/register">
                    Cadastrar
                </a>
            </Card>
        </div>
       
    )
}

export default Login