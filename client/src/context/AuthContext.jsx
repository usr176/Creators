import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // check existing flask session when website loads
    useEffect(() => {

        async function checkUser() {
            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/me`,
                    {
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if(data.logged_in) {
                    setUser(data.user);
                }
            }

            catch(error) {
                console.log(error);
            }

            finally {
                setLoading(false);
            }

        }
        checkUser();
    }, []);



    async function login(userData) {
        setUser(userData);
    }


    async function logout() {
        await fetch(
            `${import.meta.env.VITE_API_URL}/auth/logout`,
            {
                method:"POST",
                credentials:"include"
            }
        );
        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}


export function useAuth() {
    return useContext(AuthContext);
}