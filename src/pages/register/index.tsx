import Card from "@/components/Card"
import styles from './index.module.scss'
import { useState } from "react"
import Link from "next/link"

const Register = () => {
    const [userData, setUserData] = useState<Record<string, string>>({
        email: '',
        password: '',
        name: '',
    })

    const handleDataChange = (name: string, text: string) => {
        const newData = userData
        newData[name] = text
        setUserData(newData)
    }

    const handleRegister = () => {

    }

    return (
        <div className={styles["register-container"]}>
        <Card>
            <h1 className={styles['register-container__title']}>Cadastrar-se</h1>
            <div className={styles["register-container__input-wrapper"]}>
                <label>Nome</label>
                <input placeholder="insira um nome" onChange={(e) => handleDataChange('name', e.target.value)} />
            </div>
            <div className={styles["register-container__input-wrapper"]}>
                <label>Email</label>
                <input placeholder="insira um email válido" onChange={(e) => handleDataChange('email', e.target.value)} />
            </div>
            <div className={styles["register-container__input-wrapper"]}>
                <label>Senha</label>
                <input placeholder="insira uma senha" onChange={(e) => handleDataChange('password', e.target.value)} />
            </div>
            <button className={styles['button-register']} onClick={handleRegister}>
                Cadastrar
            </button>
            <Link className={styles['anchor-register']} href="/login">
                Login
            </Link>
        </Card>
    </div>
    )
}

export default Register