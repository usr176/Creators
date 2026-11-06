import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top on every navigation: new pages, query changes (?category=...),
// and even clicking a link to the page you are already on.
// Must be rendered inside <BrowserRouter>.
export default function ScrollToTop() {
    const { key } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [key]);

    return null;
}
