import { Input } from "@/components";
import { Component, createSignal, onMount } from "solid-js";
import Resizable from "@corvu/resizable";
import ChatItem from "./ChatItem";
import { getConversations } from "@/services/api";
import { getSession } from "@/lib/auth";
import { toast } from "solid-sonner";

const Sidebar: Component = () => {
  const [conversations, setConversations] = createSignal<Conversation[]>([])
  const { user } = getSession();

  onMount(() => {
    if (!user) return;
    getConversations()
      .then((res) => {
        const data = res.data;
        setConversations(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      })
  })

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
          {conversations().map((conversation) => (
            <ChatItem
              id={conversation.id}
              // name={conversation.name}
              time={conversation.updatedAt}
            />
          ))

          }
        </div>
      </Resizable.Panel>
  )
}

export default Sidebar