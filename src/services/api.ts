import { config } from "@/lib/config";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useNavigate } from "@solidjs/router";
import axios from "axios";
import { toast } from "solid-sonner";

const navigate = useNavigate();

export const login = async (props: Auth) => {
    const response = axios.post(`${config.serverUrl}/auth/login`, {
        username: props.username,
        password: props.password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.status === 200) {
            toast.success("Login successful");
        }
        // TODO: Redirect to chat
    }).catch((err) => {
        const errorMessage: string = capitalizeFirstLetter(err.response.data.error);
        toast.error(errorMessage || err.message);
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
    }).then((res) => {
        if (res.status === 201) {
            toast.success("Account created successfully. Please login.");
            navigate("/login");
        }
    }).catch((err) => {
        const errorMessage: string = capitalizeFirstLetter(err.response.data.error);
        toast.error(errorMessage || err.response.data);
    });

    return response;
}