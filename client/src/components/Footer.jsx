import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/products";
import { SITE } from "@/config/site";


/* ---------- Social icons (inline SVG, no extra dependency) ---------- */

const ICON_PROPS = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

function InstagramIcon() {
    return (
        <svg {...ICON_PROPS}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

const SOCIAL_LINKS = [
    { label: "Instagram", href: SITE.socials.instagram, icon: <InstagramIcon /> },
    { label: "Facebook", href: SITE.socials.facebook, icon: <FacebookIcon /> },
    { label: "LinkedIn", href: SITE.socials.linkedin, icon: <LinkedinIcon /> },
];


/* ---------- Small building blocks ---------- */

const linkClass =
    "rounded-sm text-sm text-neutral-300 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function FooterColumn({ title, children }) {
    return (
        <div>
            <h2 className="mb-3 text-sm font-medium text-primary">{title}</h2>
            <ul className="flex flex-col gap-2">{children}</ul>
        </div>
    );
}

function FooterLink({ to, href, children }) {
    return (
        <li>
            {to ? (
                <Link to={to} className={linkClass}>{children}</Link>
            ) : (
                <a href={href} className={linkClass}>{children}</a>
            )}
        </li>
    );
}


/* ---------- Footer ---------- */

function Footer() {

    const { user } = useAuth();
    const { openCart } = useCart();

    return (
        <footer className="bg-neutral-900 text-neutral-300">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Link columns */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">

                    <FooterColumn title="Shop">
                        <FooterLink to="/marketplace">All products</FooterLink>
                        {CATEGORIES.slice(0, 4).map((c) => (
                            <FooterLink
                                key={c}
                                to={`/marketplace?category=${encodeURIComponent(c)}`}
                            >
                                {c}
                            </FooterLink>
                        ))}
                    </FooterColumn>

                    <FooterColumn title="Explore">
                        <FooterLink to="/">Home</FooterLink>
                        <FooterLink to="/marketplace">Marketplace</FooterLink>
                        <FooterLink to="/community">Community</FooterLink>
                        <FooterLink to="/about">About</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Account">
                        {user ? (
                            <FooterLink to="/profile">My profile</FooterLink>
                        ) : (
                            <FooterLink to="/auth">Log in or sign up</FooterLink>
                        )}
                        <li>
                            <button type="button" onClick={openCart} className={linkClass}>
                                Your cart
                            </button>
                        </li>
                        <FooterLink to="/checkout">Checkout</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Support">
                        <FooterLink to="/guidelines">Campus guidelines</FooterLink>
                        <FooterLink href={`mailto:${SITE.email}`}>Contact us</FooterLink>
                        <FooterLink
                            href={`mailto:${SITE.email}?subject=${encodeURIComponent("Report a problem")}`}
                        >
                            Report a problem
                        </FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Legal">
                        <FooterLink to="/terms">Terms of use</FooterLink>
                        <FooterLink to="/privacy">Privacy policy</FooterLink>
                        <FooterLink to="/guidelines">Community rules</FooterLink>
                    </FooterColumn>
                </div>

                {/* Bottom row */}
                <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <Link
                            to="/"
                            className="rounded-sm font-heading text-5xl font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-6xl"
                        >
                            {SITE.name}
                        </Link>
                        <p className="mt-2 text-sm text-neutral-400">
                            Handmade by {SITE.university} students, for students.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:items-end">

                        <ul className="flex items-center gap-1">
                            {SOCIAL_LINKS.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        {s.icon}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={`mailto:${SITE.email}`}
                                    aria-label="Email us"
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <Mail className="h-5 w-5" />
                                </a>
                            </li>
                        </ul>

                        <p className="flex flex-wrap gap-x-2 text-sm text-neutral-300">
                            <span>&copy; {new Date().getFullYear()} {SITE.name}</span>
                            <span aria-hidden="true">|</span>
                            <Link to="/privacy" className="underline hover:text-white">Privacy</Link>
                            <span aria-hidden="true">|</span>
                            <Link to="/terms" className="underline hover:text-white">Terms</Link>
                            <span aria-hidden="true">|</span>
                            <Link to="/guidelines" className="underline hover:text-white">Guidelines</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
