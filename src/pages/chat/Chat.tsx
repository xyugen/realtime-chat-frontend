import { Component, createSignal } from "solid-js"
import Resizable from '@corvu/resizable'
import { makePersisted } from '@solid-primitives/storage'
import Sidebar from "./components/Sidebar"

const Chat: Component = () => {
  const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
    name: 'resizable-sizes',
  })

  return (
    <Resizable sizes={sizes()} onSizesChange={setSizes} orientation="horizontal" class="flex flex-row size-full">
      {/* Sidebar */}
      <Sidebar />

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