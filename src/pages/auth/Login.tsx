import { Component, createSignal, Match, Switch } from "solid-js"
import { Input, Label, ShinyHeader, Button, Link, PasswordInput } from "@/components"
import { z } from "zod"
import { toast } from "solid-sonner"
import axios from "axios"
import { LoaderCircle } from "lucide-solid"
import { createStore } from "solid-js/store"
import { login } from "@/services/api"
import { useNavigate } from "@solidjs/router"
import { getSession } from "@/lib/auth"
import { capitalizeFirstLetter } from "@/lib/utils"

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
  const navigate = useNavigate();
  const [form, setForm] = createStore<z.infer<typeof loginSchema>>({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = createSignal(false);
  const { user } = getSession();

  if (user) {
    navigate('/c', { replace: true });
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = loginSchema.safeParse({
      username: form.username,
      password: form.password,
    })

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    login({ username: form.username, password: form.password })
      .then((res) => {
        if (res.status === 200) {
            toast.success("Login successful");
            localStorage.setItem("jwt_token", res.data.token);
            navigate('/c');
        }
      }).catch((err) => {
        const errorMessage: string = capitalizeFirstLetter(err.response.data.error);
        toast.error(errorMessage || err.message);
      }).finally(() => {
        setIsLoading(false);
        setForm({ password: '' });
      });
  }

  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <ShinyHeader>Login</ShinyHeader>
        <form action='/' onSubmit={handleSubmit} class='flex flex-col gap-2 w-full'>
          <div class='flex flex-col'>
            <Label for='username'>Username:</Label>
            <Input id='username' type='text' value={form.username} onChange={(e: any) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div class='flex flex-col'>
            <Label for='password'>Password:</Label>
            <PasswordInput id='password' value={form.password} onChange={(e: any) => setForm({ ...form, password: e.target.value })} class="w-full" required />
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
        <p class='text-sm text-center'>Don't have an account? <Link href="/register" class="text-seagull-500">Create Account</Link></p>
      </div>
  )
}

export default Login