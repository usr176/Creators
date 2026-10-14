import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "../ui/loading-button.jsx";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";


export default function LoginForm(){

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");



    async function handleLogin(e){

        e.preventDefault();

        setLoading(true);

        try{
            const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();


            if(data.success){

                // toast succes message
                toast.success(data.message)

                login(data.user);

                setTimeout(()=>{
                    navigate("/");
                },1000)

            } else {
                toast.error(data.message)
            }

        }
        finally{
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleLogin}
            className="mt-6 space-y-5"
        >
            <div className="space-y-2">
                <Label> Email </Label>
                <Input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>

            <div className="space-y-2">
                <Label> Password </Label>
            <Input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
            />
            </div>

            <LoadingButton
                className="w-full"
                type="submit"
                loading={loading}
            >
                Log In
            </LoadingButton>

        </form>
    )
}