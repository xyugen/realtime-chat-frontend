import { cn } from "@/lib/utils"
import { children, Component, JSX } from "solid-js"

interface LabelProps {
  for?: string
  class?: string
  children?: JSX.Element
}

const Label: Component<LabelProps> = (props) => {
  const safeChildren = children(() => props.children)

  return (
    <label for={props.for} class={cn("w-fit font-medium text-sm", props.class)}>
      {safeChildren()}
    </label>
  )
}

export default Label