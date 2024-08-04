import { Component, createSignal } from "solid-js"
import { Input, Label } from "./components"
import { A } from "@solidjs/router"
import ShinyHeader from "./components/shiny-header"
import { toast } from "solid-sonner"
import { z } from "zod"

const registerSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }).trim().min(4, { message: "Username must be at least 4 characters" }),
    password: z.string({ required_error: "Password is required" }).trim().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string({ required_error: "Confirm password is required" }).trim().min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

const Register: Component = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse({
      username: username(),
      password: password(),
      confirmPassword: confirmPassword()
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // TODO: Implement registration
  }

  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <ShinyHeader>Create an Account</ShinyHeader>
        <form onSubmit={handleSubmit} class='flex flex-col gap-2'>
          <div class='flex flex-col'>
            <Label for='username'>Username:</Label>
            <Input id='username' type='text' value={username()} onChange={(e: any) => setUsername(e.target.value)} required />
          </div>
          <div class='flex flex-col'>
            <Label for='password'>Password:</Label>
            <Input id='password' type='password' value={password()} onChange={(e: any) => setPassword(e.target.value)} required />
          </div>
          <div class="flex flex-col">
            <Label for='confirm-password'>Confirm Password:</Label>
            <Input id='confirm-password' type='password' value={confirmPassword()} onChange={(e: any) => setConfirmPassword(e.target.value)} required />
          </div>
          <br />
          <input type="submit" value='REGISTER' class='bg-seagull-500 hover:bg-seagull-500/80 h-9 transition-colors text-white font-bold cursor-pointer p-1 rounded' />
        </form>
        <p class='text-sm text-center'>Already have an account? <A href="/" class="text-seagull-500">Sign In</A></p>
      </div>
  )
}

export default Register