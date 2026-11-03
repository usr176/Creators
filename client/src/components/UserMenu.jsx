import { Link } from "react-router-dom";
import { LogOut, Settings, User, CircleUserRound } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/AuthContext";


export default function UserMenu() {

    const { user, logout } = useAuth();

    if (!user) return null;

    const initial = (user.name ?? "?").charAt(0).toUpperCase();

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Account menu"
                    className="h-10 w-10 rounded-full border-primary bg-primary font-semibold text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                >
                    <CircleUserRound />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={10} className="w-64 p-2">

                <DropdownMenuLabel className="flex items-center gap-3 p-2 font-normal">
                    <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
                    >
                        {initial}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate font-medium">{user.name}</p>
                        <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer gap-2 py-2">
                    <Link to="/profile">
                        <User className="h-4 w-4" />
                        My profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem disabled className="gap-2 py-2">
                    <Settings className="h-4 w-4" />
                    Settings
                    <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer gap-2 py-2 text-destructive focus:text-destructive"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
