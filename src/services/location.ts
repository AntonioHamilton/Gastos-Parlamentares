import { api } from "@/config/api";

export type SetLocationProps = {
  'longitude': number,
  'latitude': number,
  'token': string
}

export const setLocation = async ({longitude, latitude, token}: SetLocationProps) => {
  const result = await api.patch('/location', {longitude, latitude},  {headers: {token}});

  if (result.data?.error) {
    return result.data
  }

  return result
}

export type GetLocationProps = {
  'token': string
}

export const getLocation = async ({token}: GetLocationProps) => {
  const result = await api.get(`/location`, {headers: {token}});

  if (result.data?.error) {
    return result.data
  }

  return result
}

export const getAllLocations = async ({token}: GetLocationProps) => {
  const result = await api.get(`/all-locations`, {headers: {token}});

  if (result.data?.error) {
    return result.data
  }

  return result
}