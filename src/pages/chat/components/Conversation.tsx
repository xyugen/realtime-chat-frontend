import { useParams } from "@solidjs/router"
import { Component } from "solid-js"

interface ConversationParams {
    [key: string]: string,
    id: string
}

const Conversation: Component = () => {
    const params = useParams<ConversationParams>();
    return (
        <div>{params.id}</div>
    )
}

export default Conversation