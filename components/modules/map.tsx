"use client"

import { FC, useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet"
import { LatLng, icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import iconImage from "leaflet/dist/images/marker-icon.png"
import { alumni } from "lib/constant"

const convertLatLng = (lat: number, lng: number, zoom: number) => {
  const rank = Math.max(10 ** Math.ceil((zoom - 10) / 2), 10)
  return new LatLng(
    Math.round(lat * rank) / rank,
    Math.round(lng * rank) / rank
  )
}

const ZoomComponent = () => {
  const [zoomLevel, setZoomLevel] = useState(15)
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom())
    },
  })
  return (
    <>
      {alumni
        .filter((a) => a.latitude && a.longitude)
        .map((alumnus, i) => (
          <Marker
            key={i}
            position={convertLatLng(
              alumnus.latitude,
              alumnus.longitude,
              zoomLevel
            )}
            icon={icon({
              iconUrl: iconImage.src,
              iconSize: [25, 41],
              iconAnchor: [25, 41],
              popupAnchor: [0, -41],
            })}
          >
            <Popup>{alumnus.name}</Popup>
          </Marker>
        ))}
    </>
  )
}

const initialPosition = new LatLng(35.681236, 139.767125)

const FitBounds = ({ alumni }: { alumni: Alumnus[] }) => {
  const map = useMap()

  useEffect(() => {
    const validAlumni = alumni.filter((a) => a.latitude && a.longitude)
    if (validAlumni.length > 0) {
      map.fitBounds(validAlumni.map((l) => [l.latitude, l.longitude]))
    }
  }, [map, alumni])

  return null
}

export const Map: FC = () => {
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MapContainer
          center={initialPosition}
          zoom={15}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ZoomComponent />
          <FitBounds alumni={alumni} />
        </MapContainer>
      </div>
    </>
  )
}
