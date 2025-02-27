"use client"

import dynamic from "next/dynamic"
import { FC, useEffect, useState } from "react"
const Map = dynamic(() => import("components/modules/map").then((c) => c.Map), {
  ssr: false,
})

const IndexPage: FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(
    window.matchMedia("(min-aspect-ratio: 1/1)").matches
  )
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-aspect-ratio: 1/1)")
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
      <div
        style={{
          boxShadow: "0px 0px 5px rgb(0 0 0 / .5)",
          height: "100%",
          padding: "1rem",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <h1>AlumniBook</h1>
      </div>
    </section>
  )
}

export default IndexPage
