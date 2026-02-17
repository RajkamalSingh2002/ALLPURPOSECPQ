import api from './api';

// Types for API responses
interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
    roles: string[];
}

interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    domain: string;
}

// Token Storage Keys
const ACCESS_TOKEN_KEY = 'allcpq_access_token';
const REFRESH_TOKEN_KEY = 'allcpq_refresh_token';
const USER_KEY = 'allcpq_user';

// ============================================
// Token Storage Functions
// ============================================

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const isTokenExpired = (): boolean => {
    const token = getAccessToken();
    if (!token) return true;

    try {
        // JWT format: header.payload.signature
        // Decode the payload (second part)
        const parts = token.split('.');
        if (parts.length !== 3) return true;

        const payload = JSON.parse(atob(parts[1]));

        // Check if token has exp claim
        if (!payload.exp) return true;

        // exp is in seconds, convert to milliseconds
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();

        // Token is expired if current time is past expiry time
        return currentTime > expiryTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If we can't decode, consider it expired
    }
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const saveUser = (username: string, roles: string[]) => {
    localStorage.setItem(USER_KEY, JSON.stringify({ username, roles }));
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const isLoggedIn = (): boolean => {
    const token = getAccessToken();
    if (!token) return false;
    return !isTokenExpired();
};

export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

// ============================================
// Auth API Functions
// ============================================

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/api/auth/login', {
            username,
            password,
        } as LoginRequest);

        // Store tokens and user info
        saveTokens(response.data.accessToken, response.data.refreshToken);
        saveUser(response.data.username, response.data.roles);

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        throw new Error(errorMessage);
    }
};

export const register = async (
    username: string,
    password: string,
    email: string,
    domain: string
): Promise<any> => {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            password,
            email,
            domain,
        } as RegisterRequest);

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMessage);
    }
};

export const refreshToken = async (): Promise<LoginResponse> => {
    try {
        const token = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!token) {
            throw new Error("No refresh token found");
        }

        const response = await api.post<LoginResponse>("/api/auth/refresh", {
            refreshToken: token,
        });

        // Update BOTH tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);

        return response.data;
    } catch (error) {
        logout();
        throw error;
    }
};

export const logout = () => {
    clearTokens();
};
