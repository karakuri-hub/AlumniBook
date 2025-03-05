import { Dialog } from "components/common/dialog"
import { FC } from "react"
import { useAtom } from "jotai"
import { selectedAlumnusAtom } from "lib/store"

export const DetailModal: FC = () => {
  const [selectedAlumnus, setSelectedAlumnus] = useAtom(selectedAlumnusAtom)
  return (
    <>
      {selectedAlumnus && (
        <Dialog
          open={selectedAlumnus !== undefined}
          onClose={() => {
            setSelectedAlumnus(undefined)
          }}
        >
          <section style={{ padding: ".5rem" }}>
            <h3>{selectedAlumnus.name}</h3>
            <figure
              style={{
                backgroundImage: `url(${"/images/user-placeholder.png"})`,
                backgroundSize: "cover",
                height: "5rem",
                width: "5rem",
              }}
            ></figure>
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
