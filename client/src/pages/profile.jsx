import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";


const TABS = ["Products", "About"];

const NAME_MIN = 2;
const NAME_MAX = 50;


function EditProfileDialog({ user, updateProfile }) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [saving, setSaving] = useState(false);

    const trimmed = name.trim();
    const valid = trimmed.length >= NAME_MIN && trimmed.length <= NAME_MAX;
    const changed = trimmed !== user.name;

    function handleOpenChange(next) {
        setOpen(next);
        if (next) setName(user.name); // start from the saved name each time
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!valid || !changed || saving) return;

        setSaving(true);
        try {
            await updateProfile({ name: trimmed });
            toast.success("Profile updated");
            setOpen(false);
        } catch (err) {
            toast.error(err.message || "Could not update your profile");
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit profile
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Change the name shown on your profile.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="profile-name">Name</Label>
                            <Input
                                id="profile-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={NAME_MAX}
                                autoComplete="name"
                                aria-invalid={!valid}
                                aria-describedby="profile-name-hint"
                            />
                            <p
                                id="profile-name-hint"
                                className={cn(
                                    "text-xs",
                                    valid ? "text-muted-foreground" : "text-destructive"
                                )}
                            >
                                {NAME_MIN} to {NAME_MAX} characters.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="profile-email">Email</Label>
                            <Input id="profile-email" value={user.email} disabled readOnly />
                            <p className="text-xs text-muted-foreground">
                                Your email can't be changed here.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!valid || !changed || saving}>
                            {saving ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}


export default function Profile() {

    const { user, loading, logout, updateProfile } = useAuth();

    const [tab, setTab] = useState("Products");

    if (loading) {
        return <div className="min-h-[60vh]" aria-busy="true" />;
    }

    if (!user) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 py-6 text-center">
                <h1 className="text-3xl font-extralight font-heading">You're not logged in</h1>
                <p className="text-sm text-muted-foreground">
                    Log in to see your profile.
                </p>
                <Button asChild>
                    <Link to="/auth">Log in</Link>
                </Button>
            </div>
        );
    }

    const initial = (user.name ?? "?").charAt(0).toUpperCase();

    return (
        <div className="min-h-screen py-6">

            {/* Banner */}
            <div className="h-32 w-full overflow-hidden rounded-xl bg-muted sm:h-44 md:h-52">
                <div
                    aria-hidden="true"
                    className="h-full w-full bg-gradient-to-r from-primary/25 via-muted to-primary/10"
                />
            </div>

            {/* Header */}
            <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <span
                    aria-hidden="true"
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-light text-primary-foreground sm:h-28 sm:w-28 sm:text-5xl"
                >
                    {initial}
                </span>

                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-2xl font-medium font-heading sm:text-3xl">
                        {user.name}
                    </h1>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                        {user.email}
                    </p>
                </div>

                <div className="sm:self-start">
                    <EditProfileDialog user={user} updateProfile={updateProfile} />
                </div>
            </header>

            {/* Tabs */}
            <div role="tablist" aria-label="Profile sections" className="mt-6 flex gap-6 border-b">
                {TABS.map((t) => (
                    <button
                        key={t}
                        role="tab"
                        type="button"
                        aria-selected={tab === t}
                        onClick={() => setTab(t)}
                        className={cn(
                            "-mb-px border-b-2 px-1 pb-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            tab === t
                                ? "border-primary font-medium text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="mt-6" role="tabpanel">

                {tab === "Products" && (
                    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-6 py-16 text-center">
                        <p className="text-lg font-medium">No products yet</p>
                        <p className="max-w-sm text-sm text-muted-foreground">
                            Products you list will show up here, like they do on a store page.
                        </p>
                    </div>
                )}

                {tab === "About" && (
                    <section className="max-w-2xl">
                        <h2 className="mb-4 text-lg font-medium">Account</h2>

                        <dl className="grid grid-cols-[6rem_1fr] gap-y-3 text-sm">
                            <dt className="text-muted-foreground">Name</dt>
                            <dd className="break-words">{user.name}</dd>

                            <dt className="text-muted-foreground">Email</dt>
                            <dd className="break-words">{user.email}</dd>
                        </dl>

                        <div className="mt-8">
                            <Button variant="outline" onClick={logout}>
                                Log out
                            </Button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
