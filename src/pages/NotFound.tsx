import { Component } from "solid-js"
import { ShinyHeader } from "../components"
import { A } from "@solidjs/router"

const NotFound: Component = () => {
  return (
    <div class="p-4 rounded h-2/3 flex flex-col justify-center items-center">
        <div class="bg-seagull-500 w-fit py-1 px-2 rounded-xl text-white">404</div>
        <ShinyHeader className="md:text-6xl lg:text-7xl p-2">
            Page Not Found
        </ShinyHeader>
        <A href="/" class="text-seagull-500 text-center font-medium hover:underline">Go Home</A>
    </div>
  )
}

export default NotFound