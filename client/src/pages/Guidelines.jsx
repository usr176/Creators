import LegalPage from "@/components/LegalPage";
import { SITE } from "@/config/site";

const SECTIONS = [
    {
        heading: "Be a good campus neighbour",
        paragraphs: [
            `${SITE.name} only works if buyers and sellers trust each other. These guidelines are about keeping it friendly and safe for everyone.`,
        ],
    },
    {
        heading: "Meeting to hand over an order",
        items: [
            "Meet in public, busy places on campus, such as the cafeteria or main lobby, and during daylight where possible.",
            "Bring a friend if you feel unsure.",
            "Never share your home address, hostel room number, or personal accounts. Keep messages and arrangements on KraftHub.",
            "Be on time, and let the other person know early if plans change.",
            "If something feels wrong, leave and tell campus security.",
        ],
    },
    {
        heading: "For sellers",
        items: [
            "Take clear photos of your own work and describe it honestly.",
            "Keep stock numbers correct so no one orders something you do not have.",
            "Package items carefully. For food, label ingredients and allergens and say how long it keeps.",
            "Reply to buyers politely and promptly, and be fair if something goes wrong.",
        ],
    },
    {
        heading: "For buyers",
        items: [
            "Read the full description before you order. Handmade items can differ slightly from the photos.",
            "Collect your order at the agreed time, or tell the seller in advance if you cannot.",
            "Treat sellers with respect. They are students like you, making things in their free time.",
        ],
    },
    {
        heading: "Not allowed",
        items: [
            "Selling academic work, assignments or exam material.",
            "Copied or counterfeit items, and anything banned by the law or the university.",
            "Harassment, hate, spam, or fake reviews.",
        ],
    },
    {
        heading: "Reporting a problem",
        paragraphs: [
            `If a listing breaks these rules, or a meet-up went badly, email ${SITE.email} with what happened and the store or product involved. We will look into it as quickly as we can.`,
        ],
    },
];

export default function Guidelines() {
    return (
        <LegalPage
            title="Campus guidelines"
            updated={SITE.legalUpdated}
            intro="How we keep buying and selling on campus friendly, fair and safe."
            sections={SECTIONS}
        />
    );
}
