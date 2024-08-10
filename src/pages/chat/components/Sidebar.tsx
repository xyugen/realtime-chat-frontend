import { Button, Input, Modal } from "@/components";
import { Component, createSignal, onMount } from "solid-js";
import Resizable from "@corvu/resizable";
import ChatItem from "./ChatItem";
import { getConversations } from "@/services/api";
import { clearSession, getSession } from "@/lib/auth";
import { toast } from "solid-sonner";
import { LogOut, MessageSquarePlus } from "lucide-solid";
import { useNavigate } from "@solidjs/router";
import CreateConversationForm from "./CreateConversationForm";

const Sidebar: Component = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = createSignal<Conversation[]>([])
  const [showModal, setShowModal] = createSignal<Boolean>(false);
  const [search, setSearch] = createSignal<string>("");
  const { user } = getSession();

  onMount(() => {
    getAllConversations();
  });

  const getAllConversations = (username?: string) => {
    if (!user) return;
    getConversations(username)
      .then((res) => {
        const data = res.data;
        setConversations(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      })
    }

  const handleCreateConversation = () => {
    setShowModal(true);
  }

  const handleSearch = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);

    // TODO: implement search
    if (!target.value.trim()) {
      getAllConversations();
      return;
    }

    getAllConversations(target.value);
  }

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  }

  return (
      <Resizable.Panel initialSize={0.3} minSize={0.2} maxSize={0.5} class="flex flex-col bg-white border-r border-seagull-200">
        {/* Search */}
        <div class="p-4">
          <Input id="search" class="w-full" type="text" placeholder="Search" value={search()} onInput={handleSearch} />
        </div>

        <hr class="border-seagull-200" />

        {/* Chats */}
        <div class="flex flex-col flex-1 overflow-y-scroll">
          {/* Chat */}
          {conversations().map((conversation) => (
            <ChatItem
              id={conversation.id}
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

          <Modal show={showModal()} onClose={() => setShowModal(false)}>
            <h1 class="text-lg font-semibold mb-2">Create Conversation</h1>
            <CreateConversationForm onCreate={getAllConversations}/>
          </Modal>
        </div>
      </Resizable.Panel>
  )
}

export default Sidebar