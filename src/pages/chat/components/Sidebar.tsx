import { Input } from "@/components";
import { Component } from "solid-js";
import Resizable from "@corvu/resizable";
import ChatItem from "./ChatItem";

const Sidebar: Component = () => {
  return (
      <Resizable.Panel initialSize={0.3} minSize={0.2} maxSize={0.5} class="bg-white border-r border-seagull-200">
        {/* Search */}
        <div class="p-4">
          <Input id="search" class="w-full" type="text" placeholder="Search" value="" />
        </div>

        <hr class="border-seagull-200" />

        {/* Chats */}
        <div class="flex flex-col">
          {/* Chat */}
          <ChatItem name="John Doe" time="12:00">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet architecto recusandae at vitae obcaecati reprehenderit. Ratione quas magni quam, fuga nobis atque dolore alias?
          </ChatItem>
        </div>
      </Resizable.Panel>
  )
}

export default Sidebar