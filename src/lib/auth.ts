import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    user_id?: string; // Adjust this according to your token's payload structure
}

interface Session {
    token: string | null;
    user: { userId: number } | null;
}

export const getSession = (): Session => {
    const token = localStorage.getItem("jwt_token");
    
    if (!token) {
        return {
            token: null,
            user: null
        };
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken.user_id;

        if (!userId) {
            return {
                token: null,
                user: null
            };
        }

        return { token, user: { userId: parseInt(userId) } };
    } catch (err) {
        console.error("Failed to decode token:", err);

        return {
            token: null,
            user: null
        };
    }
}

export const clearSession = () => {
    localStorage.removeItem("jwt_token");
}