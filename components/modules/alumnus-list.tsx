import { ComponentProps, FC, useEffect, useState } from "react"
import { alumniAtom } from "lib/store"
import { useAtom } from "jotai"
import { alumni as allAlumi } from "lib/constant"

const AlumnusListComponent: FC<ComponentProps<"div">> = ({
  style,
  ...props
}) => {
  const [alumni, setAlumni] = useAtom(alumniAtom)
  const [alumnusFilter, setAlumnusFilter] = useState<{
    countryNames: string[]
    completionYears: number[]
    hasPosition: boolean
  }>({
    countryNames: [],
    completionYears: [2023, 2022, 2021, 2020, 2019, 2018],
    hasPosition: true,
  })
  useEffect(() => {
    setAlumni(
      allAlumi
        .filter(
          (alumnus) =>
            !alumnusFilter.hasPosition ||
            (alumnus.latitude && alumnus.longitude)
        )
        .filter(
          (alumnus) =>
            alumnusFilter.countryNames.length === 0 ||
            alumnusFilter.countryNames.includes(alumnus.countryName)
        )
        .filter((alumnus) =>
          alumnusFilter.completionYears.includes(alumnus.completionYear)
        )
    )
  }, [alumnusFilter])
  return (
    <div
      {...props}
      style={{
        boxShadow: "0px 0px 5px rgb(0 0 0 / .5)",
        height: "100%",
        overflowY: "scroll",
        zIndex: 1000,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
          padding: ".5rem",
        }}
      >
        {[2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
          <div
            key={year}
            style={{
              border: "1px solid",
              borderColor: alumnusFilter.completionYears.includes(year)
                ? "#666"
                : "#ccc",
              borderRadius: "1rem",
              fontSize: ".75rem",
              padding: ".15rem .5rem",
            }}
            onClick={() =>
              setAlumnusFilter({
                ...alumnusFilter,
                completionYears: alumnusFilter.completionYears.includes(year)
                  ? alumnusFilter.completionYears.filter((y) => y !== year)
                  : [...alumnusFilter.completionYears, year],
              })
            }
          >
            {year}
          </div>
        ))}
      </div>
      {alumni.map((alumnus, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #ccc",
            padding: ".5rem",
          }}
        >
          <p>{alumnus.name}</p>
          <p style={{ fontSize: ".75rem" }}>
            {alumnus.countryName}&nbsp;{alumnus.completionYear}&nbsp;
            {alumnus.course}
          </p>
        </div>
      ))}
    </div>
  )
}
export default AlumnusListComponent
