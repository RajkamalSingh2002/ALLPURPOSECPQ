const AUTH_KEY = "allcpq_is_logged_in";
export const AUTH_EVENT = "allcpq_auth_change";

export const isLoggedIn = () => {
    return localStorage.getItem(AUTH_KEY) === "true";
};

export const setLoggedIn = (value: boolean) => {
    localStorage.setItem(AUTH_KEY, value ? "true" : "false");
    window.dispatchEvent(new Event(AUTH_EVENT));
};
