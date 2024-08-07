import { getSession } from "@/lib/auth";
import { config } from "@/lib/config";
import axios, { AxiosResponse } from "axios";

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

export const getConversationById = async (id: number): Promise<AxiosResponse<Conversation>> => {
    const { user } = getSession();

    if (!user) {
        throw new Error('permission denied');
    }

    return await axios.get(`${config.SERVER_URL}/conversation/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user}`
        }
    });
}

export const getUserById = async (id: number): Promise<User> => {
    return await axios.get(`${config.SERVER_URL}/users/${id}`);
}