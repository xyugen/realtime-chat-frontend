import { getSession } from "@/lib/auth";
import { getConversationById, getUserById } from "@/services/api";
import { useParams } from "@solidjs/router"
import { Component, createSignal, onMount } from "solid-js"
import { toast } from "solid-sonner";

interface ConversationParams {
    [key: string]: string,
    id: string
}

const Conversation: Component = () => {
    const { user } = getSession();
    const params = useParams<ConversationParams>();
    const [conversation, setConversation] = createSignal<Conversation>();

    const conversationId = parseInt(params.id!);

    onMount(async () => {
        await getConversationById(conversationId)
            .then((res) => {
                setConversation(res.data);
            })
            .catch((err) => {
                toast.error(err.message)
            });
        
        const receiver = user 
        
        console.log(conversation());
    })

    return (
        <div>{params.id}</div>
    )
}

export default Conversation