import { api } from "@/config/api";

export type RegisterProps = {
  'email': string,
  'password': string,
  'name': string
}

export const register = async (body: RegisterProps) => {
  const result = await api.post(`/register`, body);

  if (result.data?.error) {
    return result.data
  }

  return result.data
}