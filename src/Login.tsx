import { Component, createSignal } from "solid-js"
import { Input, Label } from "./components/"
import { A } from "@solidjs/router"
import ShinyHeader from "./components/shiny-header"
import { z } from "zod"
import { toast } from "solid-sonner"

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).trim().min(4, { message: "Username must be at least 4 characters" }),
  password: z.string({ required_error: "Password is required" }).trim().min(6, { message: "Password must be at least 6 characters" }),
})

const Login: Component = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({
      username: username(),
      password: password(),
    })

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    
    // TODO: Implement login
  }

  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <ShinyHeader>Login</ShinyHeader>
        <form action='/' onSubmit={handleSubmit} class='flex flex-col gap-2'>
          <div class='flex flex-col'>
            <Label for='username'>Username:</Label>
            <Input id='username' type='text' placeholder="username" value={username()} onChange={(e: any) => setUsername(e.target.value)} required />
          </div>
          <div class='flex flex-col'>
            <Label for='password'>Password:</Label>
            <Input id='password' type='password' value={password()} onChange={(e: any) => setPassword(e.target.value)} required />
          </div>
          <br />
          <input type="submit" value='LOGIN' class='bg-seagull-500 hover:bg-seagull-500/80 h-9 transition-colors text-white font-bold cursor-pointer p-1 rounded' />
        </form>
        <p class='text-sm text-center'>Don't have an account? <A href="/register" class="text-seagull-500">Create Account</A></p>
      </div>
  )
}

export default Login