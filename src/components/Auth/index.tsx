import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

type AuthProps = {
  children: ReactNode
}

const Auth = ({children}: AuthProps) => {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    };

    isAuthenticated();
  }, []);

  return (
    <>
      {children}
    </>
  )
}

export default Auth