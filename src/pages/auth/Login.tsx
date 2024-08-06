import { Component, createSignal, Match, Switch } from "solid-js"
import { Input, Label, ShinyHeader, Button } from "@/components"
import { A } from "@solidjs/router"
import { z } from "zod"
import { toast } from "solid-sonner"
import axios from "axios"
import { config } from "@/lib/config"
import { Eye, EyeOff, LoaderCircle } from "lucide-solid"

const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(4, { message: "Username must be at least 4 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
})

const Login: Component = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = loginSchema.safeParse({
      username: username(),
      password: password(),
    })

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    // TODO: Implement login
    axios.post(`${config.serverUrl}/login`, {
      username: username(),
      password: password()
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Login successful");
      }
      // TODO: Redirect to chat
    }).catch((err) => {
      toast.error(err.response.data.message || err.message);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <ShinyHeader>Login</ShinyHeader>
        <form action='/' onSubmit={handleSubmit} class='flex flex-col gap-2 w-full'>
          <div class='flex flex-col'>
            <Label for='username'>Username:</Label>
            <Input id='username' type='text' value={username()} onChange={(e: any) => setUsername(e.target.value)} required />
          </div>
          <div class='flex flex-col'>
            <Label for='password'>Password:</Label>
            <div class="relative">
              <Input id='password' type={showPassword() ? 'text' : 'password'} value={password()} onChange={(e: any) => setPassword(e.target.value)} class="w-full pr-10" required />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword())}>
                {showPassword() ? <EyeOff class="h-5 w-5 text-seagull-800" /> : <Eye class="h-5 w-5 text-seagull-800" />}
              </button>
            </div>
          </div>
          <br />
          <div class='w-full'>
            <Button type="submit" disabled={isLoading()}>
              <Switch>
                <Match when={!isLoading()}>
                  LOGIN
                </Match>
                <Match when={isLoading()}>
                  <LoaderCircle class="animate-spin text-white"/>
                </Match>
              </Switch>
            </Button>
          </div>
        </form>
        <p class='text-sm text-center'>Don't have an account? <A href="/register" class="text-seagull-500">Create Account</A></p>
      </div>
  )
}

export default Login