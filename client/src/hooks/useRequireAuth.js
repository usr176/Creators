import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";


/**
 * Returns a function that checks whether someone is logged in.
 *
 *   const requireAuth = useRequireAuth();
 *   if (!requireAuth("Log in to follow stores")) return;
 *
 * Logged in  -> returns true and does nothing else.
 * Logged out -> shows an error toast with a "Log in" button, returns false.
 */
export default function useRequireAuth() {

    const { user } = useAuth();
    const navigate = useNavigate();

    return function requireAuth(message = "Log in to continue") {
        if (user) return true;

        toast.error(message, {
            id: "auth-required",
            action: {
                label: "Log in",
                onClick: () => navigate("/auth"),
            },
        });
        return false;
    };
}
