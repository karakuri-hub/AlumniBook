import { ComponentProps, FC } from "react"

export const Tag: FC<ComponentProps<"button"> & { active?: boolean }> = ({
  active,
  style,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        style={{
          background: active ? "#fcfcfc" : "transparent",
          border: "1px solid",
          borderColor: active ? "#666" : "#ccc",
          color: active ? "#333" : "#999",
          borderRadius: "1rem",
          fontSize: ".75rem",
          padding: ".15rem .5rem",
          ...style,
        }}
      />
    </>
  )
}
