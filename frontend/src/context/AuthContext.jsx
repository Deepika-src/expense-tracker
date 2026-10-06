import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(
        // JSON.parse(
        // localStorage.getItem("user") || null
        JSON.parse(localStorage.getItem("user") || "null")

    );


    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider
            value={{ token, user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
