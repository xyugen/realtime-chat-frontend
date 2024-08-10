import { cn } from "@/lib/utils"
import { Component } from "solid-js"

interface InputProps {
  id?: string
  type?: string
  value?: string
  class?: string
  placeholder?: string
  onInput?: (e: InputEvent) => void
  onChange?: any
  required?: boolean
}

const Input: Component<InputProps> = (
  props
) => {
  return (
    <input
      id={props.id}
      name={props.id}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onInput={props.onInput}
      onChange={props.onChange}
      class={cn('p-1 border-2 bg-seagull-200 border-seagull-200 hover:bg-seagull-100 text-seagull-800 font-medium placeholder:text-seagull-800/40 hover:border-seagull-100 hover:cursor-pointer focus-visible:cursor-text focus-visible:bg-white focus-visible:text-slate-950 focus-visible:border-seagull-500 disabled:cursor-not-allowed disabled:opacity-50 rounded outline-none transition-colors h-9', props.class)}
      required={props.required}
    />
  )
}

export default Input