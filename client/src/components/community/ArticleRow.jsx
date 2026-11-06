import { Link } from "react-router-dom";

import AuthorLine from "@/components/community/AuthorLine";
import { formatArticleDate } from "@/data/articles";
import { getStoreById } from "@/data/products";


/** One article in a feed */
export default function ArticleRow({ article }) {

    const store = getStoreById(article.storeId);
    const href = `/community/${article.slug}`;

    return (
        <article className="py-8">
            <div className="flex gap-5 sm:gap-8">

                <div className="min-w-0 flex-1">
                    {store && <AuthorLine store={store} />}

                    <Link
                        to={href}
                        className="group mt-3 block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <h2 className="font-serif text-xl font-bold leading-snug tracking-tight group-hover:underline sm:text-2xl">
                            {article.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 font-serif text-base leading-relaxed text-muted-foreground">
                            {article.excerpt}
                        </p>
                    </Link>

                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                        <span>{formatArticleDate(article.date)}</span>
                        <Link
                            to={`/community?topic=${encodeURIComponent(article.topic)}`}
                            className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground transition-colors hover:bg-muted/70"
                        >
                            {article.topic}
                        </Link>
                    </div>
                </div>

                {/* Thumbnail (decorative duplicate of the title link) */}
                <Link
                    to={href}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="h-20 w-20 shrink-0 self-start overflow-hidden rounded-md bg-muted sm:h-28 sm:w-40"
                >
                    {article.cover ? (
                        <img
                            src={article.cover}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted font-serif text-3xl text-primary/60">
                            {article.title.charAt(0)}
                        </span>
                    )}
                </Link>
            </div>
        </article>
    );
}
