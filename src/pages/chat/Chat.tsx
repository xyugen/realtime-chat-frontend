import { Component, createSignal, JSX } from "solid-js"
import Resizable from '@corvu/resizable'
import { makePersisted } from '@solid-primitives/storage'
import Sidebar from "./components/Sidebar"

interface ChatProps {
  children?: JSX.Element
}

const Chat: Component<ChatProps> = (props) => {
  const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
    name: 'resizable-sizes',
  })

  return (
    <Resizable sizes={sizes()} onSizesChange={setSizes} orientation="horizontal" class="flex flex-row size-full">
      {/* Sidebar */}
      <Sidebar />

      <Resizable.Handle
        aria-label="Resize Handle"
        class="group relative"
      >
        <div class="absolute top-0 left-0 h-full w-2 border-l border-seagull-300 transition-colors corvu-group-active:border-seagull-300 corvu-group-dragging:border-seagull-200" />
      </Resizable.Handle>

      <Resizable.Panel initialSize={0.7} minSize={0.2} maxSize={0.8}>
        {props.children}
      </Resizable.Panel>
      
      {/* <Resizable.Panel>

      </Resizable.Panel> */}
    </Resizable>
  )
}

export default Chat