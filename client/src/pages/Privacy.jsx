import LegalPage from "@/components/LegalPage";
import { SITE } from "@/config/site";

// NOTE: draft. Update it if you add analytics, payments, or other services,
// and have it reviewed before relying on it.

const SECTIONS = [
    {
        heading: "What we collect",
        items: [
            "Account details: your name and email address, and a password (stored in protected form).",
            "What you add to the site: store details, listings, photos and descriptions if you sell.",
            "Activity that makes the site work, such as items in your cart, items you save, and stores you follow.",
            "Basic technical information, such as browser type, needed to keep the site running.",
        ],
    },
    {
        heading: "How we use it",
        items: [
            "To run your account, show your store and listings, and process orders.",
            "To keep the marketplace safe and to follow our terms and campus guidelines.",
            "To contact you about your account or orders.",
        ],
    },
    {
        heading: "What other people can see",
        paragraphs: [
            "Your store name, profile photo, and listings are public. Your email address is not shown on your store page.",
        ],
    },
    {
        heading: "Sharing",
        paragraphs: [
            "We do not sell your information. We use services that host the site and store its data, and they handle it only to run KraftHub. We may share information with the university or authorities if we are required to, or to deal with serious misuse of the site.",
        ],
    },
    {
        heading: "Cookies and browser storage",
        paragraphs: [
            "KraftHub uses a login session so you stay signed in, and stores your cart in your browser so it is still there when you come back. Clearing your browser data removes the saved cart.",
        ],
    },
    {
        heading: "Keeping it safe",
        paragraphs: [
            "We take reasonable steps to protect your information, but no website can promise perfect security. Use a strong password and do not share it.",
        ],
    },
    {
        heading: "Your choices",
        paragraphs: [
            `You can change your name from your profile. To correct other details or to ask us to delete your account and data, email ${SITE.email}.`,
        ],
    },
    {
        heading: "Changes and contact",
        paragraphs: [
            `If we change how we handle information, we will update this page and its date. Questions: ${SITE.email}.`,
        ],
    },
];

export default function Privacy() {
    return (
        <LegalPage
            title="Privacy policy"
            updated={SITE.legalUpdated}
            intro={`This page explains what information ${SITE.name} keeps about you and how it is used.`}
            sections={SECTIONS}
        />
    );
}
