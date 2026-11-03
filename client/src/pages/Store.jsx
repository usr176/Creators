import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ProductVideoCard from "@/components/ProductVideoCard";
import useRequireAuth from "@/hooks/useRequireAuth";

import { getProductsByStore, getStoreById } from "@/data/products";
import { cn } from "@/lib/utils";


const TABS = ["Home", "Products", "About"];

const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
];

const formatPrice = (n) => `Rs. ${n.toLocaleString("en-PK")}`;

const formatMonthYear = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });


function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
                This store has no products yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
                <ProductVideoCard key={p.id} product={p} />
            ))}
        </div>
    );
}


function StoreContent({ store }) {

    const products = useMemo(() => getProductsByStore(store.id), [store.id]);

    const [tab, setTab] = useState("Home");
    const [sort, setSort] = useState("newest");
    const [following, setFollowing] = useState(false);
    const requireAuth = useRequireAuth();

    function toggleFollow() {
        if (!requireAuth("Log in to follow stores")) return;
        setFollowing((f) => !f);
    }

    const newest = useMemo(
        () => [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [products]
    );

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
        else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return list;
    }, [products, sort]);

    // Featured product: the store's newest one
    const featured = newest[0];

    return (
        <div className="min-h-screen py-6">

            {/* Banner */}
            <div className="h-32 w-full overflow-hidden rounded-xl bg-muted sm:h-44 md:h-52">
                {store.banner ? (
                    <img src={store.banner} alt="" className="h-full w-full object-cover" />
                ) : (
                    <div
                        aria-hidden="true"
                        className="h-full w-full bg-gradient-to-r from-primary/25 via-muted to-primary/10"
                    />
                )}
            </div>

            {/* Channel header */}
            <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                {store.avatar ? (
                    <img
                        src={store.avatar}
                        alt=""
                        className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-28 sm:w-28"
                    />
                ) : (
                    <span
                        aria-hidden="true"
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-3xl font-light text-muted-foreground sm:h-28 sm:w-28 sm:text-5xl"
                    >
                        {store.name.charAt(0)}
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-medium font-heading sm:text-3xl">
                        {store.name}
                    </h1>

                    <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-muted-foreground">
                        <span>{store.handle}</span>
                        <span>
                            {(store.followers + (following ? 1 : 0)).toLocaleString("en-PK")} followers
                        </span>
                        <span>
                            {products.length} {products.length === 1 ? "product" : "products"}
                        </span>
                    </p>

                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-muted-foreground">
                        {store.bio}
                    </p>
                </div>

                <Button
                    variant={following ? "outline" : "default"}
                    onClick={toggleFollow}
                    aria-pressed={following}
                    className="sm:self-start"
                >
                    {following ? "Following" : "Follow"}
                </Button>
            </header>

            {/* Tabs */}
            <div role="tablist" aria-label="Store sections" className="mt-6 flex gap-6 border-b">
                {TABS.map((t) => (
                    <button
                        key={t}
                        role="tab"
                        type="button"
                        aria-selected={tab === t}
                        onClick={() => setTab(t)}
                        className={cn(
                            "-mb-px border-b-2 px-1 pb-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            tab === t
                                ? "border-primary font-medium text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="mt-6" role="tabpanel">

                {tab === "Home" && (
                    <div className="flex flex-col gap-10">

                        {featured && (
                            <section className="flex flex-col gap-4 md:flex-row">
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted md:w-1/2">
                                    {featured.image ? (
                                        <img src={featured.image} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <div
                                            aria-hidden="true"
                                            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-6xl font-extralight text-primary/60"
                                        >
                                            {featured.title.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-1 flex-col gap-2">
                                    <p className="text-xs text-muted-foreground">
                                        Featured product
                                    </p>
                                    <h2 className="text-xl font-medium leading-snug">
                                        {featured.title}
                                    </h2>
                                    <p className="text-lg font-semibold tabular-nums">
                                        {formatPrice(featured.price)}
                                    </p>
                                    <p className="line-clamp-4 text-sm text-muted-foreground">
                                        {featured.details ?? featured.desc}
                                    </p>
                                    <div className="pt-2">
                                        <Button asChild>
                                            <Link to={`/product/${featured.id}`}>View product</Link>
                                        </Button>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="mb-4 text-lg font-medium">Latest products</h2>
                            <ProductGrid products={newest.slice(0, 8)} />
                        </section>
                    </div>
                )}

                {tab === "Products" && (
                    <section>
                        <div className="mb-4 flex items-center justify-end gap-2">
                            <label htmlFor="store-sort" className="text-sm text-muted-foreground">
                                Sort by
                            </label>
                            <select
                                id="store-sort"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                        <ProductGrid products={sortedProducts} />
                    </section>
                )}

                {tab === "About" && (
                    <section className="max-w-2xl">
                        <h2 className="mb-2 text-lg font-medium">About {store.name}</h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">{store.bio}</p>

                        <dl className="mt-6 grid grid-cols-[8rem_1fr] gap-y-3 text-sm">
                            <dt className="text-muted-foreground">Creator</dt>
                            <dd>{store.owner}</dd>

                            <dt className="text-muted-foreground">University</dt>
                            <dd>{store.university}</dd>

                            <dt className="text-muted-foreground">Joined</dt>
                            <dd>{formatMonthYear(store.joined)}</dd>

                            <dt className="text-muted-foreground">Products</dt>
                            <dd>{products.length}</dd>
                        </dl>
                    </section>
                )}
            </div>
        </div>
    );
}


export default function Store() {

    const { storeId } = useParams();
    const store = getStoreById(storeId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [storeId]);

    if (!store) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 py-6 text-center">
                <h1 className="text-3xl font-extralight font-heading">Store not found</h1>
                <p className="text-sm text-muted-foreground">
                    It may have been removed or the link is wrong.
                </p>
                <Button asChild variant="outline">
                    <Link to="/marketplace">Back to marketplace</Link>
                </Button>
            </div>
        );
    }

    // key resets tab, sort and follow state when switching stores
    return <StoreContent key={store.id} store={store} />;
}
