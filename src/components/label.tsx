import { children, ChildrenReturn, Component } from "solid-js"

const Label = (props: { for?: string, children?: any }) => {
  const safeChildren = children(() => props.children)

  return (
    <label for={props.for} class="w-fit">
      {safeChildren()}    
    </label>
  )
}

export default Label