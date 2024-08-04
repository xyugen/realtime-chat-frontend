import { cn } from "@/lib/utils"
import { children, Component } from "solid-js"
import { className } from "solid-js/web"

const ShinyHeader = (props: { className?: string, children?: any }) => {
    const safeChildren = children(() => props.children)

    return (
        <h1 class={cn('text-4xl font-bold bg-gradient-to-b from-seagull-300 to-seagull-500 bg-clip-text text-transparent p-1', className)}>
            {safeChildren()}
        </h1>
    )
}

export default ShinyHeader