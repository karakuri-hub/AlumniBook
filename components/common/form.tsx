import { ComponentProps, FC } from "react"

export const TextField: FC<ComponentProps<"input">> = ({ style, ...props }) => {
  return (
    <>
      <input
        {...props}
        style={{
          border: "1px solid #ccc",
          borderRadius: ".5rem",
          padding: ".25rem .75rem",
          ...style,
        }}
      />
    </>
  )
}

export const MultiplelLineTextField: FC<ComponentProps<"textarea">> = ({
  style,
  ...props
}) => {
  return (
    <>
      <textarea
        {...props}
        style={{
          border: "1px solid #ccc",
          borderRadius: ".5rem",
          padding: ".25rem .75rem",
          ...style,
        }}
      />
    </>
  )
}
