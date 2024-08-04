import { Component } from "solid-js"
import { Input, Label } from "./components/"
import { A } from "@solidjs/router"
import ShinyHeader from "./components/shiny-header"

const Login: Component = () => {
  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <ShinyHeader>Login</ShinyHeader>
        <form action='/' class='flex flex-col gap-2'>
          <div class='flex flex-col'>
            <Label for='username'>Username:</Label>
            <Input id='username' type='text' placeholder="username" required />
          </div>
          <div class='flex flex-col'>
            <Label for='password'>Password:</Label>
            <Input id='password' type='password' required />
          </div>
          <br />
          <input type="submit" value='LOGIN' class='bg-seagull-500 hover:bg-seagull-500/80 h-9 transition-colors text-white font-bold cursor-pointer p-1 rounded' />
        </form>
        <p class='text-sm text-center'>Don't have an account? <A href="/register" class="text-seagull-500">Create Account</A></p>
      </div>
  )
}

export default Login