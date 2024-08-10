import { Component } from "solid-js";
import { ChevronDown, ChevronUp } from "lucide-solid";
import { Input, Label } from "@/components";
import { cn } from "@/lib/utils";

interface UsernameInputProps {
  username: string;
  error: string;
  results: User[];
  showResults: boolean;
  onInput: (event: InputEvent) => void;
  onShowResults: () => void;
  onSelectResult: (username: string) => void;
}

const UsernameInput: Component<UsernameInputProps> = (props) => {
  return (
    <div class="flex flex-row items-center gap-2">
      <Label for="name">Username</Label>
      <div class="relative w-full">
        <Input
          id="name"
          class={cn("w-full", props.error && "border-red-500 hover:border-red-400")}
          type="text"
          placeholder="@username"
          value={props.username}
          onInput={props.onInput}
          required
        />
        {props.results.length > 0 && (
          <>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" class="flex flex-row items-center gap-1 transition-colors text-gray-400 hover:text-gray-500" onClick={props.onShowResults}>
                <span class="text-sm select-none">
                  {props.results.length} {props.results.length > 1 ? "results" : "result"}
                </span>
                {props.showResults ?
                  <ChevronUp class="w-5 h-5" /> :
                  <ChevronDown class="w-5 h-5" />
                }
              </button>
            </div>
            {props.showResults && (
              <div class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                {props.results.map((user) => (
                  <button
                    class="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => props.onSelectResult(user.username)}
                    type="button"
                  >
                    {user.username}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsernameInput;