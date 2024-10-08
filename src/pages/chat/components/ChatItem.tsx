import { getSession } from "@/lib/auth";
import { formatTime } from "@/lib/utils";
import { getConversationById, getUserById } from "@/services/api";
import { useNavigate } from "@solidjs/router";
import { children, Component, createSignal, JSX, onMount } from "solid-js"
import { toast } from "solid-sonner";

interface ChatItemProps {
    id?: number,
    userId?: number,
    time?: string,
    children?: JSX.Element
}

const ChatItem: Component<ChatItemProps> = (props) => {
    const safeChildren = children(() => props.children);
    const navigate = useNavigate();
    const [name, setName] = createSignal("")
    const [conversation, setConversation] = createSignal<Conversation>();

    const handleClick = async () => {
        navigate(`/c/${props.id}`, { replace: true });
    }

    const otherUserId = () => {
        const { user } = getSession();

        const convo = conversation();
        if (convo) {
            return convo.user1Id === user?.userId ? convo.user2Id : convo.user1Id;
        }
        return null;
    };

    onMount(async () => {
        await getConversationById(props.id!)
            .then((res) => {
                setConversation(res.data);
            })
            .catch((err) => {
                toast.error(err.message)
            });

        await getUserById(otherUserId()!)
            .then((res) => {
                setName(res.data.username);
            })
            .catch((err) => {
                toast.error(err.message)
            });
    })

    return (
        <div class="w-full p-4 max-h-20 h-20 border-b border-seagull-200 hover:bg-seagull-100/30 active:bg-seagull-100/45 cursor-pointer select-none" onClick={handleClick}>
        <div class="flex justify-between">
            <h2 class="text-base">{name()}</h2>
            <small class="text-gray-500">{formatTime(props.time!)}</small>
        </div>
        <p class="text-sm text-gray-500 overflow-hidden text-ellipsis h-6">
            {safeChildren()}
        </p>
        </div>
    )
}

export default ChatItem