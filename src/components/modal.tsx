import { cn } from "@/lib/utils";
import { X } from "lucide-solid";
import { children, Component, createEffect, createSignal, JSX } from "solid-js"

interface ModalProps {
  show?: Boolean
  children?: JSX.Element
  onClose?: () => void
}

const Modal: Component<ModalProps> = (props) => {
  const safeChildren = children(() => props.children);
  const [isModalOpen, setIsModalOpen] = createSignal<Boolean>(false);
  const [animate, setAnimate] = createSignal<Boolean>(false);

  const closeModal = (event: MouseEvent) => {
    setAnimate(true);
    setTimeout(() => {
      setIsModalOpen(false);
      safeOnClose();
      setAnimate(false);
    }, 150);
  }

  createEffect(() => {
    if (props.show) {
      setIsModalOpen(true);
      return;
    }

    setIsModalOpen(false);
  })

  const safeOnClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div
      class={cn("fixed inset-0 top-0 left-0 size-full transition-opacity duration-150 bg-black/50 flex justify-center items-center z-50",
        animate() ? "opacity-0" : "opacity-100",
        isModalOpen() ? "flex" : "hidden")}
      onClick={closeModal}>
      <div class={cn("bg-white p-4 rounded relative max-w-[400px] w-full shadow-md",
        animate() ? "animate-out fade-out-30 zoom-out-50" : "",
        isModalOpen() ? "animate-in fade-in-30 zoom-in-50" : ""
      )}
        onClick={(e) => e.stopPropagation()}>
        <div class="absolute top-0 right-0 p-3">
          <button type="button" onClick={closeModal}>
            <X class="size-4 text-seagull-800 hover:text-seagull-600 transition-colors" />
          </button>
        </div>
        {safeChildren()}
      </div>
    </div>
  )
}

export default Modal