import { Button } from "@/components";
import { createConversation, searchUser } from "@/services/api";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Component, createSignal } from "solid-js";
import { toast } from "solid-sonner";
import UsernameInput from "./UsernameInput";
import FormError from "./FormError";
import { z } from "zod";

// username must start with @
// must not contain special characters
const username = z
  .string()
  .min(4, { message: "Username must be at least 4 characters" })
  .regex(/^[@a-zA-Z0-9_]+$/, { message: "Username must only contain alphanumeric characters and underscores" });

interface CreateConversationFormProps {
  onCreate?: () => void;
}

const CreateConversationForm: Component<CreateConversationFormProps> = (props) => {
  const [form, setForm] = createSignal({
    username: "",
    error: "",
  });
  const [results, setResults] = createSignal<User[]>([]);
  const [showResults, setShowResults] = createSignal(false);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const result = username.safeParse(form().username);
    if (!result.success) {
      setForm({ username: form().username, error: result.error.issues[0].message });
      return;
    }

    let safeUsername = form().username;
    if (form().username.startsWith("@")) {
      safeUsername = safeUsername.split("@")[1];
    }

    createConversation(safeUsername)
      .then(() => {
        if (props.onCreate) props.onCreate();
        toast.success("Conversation created!");
      })
      .catch((err) => {
        const error = capitalizeFirstLetter(err.response.data.error);
        toast.error(error);
      });

    setForm({ username: "", error: "" });
  };

  const handleChange = async (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    setForm({ username: target.value, error: "" });

    if (target.value === "") {
      setResults([]);
      return;
    }

    await searchUser(target.value)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        const error = capitalizeFirstLetter(err.response.data.error);
        toast.error(error);
      });
  };

  const handleShowResults = () => {
    setShowResults(!showResults());
  };

  const handleSelectResult = (username: string) => {
    setForm({ username, error: "" });
    setShowResults(false);
    setResults([]);
  };

  return (
    <form class="flex flex-col gap-2" onSubmit={handleSubmit}>
      <UsernameInput
        username={form().username}
        error={form().error}
        results={results()}
        showResults={showResults()}
        onInput={handleChange}
        onShowResults={handleShowResults}
        onSelectResult={handleSelectResult}
      />
      <FormError error={form().error} />
      <Button type="submit" class="w-full">Create</Button>
    </form>
  );
};

export default CreateConversationForm;