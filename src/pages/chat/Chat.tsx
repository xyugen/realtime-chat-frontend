import { Input } from "@/components"
import { Component, createSignal } from "solid-js"
import Resizable from '@corvu/resizable'
import { makePersisted } from '@solid-primitives/storage'

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
        <div class="flex flex-row">
          {/* Chat */}
          <div class="w-full p-4 max-h-20 h-20 border-b border-seagull-200 hover:bg-seagull-100/30 active:bg-seagull-100/45 cursor-pointer select-none">
            <div class="flex justify-between">
              <h2 class="text-base">Anthony</h2>
              <small class="text-gray-500">13:22</small>
            </div>
            <p class="text-sm text-gray-500 overflow-hidden text-ellipsis h-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur error inventore earum amet, quibusdam iste voluptatem explicabo quaerat nam delectus dignissimos, pariatur autem optio.
            </p>
          </div>
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