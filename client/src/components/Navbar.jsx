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
            mx-auto mt-4
            max-w-6xl
            rounded-xl
            border
            bg-background
            px-6 py-3
            shadow-sm
        ">


            <div className="
                flex
                items-center
                justify-between
            ">


                {/* Logo */}

                <div>
                    <p className="
                        text-xl
                        font-heading
                        font-bold
                    ">
                        KraftHub
                    </p>
                </div>



                {/* Desktop Navigation */}

                <div className="
                    hidden
                    md:flex
                    items-center
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



                {/* Desktop Actions */}

                <div className="
                    hidden
                    md:flex
                    items-center
                    gap-2
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



                {/* Mobile Actions */}

                <div className="
                    flex
                    md:hidden
                    items-center
                    gap-2
                ">

                    <ThemeToggle />


                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >

                        {
                            mobileOpen ?

                            <X className="h-5 w-5"/>

                            :

                            <Menu className="h-5 w-5"/>

                        }

                    </Button>


                </div>


            </div>



            {/* Mobile Menu */}

            {
                mobileOpen && (

                    <div className="
                        md:hidden
                        mt-4
                        border-t
                        pt-4
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

                )
            }


        </nav>

    )
}

export default Navbar;