"use client"

import { ComponentProps, FC, useEffect, useRef, useState } from "react"
import {
  GeoJSON,
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
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import {
  alumniAtom,
  alumnusFilterAtom,
  selectedAlumniAtom,
  selectedAlumnusAtom,
  settingsAtom,
} from "lib/store"
import L from "leaflet"
import { Tag } from "components/common/tag"
import { geoJsonData } from "lib/constant/country"

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
  const setSelectedAlumnus = useSetAtom(selectedAlumnusAtom)
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
      position={new LatLng(alumnus.latitude, alumnus.longitude)}
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
        <div style={{ paddingTop: ".5rem" }}>
          <Tag onClick={() => setSelectedAlumnus(alumnus)}>Detail</Tag>
        </div>
      </Popup>
    </Marker>
  )
}

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

export const Map: FC<ComponentProps<"div">> = ({ style, ...props }) => {
  const alumni = useAtomValue(alumniAtom)
  const alumniFilter = useAtomValue(alumnusFilterAtom)
  const settings = useAtomValue(settingsAtom)
  return (
    <>
      <div style={{ ...style }} {...props}>
        <MapContainer
          zoom={15}
          minZoom={1}
          style={{
            height: "100%",
            width: "100%",
          }}
          maxBounds={[
            [-90, -210],
            [90, 210],
          ]}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <ZoomComponent alumni={alumni} />
          <FitBounds alumni={alumni} />
          {settings.isHighlightedCountried &&
            alumniFilter.countryNames.length > 0 && (
              <GeoJSON
                data={geoJsonData}
                style={(feature) => ({
                  fillColor:
                    alumniFilter.countryNames.includes(
                      feature.properties.name
                    ) && "#f00",
                  fillOpacity: 0.3,
                  weight: 1,
                  color: "white",
                })}
              />
            )}
        </MapContainer>
      </div>
    </>
  )
}
