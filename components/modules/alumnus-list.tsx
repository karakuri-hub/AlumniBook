import { ComponentProps, FC, useEffect, useState } from "react"
import { alumniAtom, selectedAlumniAtom } from "lib/store"
import { useAtom } from "jotai"
import { alumni as allAlumi } from "lib/constant"

const AlumnusListComponent: FC<ComponentProps<"div">> = ({
  style,
  ...props
}) => {
  const [alumni, setAlumni] = useAtom(alumniAtom)
  const [selectedAlumni, setSelectedAlumni] = useAtom(selectedAlumniAtom)
  const [alumnusFilter, setAlumnusFilter] = useState<{
    name: string
    countryNames: string[]
    completionYears: number[]
    hasPosition: boolean
  }>({
    name: "",
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
        .filter(
          (alumnus) =>
            alumnusFilter.name.length == 0 ||
            alumnus.name
              .toLocaleLowerCase()
              .includes(alumnusFilter.name.toLocaleLowerCase())
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
      <div style={{ padding: ".5rem" }}>
        <div style={{ fontSize: ".75rem" }}>Completion year</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
            padding: ".25rem 0",
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
      </div>
      <div style={{ padding: ".5rem" }}>
        <div style={{ fontSize: ".75rem" }}>Name</div>
        <input
          style={{
            border: "1px solid #ccc",
            borderRadius: "1rem",
            padding: ".25rem .75rem",
          }}
          value={alumnusFilter.name}
          onChange={({ target: { value } }) =>
            setAlumnusFilter({ ...alumnusFilter, name: value })
          }
        />
      </div>
      {alumni.map((alumnus, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #ccc",
            padding: ".5rem",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={selectedAlumni.includes(alumnus)}
              onChange={({ target: { checked } }) =>
                setSelectedAlumni(
                  checked
                    ? [...selectedAlumni, alumnus]
                    : selectedAlumni.filter((a) => a !== alumnus)
                )
              }
            />
            &nbsp;
            {alumnus.name}
          </label>
          <p style={{ color: "#666", fontSize: ".75rem" }}>
            {alumnus.countryName}&nbsp;{alumnus.completionYear}&nbsp;
            {alumnus.course}
          </p>
          <p style={{ color: "#999", fontSize: ".6rem" }}>
            {alumnus.affiliationName}
          </p>
        </div>
      ))}
    </div>
  )
}
export default AlumnusListComponent
