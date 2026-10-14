import { useState } from "react";
import { Button } from "@/components/ui/button";

import UserMenu from "./UserMenu";
import ThemeToggle from "../ThemeToggle";

import { User, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


function Navbar(){

    const {user} = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);


    return(

        <nav className="
            mx-4
            sm:mx-6
            lg:mx-auto
            mt-4
            max-w-6xl
            rounded-xl
            border
            bg-background
            px-4
            sm:px-6
            py-3
            shadow-sm
        ">


            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">


                <div className="shrink-0">

                    <p className="
                        text-xl
                        font-heading
                        font-bold
                    ">
                        KraftHub
                    </p>

                </div>



                <div className="
                    hidden
                    md:flex
                    items-center
                    gap-6
                    flex-1
                    justify-center
                ">

                    <Button asChild variant="link">
                        <Link to="/">
                            Home
                        </Link>
                    </Button>


                    <Button asChild variant="link">
                        <Link to="/marketplace">
                            Marketplace
                        </Link>
                    </Button>


                    <Button asChild variant="link">
                        <Link to="/community">
                            Community
                        </Link>
                    </Button>


                    <Button asChild variant="link">
                        <Link to="/about">
                            About
                        </Link>
                    </Button>


                </div>



                <div className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    shrink-0
                ">

                    <ThemeToggle />


                    {
                        user ?

                        <UserMenu />

                        :

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                        >

                            <Link to="/auth">
                                <User className="h-5 w-5" />
                            </Link>

                        </Button>

                    }


                    <Button
                        variant="outline"
                        size="lg"
                    >

                        <ShoppingBag className="h-5 w-5" />

                    </Button>


                </div>



                <div className="
                    flex
                    md:hidden
                    items-center
                    gap-2
                ">

                    <ThemeToggle />


                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >

                        <div
                            className={`
                                transition-transform
                                duration-300
                                ${
                                    mobileOpen
                                    ? "rotate-90"
                                    : "rotate-0"
                                }
                            `}
                        >

                            {
                                mobileOpen ?

                                <X className="h-5 w-5"/>

                                :

                                <Menu className="h-5 w-5"/>

                            }

                        </div>

                    </Button>


                </div>


            </div>



            <div
                className={`
                    md:hidden
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out

                    ${
                        mobileOpen
                        ? "max-h-96 opacity-100 mt-4 pt-4"
                        : "max-h-0 opacity-0 mt-0 pt-0"
                    }
                `}
            >

                <div className="
                    border-t
                    flex
                    flex-col
                    gap-2
                ">


                    <Button asChild variant="link">
                        <Link to="/">
                            Home
                        </Link>
                    </Button>


                    <Button asChild variant="link">
                        <Link to="/marketplace">
                            Marketplace
                        </Link>
                    </Button>


                    <Button asChild variant="link">
                        <Link to="/community">
                            Community
                        </Link>
                    </Button>


                    <Button asChild variant="link">
                        <Link to="/about">
                            About
                        </Link>
                    </Button>



                    <div className="
                        border-t
                        mt-2
                        pt-3
                    ">


                        {
                            user ?

                            <UserMenu />

                            :

                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >

                                <Link to="/auth">

                                    <User className="h-5 w-5 mr-2"/>

                                    Login

                                </Link>

                            </Button>

                        }


                    </div>


                </div>


            </div>


        </nav>

    )
}

export default Navbar;