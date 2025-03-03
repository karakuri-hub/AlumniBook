import { ComponentProps, FC } from "react"
import { Button } from "./button"

export const Dialog: FC<ComponentProps<"dialog"> & { onClose: () => void }> = ({
  onClose,
  style,
  open,
  children,
  ...props
}) => {
  return (
    <>
      <dialog
        style={{
          border: "none",
          boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.3)",
          inlineSize: "min(48rem, 80vw)",
          inset: 0,
          margin: "auto",
          maxBlockSize: "80dvh",
          overflow: "scroll",
          padding: "1rem",
          ...style,
        }}
        open={open}
        {...props}
      >
        <section>{children}</section>
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={onClose}>Close</Button>
        </section>
      </dialog>
    </>
  )
}
