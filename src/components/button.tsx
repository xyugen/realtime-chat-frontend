import { cn } from "@/lib/utils"

const Button = (
    props:
    {
        type?: "button" | "submit" | "reset",
        onClick?: any,
        class?: string,
        children?: any,
        disabled?: boolean
    }
) => {
  return (
    <button
        onClick={props.onClick}
        type={props.type}
        class={cn("w-full bg-seagull-500 hover:bg-seagull-500/80 h-9 transition-colors text-white font-bold cursor-pointer p-1 rounded disabled:opacity-50 disabled:hover:bg-seagull-500 disabled:cursor-default flex justify-center items-center", props.class)}
        disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button