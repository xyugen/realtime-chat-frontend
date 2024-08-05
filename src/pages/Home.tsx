import { ShinyHeader } from "@/components"
import Button from "@/components/button"
import { A, useNavigate } from "@solidjs/router"
import { Component } from "solid-js"

const Home: Component = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  return (
    <div class="flex flex-col gap-2">
        <ShinyHeader class="text-4xl md:text-5xl lg:text-7xl">Realtime Chat</ShinyHeader>
        <Button onClick={handleLogin}>Login</Button>
        <Button variant={"outline"} onClick={handleRegister}><A href="/register">Register</A></Button>
    </div>
  )
}

export default Home