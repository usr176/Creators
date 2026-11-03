import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Starts every new page at the top. Without this, clicking a footer link
// opens the next page scrolled down to where the footer was.
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
