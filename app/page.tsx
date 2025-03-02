"use client"

import AlumnusListComponent from "components/modules/alumnus-list"
import dynamic from "next/dynamic"
import { FC, useEffect, useState } from "react"
const Map = dynamic(() => import("components/modules/map").then((c) => c.Map), {
  ssr: false,
})

const IndexPage: FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(true)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-aspect-ratio: 1/1)")
    setIsLandscape(mediaQuery.matches)
    const handleChange = () => setIsLandscape(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <section
      style={{
        display: "flex",
        flexDirection: isLandscape ? "column" : "row",
        flexWrap: "wrap",
        height: isLandscape ? "100vh" : "80vh",
        width: isLandscape ? "80vw" : "100vw",
      }}
    >
      <Map />
      <AlumnusListComponent />
    </section>
  )
}

export default IndexPage
