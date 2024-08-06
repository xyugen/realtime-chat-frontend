import { Component, createSignal } from "solid-js"
import Input from "./input"
import { Eye, EyeOff } from "lucide-solid"

interface PasswordInputProps {
    id?: string,
    value?: string,
    class?: string,
    required?: boolean,
    onChange?: (e: Event) => void
}

const PasswordInput: Component<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = createSignal(false);
  
  return (
    <div class="relative">
        <Input id={props.id} type={showPassword() ? 'text' : 'password'} value={props.value || ''} onChange={props.onChange} class={props.class} required={props.required} />
        <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword())}>
        {showPassword() ? <Eye class="h-5 w-5 text-seagull-800 hover:text-seagull-600 transition-colors" /> : <EyeOff class="h-5 w-5 text-seagull-800 hover:text-seagull-600 transition-colors" />}
        </button>
    </div>
  )
}

export default PasswordInput