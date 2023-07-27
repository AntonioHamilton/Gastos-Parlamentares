import { api } from "@/config/api";

export type LoginProps = {
  'email': string,
  'password': string,
}

export const login = async (body: LoginProps) => {
  const result = await api.post(`/login`, body);

  if (result.data?.error) {
    return result.data
  }

  return result
}