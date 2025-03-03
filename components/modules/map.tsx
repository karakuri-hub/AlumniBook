"use client"

import { FC, useEffect, useRef, useState } from "react"
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
import { useAtom, useAtomValue } from "jotai"
import { alumniAtom, selectedAlumniAtom } from "lib/store"
import L from "leaflet"

const convertLatLng = (lat: number, lng: number, zoom: number) => {
  const rank = Math.max(10 ** Math.ceil((zoom - 10) / 2), 10)
  return new LatLng(
    Math.round(lat * rank) / rank,
    Math.round(lng * rank) / rank
  )
}

const ZoomComponent = ({ alumni }: { alumni: Alumnus[] }) => {
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
          <MakerComponent key={i} alumnus={alumnus} zoomLevel={zoomLevel} />
        ))}
    </>
  )
}

const MakerComponent = ({
  alumnus,
  zoomLevel,
}: {
  alumnus: Alumnus
  zoomLevel: number
}) => {
  const markerRef = useRef<L.Marker>(null)
  const [selectedAlumni, setSelectedAlumni] = useAtom(selectedAlumniAtom)
  useEffect(() => {
    if (markerRef.current) {
      if (selectedAlumni.includes(alumnus)) {
        markerRef.current.openPopup()
      } else {
        markerRef.current.closePopup()
      }
    }
  }, [selectedAlumni])
  return (
    <Marker
      eventHandlers={{
        popupclose: () =>
          setSelectedAlumni(selectedAlumni.filter((a) => a !== alumnus)),
        popupopen: () => setSelectedAlumni([...selectedAlumni, alumnus]),
      }}
      ref={markerRef}
      position={convertLatLng(alumnus.latitude, alumnus.longitude, zoomLevel)}
      icon={icon({
        iconUrl: iconImage.src,
        iconSize: [25, 41],
        iconAnchor: [25, 41],
        popupAnchor: [-12, -41],
      })}
    >
      <Popup autoClose={false}>
        <div style={{ fontWeight: "bold" }}>{alumnus.name}</div>
        <div>{alumnus.affiliationName}</div>
      </Popup>
    </Marker>
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
  const alumni = useAtomValue(alumniAtom)
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
          <ZoomComponent alumni={alumni} />
          <FitBounds alumni={alumni} />
        </MapContainer>
      </div>
    </>
  )
}
