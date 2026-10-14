import { Button } from "@/components/ui/button";

import UserMenu from "./UserMenu";
import ThemeToggle from "../ThemeToggle";
import { User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


function Navbar(){

    const {user} = useAuth();

    return(
        <nav className="
        mx-auto mt-4
        max-w-6xl
        flex items-center
        rounded-xl
        border
        bg-background
        px-6 py-3
        shadow-sm
        ">
            <div className="flex-1">
                <p className="text-xl mr-auto font-heading font-bold">KraftHub</p>
            </div>
            <div className="
                flex
                items-center
                justify-evenly
                gap-6
            ">
                <Button asChild variant="link">
                    <Link to="/">
                        Home    
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link to="/Marketplace">
                        Marketplace
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link to="/Community">
                        Community
                    </Link>
                </Button>

                <Button asChild variant="link">
                    <Link to="/About">
                        About
                    </Link>
                </Button>

            </div>
            <div className="
                flex-1
                flex justify-end items-center gap-2
            ">
                <ThemeToggle />

                {
                    user ?
                    <UserMenu />
                    :
                    <Button asChild variant="outline"size="lg">
                        <Link to="/auth">
                            <User className="h-5 w-5" />
                        </Link>
                    </Button>
                }

                <Button variant="outline" size="lg">
                    <ShoppingBag className="h-5 w-5" />
                </Button>

            </div>
        </nav>
    )
}

export default Navbar;