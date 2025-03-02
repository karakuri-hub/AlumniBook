import { FC } from "react"
import { alumni } from "lib/constant"

const AlumnusListComponent: FC = ({}) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 5px rgb(0 0 0 / .5)",
        height: "100%",
        overflowY: "scroll",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <h1>AlumniBook</h1>
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
