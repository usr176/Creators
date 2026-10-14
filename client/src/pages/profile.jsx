import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function Profile() {

    const { user, logout } = useAuth();


    if (!user) {

        return (

            <div className="flex min-h-screen items-center justify-center flex-col">
                <div>
                    <h1 className="font-heading">
                        KraftHub
                    </h1>
                </div>

                <p className="m-5 font-light">
                    You need to login first.
                </p>

                <Button asChild>
                    <Link to="/">
                        Home
                    </Link>
                </Button>

            </div>
        );

    }


    return (

        <div className="flex min-h-screen flex-col items-center justify-center gap-4">

            <div>
                <h1 className="font-heading">
                    KraftHub
                </h1>
            </div>

            <h1 className="text-3xl font-bold">
                Welcome, {user.name}
            </h1>


            <p className="text-muted-foreground">
                {user.email}
            </p>


            <Button
                onClick={logout}
            >
                Logout
            </Button>


        </div>

    );

}   