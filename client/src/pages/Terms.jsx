import LegalPage from "@/components/LegalPage";
import { SITE } from "@/config/site";

// NOTE: draft written for a student-run campus marketplace.
// Have it reviewed (by your university or a legal adviser) before relying on it.

const SECTIONS = [
    {
        heading: "What KraftHub is",
        paragraphs: [
            `${SITE.name} is a student-run marketplace where ${SITE.university} students can list and sell things they have made, and where others on campus can buy them.`,
            "Each store belongs to the student who runs it. KraftHub provides the website, but we are not the seller of the items listed, and a purchase is an agreement between the buyer and the seller.",
        ],
    },
    {
        heading: "Accounts",
        items: [
            "Give accurate information when you sign up, and keep your login details private.",
            "You are responsible for what happens under your account.",
            "One person, one account. Do not pretend to be someone else or run a store in someone else's name.",
        ],
    },
    {
        heading: "Listing your work",
        paragraphs: ["If you open a store, you agree that:"],
        items: [
            "You made the items you list, or you have the right to sell them.",
            "Titles, photos, descriptions, prices (in Pakistani rupees) and stock numbers are honest and kept up to date.",
            "You will prepare and hand over orders in good faith, and tell buyers early if something cannot be fulfilled.",
            "Handmade items can differ slightly from the photos. Say so in the listing where it matters.",
        ],
    },
    {
        heading: "What you may not sell or post",
        items: [
            "Copied, counterfeit or unlicensed goods, including other people's artwork, logos or branded merchandise.",
            "Assignments, projects, exam papers, or any academic work done for someone else.",
            "Anything illegal, or banned by university rules, such as alcohol, tobacco and vapes, weapons, medicines or dangerous items.",
            "Adult, hateful, threatening or harassing content.",
            "Fake reviews, spam, or listings meant to mislead.",
        ],
    },
    {
        heading: "Homemade food",
        paragraphs: [
            "Food sellers must prepare items safely and list the ingredients, including common allergens (such as nuts, milk, eggs, wheat). Say when an item was baked and how long it keeps. Follow any rules the university sets for food sold on campus.",
        ],
    },
    {
        heading: "Buying",
        items: [
            "Prices are shown in Pakistani rupees (Rs.). How payment and pickup are handled is shown at checkout.",
            "Check the item description and stock before you order.",
            "If there is a problem, contact the seller first. If you cannot sort it out, contact us and we will try to help, but we cannot guarantee a result.",
        ],
    },
    {
        heading: "Meeting on campus",
        paragraphs: [
            "Pickups usually happen on campus. Meet in public, busy places and follow our campus guidelines. KraftHub is not responsible for what happens during a meet-up, so please look after your own safety.",
        ],
    },
    {
        heading: "Your content",
        paragraphs: [
            "You keep the rights to the photos and text you upload. By uploading them you let KraftHub display them on the site so your store can be seen. Do not upload anything you do not have the right to share.",
        ],
    },
    {
        heading: "Behaving well",
        paragraphs: [
            "Be respectful to every buyer and seller. We may remove listings or suspend accounts that break these terms or the campus guidelines, and where required we may share relevant information with the university.",
        ],
    },
    {
        heading: "Limits of responsibility",
        paragraphs: [
            `${SITE.name} is a student project and is provided as it is, without promises that it will always be available or free of errors. To the extent the law allows, we are not liable for losses from transactions between users, for items sold, or for meet-ups.`,
        ],
    },
    {
        heading: "Changes and contact",
        paragraphs: [
            `We may update these terms as the site grows, and will change the date at the top when we do. Questions or concerns: ${SITE.email}.`,
        ],
    },
];

export default function Terms() {
    return (
        <LegalPage
            title="Terms of use"
            updated={SITE.legalUpdated}
            intro={`These terms explain how ${SITE.name} works and what we expect from everyone who uses it. By creating an account or using the site, you agree to them.`}
            sections={SECTIONS}
        />
    );
}
