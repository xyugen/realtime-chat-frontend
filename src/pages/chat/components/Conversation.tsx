import { getSession } from "@/lib/auth";
import { getConversationById, getUserById } from "@/services/api";
import { useParams } from "@solidjs/router"
import { Component, createEffect, createSignal } from "solid-js"
import { toast } from "solid-sonner";

interface ConversationParams {
    [key: string]: string,
    id: string
}

const Conversation: Component = () => {
    const params = useParams<ConversationParams>();
    const [conversation, setConversation] = createSignal<Conversation>();
    const [otherUser, setOtherUser] = createSignal<User>();

    // Determine the other user ID
    const otherUserId = () => {
        const { user } = getSession();

        const convo = conversation();
        if (convo) {
            return convo.user1Id === user?.userId ? convo.user2Id : convo.user1Id;
        }
        return null;
    };

    createEffect(async () => {
        const conversationId = parseInt(params.id!);
        try {
            const res = await getConversationById(conversationId);
            setConversation(res.data);
            
            const userRes = await getUserById(otherUserId()!);
            setOtherUser(userRes.data);
        } catch (err: any) {
            toast.error(err.message);
        }
    });

    return (
        <div class="size-full">
            <div class="w-full p-4 bg-white border-b border-seagull-200">
                <div class="flex justify-between">
                    <h2 class="text-base">{otherUser()?.username}</h2>
                </div>
            </div>
            
        </div>
    )
}

export default Conversation