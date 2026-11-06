import { Link, useSearchParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArticleRow from "@/components/community/ArticleRow";

import { ARTICLES, TOPICS, getAuthorName } from "@/data/articles";
import { getStoreById } from "@/data/products";
import { cn } from "@/lib/utils";


/* ---------- Sidebar pieces ---------- */

function SideHeading({ children }) {
    return <h2 className="mb-4 text-sm font-medium">{children}</h2>;
}

function TeamPicks() {
    const picks = ARTICLES.filter((a) => getStoreById(a.storeId)?.official).slice(0, 3);
    if (picks.length === 0) return null;

    return (
        <section>
            <SideHeading>From the KraftHub team</SideHeading>
            <ul className="flex flex-col gap-5">
                {picks.map((a) => (
                    <li key={a.slug}>
                        <Link to={`/community/${a.slug}`} className="group block">
                            <p className="text-xs text-muted-foreground">
                                {getStoreById(a.storeId)?.name}
                            </p>
                            <p className="mt-1 font-serif text-base font-bold leading-snug group-hover:underline">
                                {a.title}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function FeaturedCreators() {
    // Creators who have published at least one article (official account excluded)
    const ids = [...new Set(ARTICLES.map((a) => a.storeId))];
    const creators = ids
        .map(getStoreById)
        .filter((s) => s && !s.official)
        .slice(0, 4);

    return (
        <section>
            <SideHeading>Featured creators</SideHeading>
            <ul className="flex flex-col gap-4">
                {creators.map((s) => (
                    <li key={s.id}>
                        <Link
                            to={`/store/${s.id}`}
                            className="group flex items-start gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <Avatar className="h-10 w-10 shrink-0">
                                <AvatarImage src={s.avatar ?? undefined} alt="" />
                                <AvatarFallback>{getAuthorName(s).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="text-sm font-medium group-hover:underline">
                                    {getAuthorName(s)}
                                </p>
                                <p className="line-clamp-2 text-xs text-muted-foreground">
                                    {s.bio}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
                Community writers are selected by the KraftHub team.
            </p>
        </section>
    );
}

function TopicChips({ activeTopic }) {
    return (
        <section>
            <SideHeading>Topics</SideHeading>
            <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                    <Link
                        key={t}
                        to={`/community?topic=${encodeURIComponent(t)}`}
                        className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-colors",
                            t === activeTopic
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/70"
                        )}
                    >
                        {t}
                    </Link>
                ))}
            </div>
        </section>
    );
}


/* ---------- Page ---------- */

export default function Community() {

    const [searchParams, setSearchParams] = useSearchParams();
    const topicParam = searchParams.get("topic");
    const topic = TOPICS.includes(topicParam) ? topicParam : null;

    const visible = topic ? ARTICLES.filter((a) => a.topic === topic) : ARTICLES;

    function selectTopic(next) {
        setSearchParams(next ? { topic: next } : {});
    }

    const tabClass = (active) =>
        cn(
            "-mb-px shrink-0 border-b-2 px-1 pb-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
        );

    return (
        <div className="min-h-screen py-10">

            <header className="pb-8">
                <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">
                    Community
                </h1>
                <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-muted-foreground">
                    Stories and know-how from campus makers, and guides from the KraftHub team.
                </p>
            </header>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">

                {/* Feed */}
                <main>

                    {visible.length > 0 ? (
                        <div className="divide-y">
                            {visible.map((a) => (
                                <ArticleRow key={a.slug} article={a} />
                            ))}
                        </div>
                    ) : (
                        <p className="py-16 text-center font-serif text-muted-foreground">
                            No articles in this topic yet.
                        </p>
                    )}
                </main>

                {/* Sidebar */}
                {/* Will be implemented if community tab is to be further upgraded*/}
            </div>
        </div>
    );
}
