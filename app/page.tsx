"use client"

import dynamic from "next/dynamic"
import { FC } from "react"
const Map = dynamic(() => import("components/modules/map").then((c) => c.Map), {
  ssr: false,
})

const IndexPage: FC = () => {
  return (
    <section style={{ height: "100vh" }}>
      <Map />
    </section>
  )
}

export default IndexPage
