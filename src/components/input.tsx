import { cn } from "@/lib/utils"

const Input = (
  { id, type, value = '', className, placeholder, required }:
  { id?: string, type?: string, value?: string, className?: string, placeholder?: string, required?: boolean }
) => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      class={cn('p-1 border-2 bg-seagull-200 border-seagull-200 hover:bg-seagull-100 text-seagull-800 font-medium placeholder:text-seagull-800/40 hover:border-seagull-100 hover:cursor-pointer focus-visible:cursor-text focus-visible:bg-white focus-visible:text-slate-950 focus-visible:border-seagull-500 disabled:cursor-not-allowed disabled:opacity-50 rounded outline-none transition-colors h-9', className)}
      required={required}
    />
  )
}

export default Input