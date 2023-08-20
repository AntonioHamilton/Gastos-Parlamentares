import { menuProperties } from "@/components/Menu"
import { getAllLocations, getLocation, setLocation } from "@/services/location"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type userLocation = { 
  name: string,
  latitude: number,
  longitude: number
}

const useHome = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [menuState, setMenuState] = useState<string>('Todos os dados')
  const [myLocation, setMyLocation] = useState<userLocation | null>(null)
  const [locations, setLocations] = useState<userLocation[] | null>(null)
  const [data, setData] = useState([])
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [page, setPage] = useState(0)
  
  const handleApi = async (params: any) => {
    setLoading(true)
    const {data, totalDocuments} = await menuProperties[menuState].function(params)
    setData(data)
    setTotalDocuments(totalDocuments)
    setLoading(false)
  }

  const getAllPositions = async () => {
    const token = localStorage.getItem('token')

    const {data} =  await getAllLocations({token: token!})
    setLocations(data.result)
  }

  const getUserPosition = async () => {
    const token = localStorage.getItem('token')

    const {data} =  await getLocation({token: token!})
    setMyLocation(data.result)
    setLocations([data.result])
  }

  const setPosition = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const token = localStorage.getItem('token')
  
    return await setLocation({latitude, longitude, token: token!})
  }

  const positionError = (error: GeolocationPositionError) => console.error(error)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, positionError)
    getUserPosition()
    getAllPositions()
  }, [])

  useEffect(() => {
    router.push({query: {...router.query, page: String(page + 1)}})
  }, [page])

  useEffect(() => {
    router.push({query: {...router.query, page: String(1)}})
    setPage(0)
  }, [menuState])

  useEffect(() => {
    handleApi(router.query)
  }, [menuState, router.query.page, router.query.year, router.query.size, router.query.state, router.query.month])

  return {
    setMenuState,
    setPage,
    setMyLocation,
    myLocation,
    page,
    menuState,
    data,
    loading,
    totalDocuments,
    locations
  }
}

export default useHome