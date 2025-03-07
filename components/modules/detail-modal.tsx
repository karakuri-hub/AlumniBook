import { Dialog } from "components/common/dialog"
import { FC, FormEvent, useState } from "react"
import { useAtom } from "jotai"
import { selectedAlumnusAtom } from "lib/store"
import { Tag } from "components/common/tag"
import { MultiplelLineTextField, TextField } from "components/common/form"
import { UserIcon } from "components/svg/user-icon"

export const DetailModal: FC = () => {
  const [selectedAlumnus, setSelectedAlumnus] = useAtom(selectedAlumnusAtom)
  const [isOpenReportForm, setIsOpenReportForm] = useState<boolean>(false)
  const handleSubmitReport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpenReportForm(false)
  }
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
                backgroundImage:
                  selectedAlumnus.image && `url(${selectedAlumnus.image})`,
                backgroundSize: "cover",
                height: "5rem",
                width: "5rem",
              }}
            >
              {!selectedAlumnus.image && <UserIcon width={80} height={80} />}
            </figure>
            <p>
              {selectedAlumnus.completionYear}&nbsp;{selectedAlumnus.course}
              &nbsp;{selectedAlumnus.countryName}
            </p>
            <p>Affiliation:&nbsp;{selectedAlumnus.affiliationName}</p>

            <p>Affiliation address:&nbsp;{selectedAlumnus.address}</p>
            <p>
              Paper:&nbsp;
              <a href={selectedAlumnus.url} target="_blank">
                {selectedAlumnus.paperTitle}
              </a>
            </p>
            <p>Contact:&nbsp;{selectedAlumnus.email ?? "No data"}</p>
          </section>
          <section style={{ padding: ".5rem" }}>
            {!isOpenReportForm && (
              <u
                style={{
                  cursor: "pointer",
                  fontSize: ".8rem",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setIsOpenReportForm(!isOpenReportForm)
                }}
              >
                If you have any corrections to make, please report them here.
              </u>
            )}
            {isOpenReportForm && (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                  padding: ".5rem",
                }}
                onSubmit={handleSubmitReport}
              >
                <h4>Report</h4>
                <TextField placeholder="Email" />
                <MultiplelLineTextField placeholder="Report content" />
                <Tag active={true}>Submit</Tag>
              </form>
            )}
          </section>
        </Dialog>
      )}
    </>
  )
}
