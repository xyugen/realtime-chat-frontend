import { cn } from "@/lib/utils"
import { children } from "solid-js"

const ShinyHeader = (props: { class?: string, children?: any }) => {
    const safeChildren = children(() => props.children)

    return (
        <h1 class={cn('text-4xl font-bold bg-gradient-to-b from-seagull-300 to-seagull-500 bg-clip-text text-transparent p-1', props.class)}>
            {safeChildren()}
        </h1>
    )
}

export default ShinyHeader