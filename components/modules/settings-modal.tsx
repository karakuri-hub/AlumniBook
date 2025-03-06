import { Dialog } from "components/common/dialog"
import { FC, useState } from "react"

export const SettingsModal: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  return (
    <>
      <button onClick={() => setIsOpenModal(true)}>Settings</button>
      {isOpenModal && <Dialog onClose={() => setIsOpenModal(false)} />}
    </>
  )
}
