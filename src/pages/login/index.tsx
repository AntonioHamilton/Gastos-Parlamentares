import { useState } from "react"
import styles from './index.module.scss'
import Card from "@/components/Card"
import Link from "next/link"
import { useRouter } from "next/router"
import { LoginProps, login } from "@/services/login"

const Login = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<LoginProps>({
    email: '',
    password: ''
  })

  const handleDataChange = (name: string, text: string) => {
    const newData = {...userData, [name]: text.trim().toLocaleLowerCase()}
    setUserData(newData)
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await login(userData)

      if (result.status === 200) {
        localStorage.setItem('token', result.data.token)
        router.push('/home')
      }
    } catch (e: any) {
      setError(e.response.data.error)
    }
    setLoading(false)
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
          <input type='password' placeholder="insira sua senha" onChange={(e) => handleDataChange('password', e.target.value)} />
        </div>
        <p className={styles['error']}>{error}</p>
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