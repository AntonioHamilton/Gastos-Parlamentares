import Card from "@/components/Card"
import styles from './index.module.scss'
import { useState } from "react"
import ReactLoading from 'react-loading'
import Link from "next/link"
import { RegisterProps, register } from "@/services/register"
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<RegisterProps>({
    email: '',
    password: '',
    name: '',
  })

  const handleDataChange = (name: string, text: string) => {
    setError('')
    const newData = { ...userData, [name]: text.trim().toLowerCase() };
    setUserData(newData)
  }

  const handleRegister = async () => {
    setLoading(true)
    try {
      const {status} = await register(userData)

      if (status === 201) {
        router.push('/login')
      }
    } catch (e: any) {
      setError(e.response.data.error)
    }
    setLoading(false)
  }

  return (
    <div className={styles["register-container"]}>
      <Card>
        {loading ?
          <div className={styles["load-container"]}>
            <ReactLoading width={200} height={200} type="spin" color="DodgerBlue" />
          </div>
          :
          <div>
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
              <input type='password' placeholder="insira uma senha" onChange={(e) => handleDataChange('password', e.target.value)} />
            </div>
            <p className={styles['error']}>{error}</p>
            <button className={styles['button-register']} onClick={handleRegister}>
              Cadastrar
            </button>
            <Link className={styles['anchor-register']} href="/login">
              Login
            </Link>
          </div>
        }
      </Card>
    </div>
  )
}

export default Register