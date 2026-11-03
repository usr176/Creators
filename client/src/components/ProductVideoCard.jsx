import { Link } from "react-router-dom";


/**
 * Compact 16:9 card (like a video thumbnail). The whole card links to the
 * product page.
 */
export default function ProductVideoCard({ product }) {

    const { id, title, price, category, image, stock } = product;

    return (
        <Link
            to={`/product/${id}`}
            className="group flex flex-col gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                {image ? (
                    <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-4xl font-extralight text-primary/60"
                    >
                        {title.charAt(0)}
                    </div>
                )}

                {stock <= 0 && (
                    <span className="absolute inset-x-0 bottom-0 bg-background/90 py-1 text-center text-xs text-muted-foreground">
                        Out of stock
                    </span>
                )}
            </div>

            <div className="px-0.5">
                <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug group-hover:underline">
                    {title}
                </h3>
                <p className="text-xs text-muted-foreground">{category}</p>
                <p className="pt-0.5 text-sm font-semibold tabular-nums">
                    Rs. {price.toLocaleString("en-PK")}
                </p>
            </div>
        </Link>
    );
}
