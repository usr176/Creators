import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    User,
    Settings,
    LogOut
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


export default function UserMenu(){

    const {
        user,
        logout
    } = useAuth();


    const navigate = useNavigate();

    const firstLetter = user.name.charAt(0).toUpperCase()


    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <Button variant="outline"size="lg">
                     <User className="h-5 w-5" />
                </Button>

            </DropdownMenuTrigger>



            <DropdownMenuContent
                align="end"
                className="w-56"
            >


                <DropdownMenuLabel>

                    <div className="flex items-center gap-3">


                        <div
                            className="
                                h-10
                                w-10
                                rounded-full
                                bg-primary
                                text-primary-foreground
                                flex
                                items-center
                                justify-center
                                font-semibold
                            "
                        >
                            {firstLetter}
                        </div>


                        <div>

                            <p className="font-medium">
                                {user.name}
                            </p>

                            <p className="
                                text-sm
                                text-muted-foreground
                            ">
                                {user.email}
                            </p>

                        </div>


                    </div>


                </DropdownMenuLabel>



                <DropdownMenuSeparator />



                <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                >

                    <User className="mr-2 h-4 w-4" />

                    Profile

                </DropdownMenuItem>



                <DropdownMenuItem>

                    <Settings className="mr-2 h-4 w-4" />

                    Settings

                </DropdownMenuItem>



                <DropdownMenuSeparator />



                <DropdownMenuItem
                    onClick={logout}
                >

                    <LogOut className="mr-2 h-4 w-4" />

                    Logout

                </DropdownMenuItem>


            </DropdownMenuContent>


        </DropdownMenu>

    );
}