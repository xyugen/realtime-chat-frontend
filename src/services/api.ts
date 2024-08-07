import { config } from "@/lib/config";
import axios from "axios";

export const login = async (props: Auth) => {
    const response = axios.post(`${config.SERVER_URL}/auth/login`, {
        username: props.username,
        password: props.password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export const register = async (props: Auth) => {
    const response = axios.post(`${config.SERVER_URL}/auth/register`, {
        username: props.username,
        password: props.password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export const getConversations = async (token: string) => {
    const response = await axios.get(`${config.SERVER_URL}/conversations`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}

export const getConversationById = async (id: number): Promise<Conversation> => {
    return await axios.get(`${config.SERVER_URL}/conversations/${id}`);
}

export const getUserById = async (id: number): Promise<User> => {
    return await axios.get(`${config.SERVER_URL}/users/${id}`);
}