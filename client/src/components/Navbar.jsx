import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, LogIn, LogOut, Menu, Store, User, Users, CircleUserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import UserMenu from "./UserMenu";
import ThemeToggle from "../ThemeToggle";

import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";


// "paths" lists every route that should light up the link
const LINKS = [
    { to: "/", label: "Home", icon: Home, exact: true },
    {
        to: "/marketplace",
        label: "Marketplace",
        icon: Store,
        paths: ["/marketplace", "/product", "/store", "/checkout"],
    },
    { to: "/community", label: "Community", icon: Users, paths: ["/community"] },
    { to: "/about", label: "About", icon: Info, paths: ["/about"] },
];

function isActive(link, pathname) {
    const p = pathname.toLowerCase();
    if (link.exact) return p === "/";
    return link.paths.some((base) => p === base || p.startsWith(`${base}/`));
}


function Navbar() {

    const { user, loading, logout } = useAuth();
    const { pathname } = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMenu = () => setMobileOpen(false);

    async function handleLogout() {
        closeMenu();
        await logout();
    }

    const initial = (user?.name ?? "?").charAt(0).toUpperCase();


    return (

        <header className="bg-background/80 pb-2 pt-4 backdrop-blur">

            <nav
                aria-label="Main"
                className="
                    mx-4
                    sm:mx-6
                    lg:mx-auto
                    max-w-6xl
                    rounded-xl
                    border
                    bg-background
                    px-4
                    sm:px-6
                    py-3
                    shadow-sm
                    flex
                    items-center
                    justify-between
                    gap-4
                "
            >

                {/* Logo */}
                <Link
                    to="/"
                    className="shrink-0 rounded-sm font-heading text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    KraftHub
                </Link>


                {/* Desktop links */}
                <ul className="hidden flex-1 items-center justify-center gap-1 md:flex">
                    {LINKS.map((link) => {
                        const active = isActive(link, pathname);
                        return (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        active
                                            ? "bg-muted font-medium text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>


                {/* Desktop actions */}
                <div className="hidden shrink-0 items-center gap-2 md:flex">
                    <ThemeToggle />
                    <CartButton />

                    {loading ? (
                        <div className="h-10 w-10" aria-hidden="true" />
                    ) : user ? (
                        <UserMenu />
                    ) : (
                        <Button asChild variant="outline" size="lg" className="rounded-md gap-2">
                            <Link to="/auth">
                                <CircleUserRound className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>


                {/* Mobile actions */}
                <div className="flex shrink-0 items-center gap-2 md:hidden">
                    <CartButton />

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

            </nav>


            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent
                    side="right"
                    className="flex w-full flex-col gap-0 p-0 sm:max-w-sm"
                >
                    <SheetHeader className="border-b p-4 text-left">
                        <SheetTitle className="font-heading text-xl">KraftHub</SheetTitle>
                        <SheetDescription className="sr-only">
                            Site navigation
                        </SheetDescription>
                    </SheetHeader>

                    <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-2">
                        <ul className="flex flex-col gap-1">
                            {LINKS.map((link) => {
                                const active = isActive(link, pathname);
                                const Icon = link.icon;
                                return (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            onClick={closeMenu}
                                            aria-current={active ? "page" : undefined}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                active
                                                    ? "bg-muted font-medium text-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex flex-col gap-3 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Appearance</span>
                            <ThemeToggle />
                        </div>

                        {loading ? null : user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
                                    >
                                        {initial}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{user.name}</p>
                                        <p className="truncate text-sm text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                >
                                    <Link to="/profile" onClick={closeMenu}>
                                        <User className="h-4 w-4" />
                                        My profile
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </Button>
                            </>
                        ) : (
                            <Button asChild className="w-full gap-2">
                                <Link to="/auth" onClick={closeMenu}>
                                    <LogIn className="h-4 w-4" />
                                    Log in
                                </Link>
                            </Button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            <CartDrawer />

        </header>

    );
}

export default Navbar;
