import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import styles from './styles.module.scss'
import Leaflet from 'leaflet'

const mapPinIcon = Leaflet.icon({
  iconUrl: '/map-pin.svg',
  iconSize: [20, 20],
});

type MapProps = {
  locations: { 
    name: string,
    latitude: number,
    longitude: number
  }[],
  userLocation: { 
    name: string,
    latitude: number,
    longitude: number
  }
}

const Map = ({locations, userLocation}: MapProps) => {
  return (
    <div data-testid='map-container' className={styles['container']}>
      <h1>Geolocalização dos usuários</h1>
      <MapContainer className={styles['container__map']} center={[userLocation.latitude, userLocation.longitude]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => {
          return (
            <Marker key={index} icon={mapPinIcon} position={[location.latitude, location.longitude]}>
              <Popup className={styles['popup']}>
                <p>{location.name}</p>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map