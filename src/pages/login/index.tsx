import { useState } from "react"
import styles from './index.module.scss'
import Card from "@/components/Card"
import Link from "next/link"

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
                <h1 className={styles['login-container__title']}>Gastos Parlamentares</h1>
                <div className={styles["login-container__input-wrapper"]}>
                    <label>Email</label>
                    <input placeholder="insira seu email" onChange={(e) => handleDataChange('email', e.target.value)} />
                </div>
                <div className={styles["login-container__input-wrapper"]}>
                    <label>Senha</label>
                    <input placeholder="insira sua senha" onChange={(e) => handleDataChange('password', e.target.value)} />
                </div>
                <button className={styles['button-login']} onClick={handleLogin}>
                    Entrar
                </button>
                <Link className={styles['anchor-register']} href="/register">
                    Cadastrar
                </Link>
            </Card>
        </div>
    )
}

export default Login