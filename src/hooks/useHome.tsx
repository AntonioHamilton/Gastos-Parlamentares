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
  const [myLocation, setMyLocation] = useState<userLocation | null>({name: 'user', latitude: -10.945688, longitude: -37.090376})
  const [locations, setLocations] = useState<userLocation[] | null>([])
  const [permission, setPermission] = useState(false)
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

    const {data, status} =  await getAllLocations({token: token!})

    if (status === 401) {
      return router.push('/login')
    }
    
    setLocations(data.result)
  }

  const getUserPosition = async () => {
    const token = localStorage.getItem('token')

    const {data, status} =  await getLocation({token: token!})

    if (status === 401) {
      return router.push('/login')
    }

    setMyLocation(data.result)
  }

  const setPosition = async (position: GeolocationPosition) => {
    setPermission(true)

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const token = localStorage.getItem('token')
  
    setMyLocation({name: 'user', latitude, longitude})
    return await setLocation({latitude, longitude, token: token!})
  }

  const positionError = (error: GeolocationPositionError) => {
    setPermission(false)
    console.error({error})
    return
  }

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
    permission,
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