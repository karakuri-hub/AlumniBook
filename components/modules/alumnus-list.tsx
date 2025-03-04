import { ComponentProps, FC, useEffect, useState } from "react"
import { alumniAtom, selectedAlumniAtom } from "lib/store"
import { useAtom } from "jotai"
import { alumni as allAlumi } from "lib/constant/alumni"
import { Dialog } from "components/common/dialog"
import { Button } from "components/common/button"
import { allCountries } from "lib/constant/country"
import { Tag } from "components/common/tag"

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
  const [isOpenContryDialog, setIsOpenCountryDialog] = useState<boolean>(false)
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
        .filter(
          (alumnus) =>
            alumnusFilter.completionYears.length === 0 ||
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
            <Tag
              key={year}
              active={alumnusFilter.completionYears.includes(year)}
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
            </Tag>
          ))}
        </div>
      </div>
      <div style={{ padding: ".5rem" }}>
        <div style={{ fontSize: ".75rem" }}>Country</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
            padding: ".5rem 0",
          }}
        >
          {alumnusFilter.countryNames.map((c) => (
            <Tag active={true}>{c}</Tag>
          ))}
        </div>
        <Tag onClick={() => setIsOpenCountryDialog(true)} active={true}>
          Select
        </Tag>
        <Dialog
          open={isOpenContryDialog}
          onClose={() => setIsOpenCountryDialog(false)}
        >
          <section>
            <h3>Select Countries</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: ".5rem",
                padding: ".5rem 0",
              }}
            >
              {allCountries
                .filter((c) =>
                  allAlumi
                    .filter((a) => !!a.address)
                    .find((a) => a.countryName == c)
                )
                .map((country) => (
                  <Tag
                    key={country}
                    active={alumnusFilter.countryNames.includes(country)}
                    onClick={() =>
                      setAlumnusFilter({
                        ...alumnusFilter,
                        countryNames: alumnusFilter.countryNames.includes(
                          country
                        )
                          ? alumnusFilter.countryNames.filter(
                              (c) => c !== country
                            )
                          : [...alumnusFilter.countryNames, country],
                      })
                    }
                  >
                    {country}&nbsp;
                    <span style={{ fontSize: ".5rem" }}>
                      {
                        allAlumi
                          .filter((a) => !!a.address)
                          .filter((a) => a.countryName == country).length
                      }
                    </span>
                  </Tag>
                ))}
            </div>
          </section>
        </Dialog>
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
