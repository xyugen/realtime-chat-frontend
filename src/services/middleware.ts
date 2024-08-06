import { createSignal } from "solid-js";
import { toast } from "solid-sonner";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>();

    const checkAuth = () => {
        const token = "token";
        if (!token) {
            toast.error("Please login first");
            return false;
        }

        setIsAuthenticated(true);
    }

    return { isAuthenticated, checkAuth };
}