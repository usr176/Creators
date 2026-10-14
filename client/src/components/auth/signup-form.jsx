import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "../ui/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


import { useAuth } from "@/context/AuthContext.jsx";


export default function SignupForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleSignup(e) {

        e.preventDefault();

        setLoading(true);

        try{
            const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {

                // toast for success
                toast.success("Account created Successfully.")

                // frontend session
                login({
                    name,
                    email
                });

                setTimeout(()=>{
                    navigate("/");
                },1000)

            } else {
                toast.error(data.message);
            }
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <form
            onSubmit={handleSignup}
            className="mt-6 space-y-5"
        >

            <div className="space-y-2">
                <Label>
                    Name
                </Label>

                <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>


            <div className="space-y-2">
                <Label>
                    Email
                </Label>

                <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>


            <div className="space-y-2">
                <Label>
                    Password
                </Label>

                <Input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>


            <LoadingButton
                className="w-full"
                type="submit"
                loading={loading}
            >
                Create Account
            </LoadingButton>

        </form>
    );
}