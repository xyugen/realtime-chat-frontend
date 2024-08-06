import { Component, createSignal, Match, Switch } from "solid-js"
import { Input, Label, ShinyHeader, Button, Link, PasswordInput } from "@/components"
import { toast } from "solid-sonner"
import { z } from "zod"
import { LoaderCircle } from "lucide-solid"
import { createStore } from "solid-js/store"
import { register } from "@/services/api"
import { getSession } from "@/lib/auth"
import { useNavigate } from "@solidjs/router"

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
  const navigate = useNavigate();
  const [form, setForm] = createStore<z.infer<typeof registerSchema>>({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = createSignal(false);
  const { user } = getSession();

  if (user) {
    navigate('/c', { replace: true });
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = registerSchema.safeParse({
      username: form.username,
      password: form.password,
      confirmPassword: form.confirmPassword
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    register({ username: form.username, password: form.password })
      .finally(() => {
        setIsLoading(false);
        setForm({ password: '', confirmPassword: '' });
      })
  }

  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <ShinyHeader>Create an Account</ShinyHeader>
        <form onSubmit={handleSubmit} class='flex flex-col gap-2'>
          <div class='flex flex-col'>
            <Label for='username'>Username:</Label>
            <Input id='username' type='text' value={form.username} onChange={(e: any) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div class='flex flex-col'>
            <Label for='password'>Password:</Label>
            <PasswordInput id='password' value={form.password} onChange={(e: any) => setForm({ ...form, password: e.target.value })} class="w-full" required />
          </div>
          <div class="flex flex-col">
            <Label for='confirm-password'>Confirm Password:</Label>
            <PasswordInput id='confirm-password' value={form.confirmPassword} onChange={(e: any) => setForm({ ...form, confirmPassword: e.target.value })} class="w-full" required />
          </div>
          <br />
          <div class='w-full'>
            <Button type="submit" disabled={isLoading()}>
              <Switch>
                <Match when={!isLoading()}>
                  SIGN UP
                </Match>
                <Match when={isLoading()}>
                  <LoaderCircle class="animate-spin text-white"/>
                </Match>
              </Switch>
            </Button>
          </div>
        </form>
        <p class='text-sm text-center'>Already have an account? <Link href="/login" class="text-seagull-500">Sign In</Link></p>
      </div>
  )
}

export default Register