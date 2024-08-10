import { Button, Input, Label, Modal } from "@/components";
import { Component, createSignal, onMount } from "solid-js";
import Resizable from "@corvu/resizable";
import ChatItem from "./ChatItem";
import { getConversations } from "@/services/api";
import { clearSession, getSession } from "@/lib/auth";
import { toast } from "solid-sonner";
import { LogOut, MessageSquarePlus } from "lucide-solid";
import { useNavigate } from "@solidjs/router";

const Sidebar: Component = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = createSignal<Conversation[]>([])
  const [showModal, setShowModal] = createSignal<Boolean>(false);
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
  });

  const handleCreateConversation = () => {
    setShowModal(true);
  }

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  }

  return (
      <Resizable.Panel initialSize={0.3} minSize={0.2} maxSize={0.5} class="flex flex-col bg-white border-r border-seagull-200">
        {/* Search */}
        <div class="p-4">
          <Input id="search" class="w-full" type="text" placeholder="Search" value="" />
        </div>

        <hr class="border-seagull-200" />

        {/* Chats */}
        <div class="flex flex-col flex-1 overflow-y-scroll">
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

        <div class="flex flex-row justify-between gap-4 p-4 border-t border-seagull-200">
          <Button variant={"default"} class="w-1/4" onClick={handleCreateConversation}>
            <MessageSquarePlus />
          </Button>
          <Button variant={"destructive"} class="w-1/6" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>

        <Modal show={showModal()} onClose={() => setShowModal(false)}>
          <h1 class="text-lg font-semibold mb-2">Create Conversation</h1>
          <form class="flex flex-col gap-2">
            <div class="flex flex-row items-center gap-2">
              <Label for="name">Username</Label>
              <Input id="name" class="w-full" type="text" placeholder="@username" value="" />
            </div>
            <Button type="submit" class="w-full">Create</Button>
          </form>
        </Modal>
      </Resizable.Panel>
  )
}

export default Sidebar