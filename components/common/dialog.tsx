import { ComponentProps, FC, useEffect, useRef } from "react"
import { Button } from "./button"
import { Tag } from "./tag"

export const Dialog: FC<ComponentProps<"dialog"> & { onClose: () => void }> = ({
  onClose,
  style,
  open,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (open) {
      ref.current.showModal()
    } else {
      ref.current.close()
    }
  }, [open])
  return (
    <>
      <dialog
        style={{
          border: "none",
          boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.3)",
          inlineSize: "min(48rem, 90vw)",
          inset: 0,
          margin: "auto",
          maxBlockSize: "80dvh",
          overflow: "scroll",
          padding: "1rem",
          ...style,
        }}
        ref={ref}
        {...props}
      >
        <section>{children}</section>
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          <Tag onClick={onClose} active={true}>
            Close
          </Tag>
        </section>
      </dialog>
    </>
  )
}
