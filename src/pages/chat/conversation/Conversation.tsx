import { Button, Input } from "@/components";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getConversationById, getMessages } from "@/services/api";
import { useParams } from "@solidjs/router"
import { LoaderCircle, SendHorizontal } from "lucide-solid";
import { Component, createEffect, createSignal, Match, Switch } from "solid-js"
import { toast } from "solid-sonner";

interface ConversationParams {
    [key: string]: string,
    id: string
}

const Conversation: Component = () => {
    const params = useParams<ConversationParams>();
    const [conversation, setConversation] = createSignal<Conversation>();
    const [messages, setMessages] = createSignal<Message[]>([]);
    const [otherUser, setOtherUser] = createSignal<User>();
    const [isLoading, setIsLoading] = createSignal<Boolean>(false);

    // Determine the other user
    const getOtherUser = () => {
        const { user } = getSession();
        
        const convo = conversation();
        if (convo) {
            return convo.user1?.id === user?.userId ? convo.user2 : convo.user1;
        }

        return null;
    };

    createEffect(async () => {
        const conversationId = parseInt(params.id!);
        setIsLoading(true);

        try {
            const conversationRes = await getConversationById(conversationId);
            setConversation(conversationRes.data);

            const messageRes = await getMessages(conversationId);
            setMessages(messageRes.data);
            
            setOtherUser(getOtherUser()!);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    });

    return (
        <div class="flex flex-col size-full items-center">
            <div class="sticky top-0 w-full p-4 bg-white border-b border-seagull-200">
                <div class="flex justify-between">
                    <h2 class="text-base">{otherUser()?.username}</h2>
                </div>
            </div>
            <div class="flex-1 flex flex-col w-1/2">
                <div class="flex-1">
                    <Switch>
                        <Match when={isLoading()}>
                            <div class="size-full flex justify-center items-center">
                                <LoaderCircle class="w-8 h-8 mx-auto text-seagull-500 animate-spin" />
                            </div>
                        </Match>
                        <Match when={!isLoading()}>
                            <div class="size-full flex flex-col gap-2">
                                {messages().map((message) => (
                                    <div class={getOtherUser()?.id !== message.sender?.id ? "self-end" : ""}>
                                        <small class="text-gray-500">{message.sender!.username}</small>
                                        <div class={cn("w-fit p-3 rounded", getOtherUser()?.id !== message.sender?.id ? "bg-seagull-400" : "bg-gray-300")}>
                                            <p class="text-black">{message.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Match>
                    </Switch>
                </div>
                <form class="w-full mb-4 bg-white p-3 flex flex-row gap-2 rounded-md shadow" onSubmit={(e) => e.preventDefault()}>
                    <Input class="w-full" placeholder="Type a message..." value=""/>
                    <Button type="submit" class="w-fit p-2">
                        <SendHorizontal />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Conversation