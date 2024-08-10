import { Button, Input, Label } from "@/components"
import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { createConversation } from "@/services/api"
import { createStore } from "solid-js/store"
import { toast } from "solid-sonner"
import { z } from "zod"

// username must start with @
// must not contain special characters
const username = z
  .string()
  .regex(/^@.*/, { message: "Username must start with @" })
  .min(5, { message: "Username must be at least 4 characters" })
  .regex(/^[@a-zA-Z0-9_]+$/, { message: "Username must only contain alphanumeric characters and underscores" });

const CreateConversationForm = () => {
  const [form, setForm] = createStore({
    username: "",
    error: "",
  })

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const result = username.safeParse(form.username)
    if (!result.success) {
      setForm({ error: result.error.issues[0].message })
      return
    }

    const safeUsername = form.username.split("@")[1]
    createConversation(safeUsername)
      .then(() => {
        toast.success("Conversation created!")
      })
      .catch((err) => {
        const error = capitalizeFirstLetter(err.response.data.error);
        toast.error(error);
      })

    setForm({ username: "", error: "" })
  }

  return (
    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div class="flex flex-row items-center gap-2">
        <Label for="name">Username</Label>
        <Input id="name" class={cn("w-full", form.error && "border-red-500 hover:border-red-400")} type="text" placeholder="@username" value={form.username} onChange={(event: any) => setForm({ username: event.currentTarget.value })} required />
      </div>
      <p class={cn("text-red-500 text-xs", form.error ? "visible" : "hidden")}>{form.error}</p>
      <Button type="submit" class="w-full">Create</Button>
    </form>
  )
}

export default CreateConversationForm