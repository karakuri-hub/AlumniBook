import { ComponentProps, FC } from "react"

export const Button: FC<ComponentProps<"button">> = ({ style, ...props }) => (
  <button
    style={{
      background: "transparent",
      border: "1px solid #ccc",
      borderRadius: "1rem",
      padding: ".25rem .75rem",
      ...style,
    }}
    {...props}
  />
)
