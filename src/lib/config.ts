import { Config } from "@/interface/Config";

export const config: Config = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL || "http://localhost:8080/api/v1",
}