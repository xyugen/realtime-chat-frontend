import { Input } from "@/components"
import { Component, createSignal } from "solid-js"
import Resizable from '@corvu/resizable'
import { makePersisted } from '@solid-primitives/storage'
import ChatItem from "./components/ChatItem"

const Chat: Component = () => {
  const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
    name: 'resizable-sizes',
  })

  return (
    <Resizable sizes={sizes()} onSizesChange={setSizes} orientation="horizontal" class="flex flex-row size-full">
      {/* Sidebar */}
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

      <Resizable.Handle
        aria-label="Resize Handle"
        class="group basis-2"
      >
        <div class="h-full w-[1px] border-l border-seagull-300 transition-colors corvu-group-active:border-seagull-300 corvu-group-dragging:border-seagull-200" />
      </Resizable.Handle>

      <Resizable.Panel initialSize={0.7} minSize={0.2} maxSize={0.8}>
        {/* <div class="bg-red-500 p-4 h-full"></div> */}
      </Resizable.Panel>
      
      {/* <Resizable.Panel>

      </Resizable.Panel> */}
    </Resizable>
  )
}

export default Chat