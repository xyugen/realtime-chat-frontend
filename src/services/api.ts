import { config } from "@/lib/config";
import axios from "axios";

export const login = async (props: Auth) => {
    const response = axios.post(`${config.serverUrl}/auth/login`, {
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
    const response = axios.post(`${config.serverUrl}/auth/register`, {
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
    const response = await axios.get(`${config.serverUrl}/conversations`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}

export const getConversationById = async (id: number): Promise<Conversation> => {
    return await axios.get(`${config.serverUrl}/conversations/${id}`);
}

export const getUserById = async (id: number): Promise<User> => {
    return await axios.get(`${config.serverUrl}/users/${id}`);
}