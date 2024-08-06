export const getSession = () => {
    const token = localStorage.getItem("jwt_token");
    
    if (!token) {
        return {
            user: null
        };
    }

    return { user: token };
}