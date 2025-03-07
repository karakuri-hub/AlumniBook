import { Dialog } from "components/common/dialog"
import { useAtom } from "jotai"
import { settingsAtom } from "lib/store"
import { FC, useState } from "react"

export const SettingsModal: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>()
  const [settings, setSettings] = useAtom(settingsAtom)
  return (
    <>
      <div
        style={{
          cursor: "pointer",
          fontSize: ".75rem",
          textDecoration: "underline",
        }}
        onClick={() => setIsOpenModal(true)}
      >
        Settings
      </div>
      {isOpenModal && (
        <Dialog open={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <section>
            <h2>Settings</h2>
            <b>Include group</b>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
              }}
            >
              {(["IISEE", "ICHARM"] as ("IISEE" | "ICHARM")[]).map((group) => (
                <label key={group}>
                  <input
                    type="checkbox"
                    checked={settings.included?.includes(group) ?? false}
                    onChange={({ target: { checked } }) =>
                      setSettings({
                        ...settings,
                        included: checked
                          ? [...(settings.included ?? []), group]
                          : (settings.included ?? []).filter(
                              (i) => i !== group
                            ),
                      })
                    }
                  />
                  &nbsp;{group}
                </label>
              ))}
            </div>
            <b>Country highlight</b>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={settings?.isHighlightedCountried ?? false}
                  onChange={({ target: { checked } }) =>
                    setSettings({
                      ...settings,
                      isHighlightedCountried: checked,
                    })
                  }
                />
                &nbsp;Highlighted
              </label>
            </div>
          </section>
        </Dialog>
      )}
    </>
  )
}
