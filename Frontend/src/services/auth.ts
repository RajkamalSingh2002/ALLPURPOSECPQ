const AUTH_KEY = "allcpq_is_logged_in";

export const isLoggedIn = () => {
    return localStorage.getItem(AUTH_KEY) === "true";
};

export const setLoggedIn = (value: boolean) => {
    localStorage.setItem(AUTH_KEY, value ? "true" : "false");
};
