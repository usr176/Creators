import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    function toggleTheme() {
        const html = document.documentElement;

        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
        }
    }

    return (
        <Button
            variant="outline"
            size="lg"
            onClick={toggleTheme}
            className="rounded-md"
        >
            {dark ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    );
}

export default ThemeToggle;