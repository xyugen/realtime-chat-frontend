import { getSession } from "@/lib/auth";
import { config } from "@/lib/config";
import axios, { AxiosResponse } from "axios";

// auth
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

// conversation
export const createConversation = async (username: string) => {
    const { token } = getSession();

    if (!token) {
        throw new Error('permission denied');
    }
    
    const id = await getUserByUsername(username).then(res => res.data.id);

    const response = await axios.post(`${config.SERVER_URL}/conversation/new`, {
        user2Id: id
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}

export const getConversations = async (username: string = "") => {
    const { token } = getSession();

    if (!token) {
        throw new Error('permission denied');
    }
    
    const response = await axios.get(`${config.SERVER_URL}/conversations?username=${username}`, {
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

// user
export const getUserById = async (id: number): Promise<AxiosResponse<User>> => {
    return await axios.get(`${config.SERVER_URL}/user/${id}`);
}

export const getUserByUsername = async (username: string): Promise<AxiosResponse<User>> => {
    return await axios.get(`${config.SERVER_URL}/user/u/${username}`);
}

export const searchUser = async (username: string): Promise<AxiosResponse<User[]>> => {
    return await axios.get(`${config.SERVER_URL}/user/search?q=${username}`);
}

// message
export const createMessage = async (props: { conversationId: number, content: string }) => {
    const { token } = getSession();
    if (!token) {
        throw new Error('permission denied');
    }

    const response = await axios.post(`${config.SERVER_URL}/conversation/${props.conversationId}/message/new`, {
        content: props.content
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}

export const getMessages = async (conversationId: number) => {
    const { token } = getSession();
    if (!token) {
        throw new Error('permission denied');
    }

    return await axios.get(`${config.SERVER_URL}/conversation/${conversationId}/message`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}