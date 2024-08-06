import { cn } from '@/lib/utils'
import { A } from '@solidjs/router'
import { children, Component } from 'solid-js'

interface LinkProps {
    href: string,
    class?: string,
    children?: any
}

const Link: Component<LinkProps> = (props) => {
    const safeChildren = children(() => props.children)
  
    return (
        <A href={props.href} class={cn("hover:underline", props.class)}>
            {safeChildren()}
        </A>
    )
}

export default Link