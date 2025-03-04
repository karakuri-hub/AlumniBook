"use client"

import { Dialog } from "components/common/dialog"
import AlumnusListComponent from "components/modules/alumnus-list"
import { useAtom } from "jotai"
import { selectedAlumnusAtom } from "lib/store"
import dynamic from "next/dynamic"
import { FC, useEffect, useState } from "react"
const Map = dynamic(() => import("components/modules/map").then((c) => c.Map), {
  ssr: false,
})

const IndexPage: FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(true)
  const [selectedAlumnus, setSelectedAlumnus] = useAtom(selectedAlumnusAtom)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-aspect-ratio: 1/1)")
    setIsLandscape(mediaQuery.matches)
    const handleChange = () => setIsLandscape(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          flexWrap: "wrap",
          height: isLandscape && "100dvh",
          width: !isLandscape && "100dvw",
        }}
      >
        <Map
          style={{
            height: isLandscape ? "100dvh" : "50dvh",
            width: isLandscape ? "70dvw" : "100dvw",
          }}
        />
        <AlumnusListComponent
          style={{
            width: isLandscape ? "30dvw" : "100%",
          }}
        />
      </section>
      {selectedAlumnus && (
        <Dialog
          open={selectedAlumnus !== undefined}
          onClose={() => {
            setSelectedAlumnus(undefined)
          }}
        >
          <section style={{ padding: ".5rem" }}>
            <h3>{selectedAlumnus.name}</h3>
            <p>
              {selectedAlumnus.completionYear}&nbsp;{selectedAlumnus.course}
            </p>
            <p>{selectedAlumnus.affiliationName}</p>
            <p>{selectedAlumnus.countryName}</p>
            <p>{selectedAlumnus.address}</p>
            <p>
              <a href={selectedAlumnus.url} target="_blank">
                {selectedAlumnus.paperTitle}
              </a>
            </p>
          </section>
        </Dialog>
      )}
    </>
  )
}

export default IndexPage
