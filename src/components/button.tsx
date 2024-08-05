import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "w-full h-9 transition-colors font-bold cursor-pointer p-1 rounded border disabled:opacity-50 shadow disabled:cursor-default flex justify-center items-center",
  {
    variants: {
      variant: {
        default:
          "bg-seagull-500 hover:bg-seagull-500/80 text-white border-seagull-500 hover:border-seagull-500/80 disabled:hover:bg-seagull-500",
        outline:
          "bg-transparent hover:bg-seagull-200/80 text-seagull-600 border-seagull-500 hover:bg-seagull-500 hover:text-white disabled:hover:bg-seagull-200",
        ghost:
          "bg-transparent hover:bg-seagull-200 text-seagull-600 border-none disabled:hover:bg-transparent",
        destructive:
          "bg-red-500 hover:bg-red-500/80 text-white border-red-500 hover:border-red-500/80 disabled:hover:bg-red-500",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Button = (
    props:
    {
      variant?: VariantProps<typeof buttonVariants>["variant"],
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
        class={cn(buttonVariants({ variant: props.variant, class: props.class }))}
        disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button