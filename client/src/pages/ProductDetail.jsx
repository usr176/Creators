import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductVideoCard from "@/components/ProductVideoCard";

import { useCart } from "@/context/CartContext";
import { PRODUCTS, getProductById, getStoreById } from "@/data/products";
import { cn } from "@/lib/utils";


const formatPrice = (n) => `Rs. ${n.toLocaleString("en-PK")}`;


/* ---------- Image gallery ---------- */

function MediaGallery({ product }) {

    const media = useMemo(() => {
        const list = [...(product.images ?? [])];
        if (list.length === 0 && product.image) list.push(product.image);
        return list;
    }, [product]);

    const [index, setIndex] = useState(0);
    const current = media[index];

    return (
        <div className="flex flex-col gap-3">
            <div className="aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
                {!current ? (
                    <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-8xl font-extralight text-primary/60"
                    >
                        {product.title.charAt(0)}
                    </div>
                ) : (
                    <img
                        src={current}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            {media.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                    {media.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Show photo ${i + 1}`}
                            aria-pressed={i === index}
                            className={cn(
                                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                i === index ? "border-primary" : "border-border"
                            )}
                        >
                            <img src={src} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


/* ---------- Page content (remounted per product so state resets) ---------- */

function ProductDetailContent({ product }) {

    const navigate = useNavigate();
    const { items, addItem } = useCart();

    const store = getStoreById(product.storeId);
    const storeName = store?.name ?? "Unknown store";

    const inCart = items.find((i) => i.id === product.id)?.qty ?? 0;
    const available = Math.max(0, product.stock - inCart);

    const [qty, setQty] = useState(1);
    const safeQty = Math.min(qty, Math.max(available, 1));

    const outOfStock = product.stock <= 0;
    const allInCart = !outOfStock && available === 0;

    function handleAdd() {
        if (addItem(product, storeName, safeQty)) setQty(1);
    }

    function handleBuyNow() {
        if (allInCart) {
            navigate("/checkout");
            return;
        }
        if (addItem(product, storeName, safeQty)) navigate("/checkout");
    }

    const moreFromStore = PRODUCTS
        .filter((p) => p.storeId === product.storeId && p.id !== product.id)
        .slice(0, 4);

    const similar = PRODUCTS
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen py-6">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <li><Link to="/marketplace" className="hover:underline">Marketplace</Link></li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link
                            to={`/marketplace?category=${encodeURIComponent(product.category)}`}
                            className="hover:underline"
                        >
                            {product.category}
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-foreground">{product.title}</li>
                </ol>
            </nav>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr_18rem]">

                {/* Column 1: media */}
                <MediaGallery product={product} />

                {/* Column 2: info */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-medium leading-snug sm:text-3xl">
                            {product.title}
                        </h1>

                        {store ? (
                            <Link
                                to={`/store/${store.id}`}
                                className="mt-2 inline-flex items-center gap-2 rounded-sm text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {store.avatar ? (
                                    <img src={store.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
                                    >
                                        {store.name.charAt(0)}
                                    </span>
                                )}
                                Visit the {store.name} store
                            </Link>
                        ) : (
                            <p className="mt-2 text-sm text-muted-foreground">{storeName}</p>
                        )}
                    </div>

                    <p className="border-t pt-4 text-2xl font-semibold tabular-nums">
                        {formatPrice(product.price)}
                    </p>

                    <div className="border-t pt-4">
                        <h2 className="mb-2 text-base font-medium">About this item</h2>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                            {(product.highlights ?? []).map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Column 3: buy box */}
                <aside className="h-fit rounded-lg border border-border p-4 md:col-span-2 lg:sticky lg:top-24 lg:col-span-1">
                    <p className="text-2xl font-semibold tabular-nums">
                        {formatPrice(product.price)}
                    </p>

                    <p
                        className={cn(
                            "mt-1 text-sm font-medium",
                            outOfStock ? "text-destructive" : "text-foreground"
                        )}
                    >
                        {outOfStock
                            ? "Out of stock"
                            : product.stock <= 5
                                ? `Only ${product.stock} left in stock`
                                : "In stock"}
                    </p>

                    {allInCart && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            All {product.stock} available are already in your cart.
                        </p>
                    )}

                    {!outOfStock && !allInCart && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Quantity</span>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setQty(Math.max(1, safeQty - 1))}
                                    disabled={safeQty <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                                    {safeQty}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setQty(Math.min(available, safeQty + 1))}
                                    disabled={safeQty >= available}
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                        <Button
                            size="lg"
                            onClick={handleAdd}
                            disabled={outOfStock || allInCart}
                        >
                            Add to cart
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleBuyNow}
                            disabled={outOfStock}
                        >
                            {allInCart ? "Go to checkout" : "Buy now"}
                        </Button>
                    </div>

                    {store && (
                        <p className="mt-4 text-sm text-muted-foreground">
                            Sold by{" "}
                            <Link to={`/store/${store.id}`} className="text-foreground hover:underline">
                                {store.name}
                            </Link>
                        </p>
                    )}
                </aside>
            </div>

            {/* Description */}
            <section className="mt-10 border-t pt-6">
                <h2 className="mb-2 text-xl font-medium">Product description</h2>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {product.details ?? product.desc}
                </p>
            </section>

            {/* More from this store */}
            {moreFromStore.length > 0 && (
                <section className="mt-10">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-medium">More from {storeName}</h2>
                        {store && (
                            <Link to={`/store/${store.id}`} className="text-sm hover:underline">
                                View store
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
                        {moreFromStore.map((p) => (
                            <ProductVideoCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}

            {/* Similar products */}
            {similar.length > 0 && (
                <section className="mt-10">
                    <h2 className="mb-4 text-xl font-medium">More in {product.category}</h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
                        {similar.map((p) => (
                            <ProductVideoCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}


/* ---------- Route component ---------- */

export default function ProductDetail() {

    const { productId } = useParams();
    const product = getProductById(productId);

    // Start at the top when moving between products
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    if (!product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 py-6 text-center">
                <h1 className="text-3xl font-extralight font-heading">Product not found</h1>
                <p className="text-sm text-muted-foreground">
                    It may have been removed or the link is wrong.
                </p>
                <Button asChild variant="outline">
                    <Link to="/marketplace">Back to marketplace</Link>
                </Button>
            </div>
        );
    }

    return <ProductDetailContent key={product.id} product={product} />;
}
