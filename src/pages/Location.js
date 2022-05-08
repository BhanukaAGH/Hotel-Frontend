import React from 'react'
import { useParams } from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import Spinner from '../components/Spinner'

const containerStyle = {
  height: '100vh',
}

var center = {
  lat: 7.873054,
  lng: 80.771797,
}

const Location = () => {
  const { lat, lng } = useParams()

  let position = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDTC1NQNzUUD2KvSTLJxKO0tZ9jBnhJ9kg',
  })

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      mapTypeId='hybrid'
      center={center}
      zoom={5}
      onLoad={onLoad}
    >
      <Marker
        onLoad={() => {
          center = position
        }}
        position={position}
      />
    </GoogleMap>
  ) : (
    <Spinner />
  )
}

export default Location
