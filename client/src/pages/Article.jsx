import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ArticleRow from "@/components/community/ArticleRow";
import ProductVideoCard from "@/components/ProductVideoCard";

import {
    ARTICLES,
    formatArticleDate,
    getArticleBySlug,
    getAuthorName
} from "@/data/articles";
import { getProductById, getStoreById } from "@/data/products";


/* ---------- Thin reading-progress bar at the top of the screen ---------- */

function ReadingProgress({ targetRef }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function update() {
            const el = targetRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
        }

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [targetRef]);

    return (
        <div
            aria-hidden="true"
            className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-primary"
            style={{ transform: `scaleX(${progress})` }}
        />
    );
}


/* ---------- Article body blocks ---------- */

function Block({ block }) {
    switch (block.type) {
        case "h2":
            return (
                <h2 className="mb-4 mt-12 font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                    {block.text}
                </h2>
            );
        case "quote":
            return (
                <blockquote className="my-10 border-l-2 border-primary pl-6 font-serif text-2xl italic leading-snug sm:text-[1.75rem]">
                    &ldquo;{block.text}&rdquo;
                </blockquote>
            );
        case "ul":
            return (
                <ul className="my-6 list-disc space-y-2 pl-6 marker:text-muted-foreground">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
            );
        case "ol":
            return (
                <ol className="my-6 list-decimal space-y-3 pl-6 marker:font-sans marker:text-muted-foreground">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                </ol>
            );
        default:
            return <p className="mb-6">{block.text}</p>;
    }
}


/* ---------- Page content ---------- */

function ArticleContent({ article }) {

    const articleRef = useRef(null);

    const store = getStoreById(article.storeId);
    const authorName = store ? getAuthorName(store) : "KraftHub";

    const products = article.products.map(getProductById).filter(Boolean);

    // More to read: same topic first, then the rest
    const more = ARTICLES
        .filter((a) => a.slug !== article.slug)
        .sort((a, b) => Number(b.topic === article.topic) - Number(a.topic === article.topic))
        .slice(0, 3);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied", { id: "copy-link" });
        } catch {
            toast.error("Couldn't copy the link", { id: "copy-link" });
        }
    }

    return (
        <div className="min-h-screen py-10">

            <ReadingProgress targetRef={articleRef} />

            <article ref={articleRef} className="mx-auto max-w-[42rem]">

                <Link
                    to="/community"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                    Community
                </Link>

                <header className="mt-6">
                    <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
                        {article.title}
                    </h1>
                    <p className="mt-5 font-serif text-xl leading-relaxed text-muted-foreground">
                        {article.excerpt}
                    </p>

                    {/* Byline */}
                    <div className="mt-8 flex items-center justify-between gap-4 border-y py-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={store?.avatar ?? undefined} alt="" />
                                <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 text-sm">
                                <p className="flex flex-wrap items-center gap-x-2">
                                    {store ? (
                                        <Link
                                            to={`/store/${store.id}`}
                                            className="font-medium hover:underline"
                                        >
                                            {authorName}
                                        </Link>
                                    ) : (
                                        <span className="font-medium">{authorName}</span>
                                    )}
                                    {store?.official && (
                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                            Official
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 gap-2"
                            onClick={copyLink}
                        >
                            <Share2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Copy link</span>
                            <span className="sr-only sm:hidden">Copy link</span>
                        </Button>
                    </div>
                </header>

                {/* Cover */}
                <figure className="my-10">
                    <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                        {article.cover ? (
                            <img src={article.cover} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <div
                                aria-hidden="true"
                                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted font-serif text-4xl font-light text-primary/60 sm:text-5xl"
                            >
                                {article.topic}
                            </div>
                        )}
                    </div>
                </figure>

                {/* Body */}
                <div className="font-serif text-[1.1875rem] leading-[1.85] text-foreground/90">
                    {article.body.map((block, i) => (
                        <Block key={i} block={block} />
                    ))}
                </div>

                {/* Topic */}
                <div className="mt-12">
                    <Link
                        to={`/community?topic=${encodeURIComponent(article.topic)}`}
                        className="rounded-full bg-muted px-4 py-2 text-sm transition-colors hover:bg-muted/70"
                    >
                        {article.topic}
                    </Link>
                </div>

                {/* Author card */}
                {store && (
                    <section className="mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center">
                        <Avatar className="h-16 w-16 shrink-0">
                            <AvatarImage src={store.avatar ?? undefined} alt="" />
                            <AvatarFallback className="text-xl">{authorName.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm text-muted-foreground">Written by</p>
                            <p className="text-lg font-medium">{authorName}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{store.bio}</p>
                        </div>

                        <Button asChild variant="outline" className="shrink-0">
                            <Link to={`/store/${store.id}`}>
                                {store.official ? "Shop KraftHub" : "Visit store"}
                            </Link>
                        </Button>
                    </section>
                )}
            </article>

            {/* Featured products */}
            {products.length > 0 && (
                <section className="mx-auto mt-14 max-w-[42rem] border-t pt-8">
                    <h2 className="text-lg font-medium">Featured in this article</h2>
                    <p className="mb-6 mt-1 text-sm text-muted-foreground">
                        Available on KraftHub.
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        {products.map((p) => (
                            <ProductVideoCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            {/* More to read */}
            {more.length > 0 && (
                <section className="mx-auto mt-16 max-w-3xl border-t pt-10">
                    <h2 className="font-serif text-2xl font-bold tracking-tight">
                        More from the community
                    </h2>
                    <div className="divide-y">
                        {more.map((a) => (
                            <ArticleRow key={a.slug} article={a} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}


/* ---------- Route component ---------- */

export default function Article() {

    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 py-6 text-center">
                <h1 className="font-serif text-4xl font-bold">Article not found</h1>
                <p className="text-sm text-muted-foreground">
                    It may have been removed or the link is wrong.
                </p>
                <Button asChild variant="outline">
                    <Link to="/community">Back to community</Link>
                </Button>
            </div>
        );
    }

    return <ArticleContent key={article.slug} article={article} />;
}
