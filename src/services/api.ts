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

export const getConversations = async () => {
    const { token } = getSession();

    if (!token) {
        throw new Error('permission denied');
    }

    const response = await axios.get(`${config.SERVER_URL}/conversations`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}

export const getConversationById = async (id: number): Promise<AxiosResponse<Conversation>> => {
    const { token } = getSession();
    
    if (!token) {
        throw new Error('permission denied');
    }

    return await axios.get(`${config.SERVER_URL}/conversation/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getUserById = async (id: number): Promise<AxiosResponse<User>> => {
    return await axios.get(`${config.SERVER_URL}/user/${id}`);
}