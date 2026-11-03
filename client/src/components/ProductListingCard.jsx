import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import useRequireAuth from "@/hooks/useRequireAuth";
import { cn } from "@/lib/utils";

/**
 * A single product in the marketplace grid.
 *
 * Props:
 *  product: { id, title, desc, price, stock, category, image, storeId }
 *  storeName: string
 *  storeAvatar: string | null   photo uploaded by the store
 *
 * Kept separate from components/ProductCard so that existing usages of
 * ProductCard (e.g. on the Home page) are not affected.
 */
export default function ProductListingCard({ product, storeName, storeAvatar }) {
    const [saved, setSaved] = useState(false);
    const { addItem } = useCart();
    const requireAuth = useRequireAuth();

    const { id, title, desc, price, stock, category, image, storeId } = product;

    function toggleSaved() {
        if (!requireAuth("Log in to save items")) return;
        setSaved((s) => !s);
    }

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
            {/* Image area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Link to={`/product/${id}`} aria-label={`View ${title}`} className="block h-full w-full">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div
                            aria-hidden="true"
                            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-5xl font-extralight text-primary/60"
                        >
                            {title.charAt(0)}
                        </div>
                    )}
                </Link>

                <button
                    type="button"
                    onClick={toggleSaved}
                    aria-pressed={saved}
                    aria-label={saved ? "Remove from saved" : "Save item"}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <Heart
                        className={cn(
                            "h-4 w-4",
                            saved ? "fill-primary text-primary" : "text-foreground"
                        )}
                    />
                </button>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-xs text-muted-foreground">{category}</p>

                {/* Title: always reserves 2 lines */}
                <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-medium leading-snug">
                    <Link to={`/product/${id}`} className="hover:underline">
                        {title}
                    </Link>
                </h3>

                {/* Description: always reserves 2 lines */}
                <p className="line-clamp-2 h-10 text-sm leading-5 text-muted-foreground">
                    {desc}
                </p>

                {/* Store: links to the store page */}
                <Link
                    to={`/store/${storeId}`}
                    className="mt-1 flex w-fit max-w-full items-center gap-2 rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {storeAvatar ? (
                        <img
                            src={storeAvatar}
                            alt=""
                            loading="lazy"
                            className="h-6 w-6 shrink-0 rounded-full object-cover"
                        />
                    ) : (
                        <span
                            aria-hidden="true"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
                        >
                            {storeName.charAt(0)}
                        </span>
                    )}
                    <span className="truncate text-xs text-muted-foreground">
                        {storeName}
                    </span>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="text-base font-semibold tabular-nums">
                        Rs. {price.toLocaleString("en-PK")}
                    </span>

                    <Button
                        size="sm"
                        onClick={() => addItem(product, storeName)}
                        disabled={stock <= 0}
                    >
                        {stock <= 0 ? "Out of stock" : "Add to cart"}
                    </Button>
                </div>
            </div>
        </article>
    );
}
