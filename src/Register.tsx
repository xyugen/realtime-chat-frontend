import { Component } from "solid-js"
import Input from "./components/input"
import { A } from "@solidjs/router"

const Register: Component = () => {
  return (
      <div class='bg-white flex flex-col w-3/4 md:w-3/6 lg:w-2/6 p-4 rounded-md gap-3 shadow-md'>
        <h1 class='text-4xl font-bold text-seagull-500'>Create an Account</h1>
        <form action='' class='flex flex-col gap-2'>
          <div class='flex flex-col'>
            <label for='username'>Username:</label>
            <Input id='username' type='text' required />
          </div>
          <div class='flex flex-col'>
            <label for='password'>Password:</label>
            <Input id='password' type='password' required />
          </div>
          <div class="flex flex-col">
            <label for='confirm-password'>Confirm Password:</label>
            <Input id='confirm-password' type='password' required />
          </div>
          <br />
          <input type="submit" value='LOGIN' class='bg-seagull-500 text-white font-bold cursor-pointer p-1 rounded' />
        </form>
        <p class='text-sm text-center'>Already have an account? <A href="/" class="text-seagull-500">Sign In</A></p>
      </div>
  )
}

export default Register