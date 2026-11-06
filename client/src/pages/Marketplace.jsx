import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import CategorySidebar from "@/components/CategorySidebar";
import ProductListingCard from "@/components/ProductListingCard";

import { PRODUCTS, STORES, CATEGORIES } from "@/data/products";


const ALL = "All";

const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
];


export default function Marketplace() {

    // When the Flask API is ready, replace these with state filled by fetch()
    // inside a useEffect, e.g. setProducts(await res.json()).
    const products = PRODUCTS;
    const stores = STORES;

    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");

    const [category, setCategory] = useState(
        CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : ALL
    );
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("featured");

    // storeId -> store name, for the "by ..." line on each card
    const storeNames = useMemo(
        () => Object.fromEntries(stores.map((s) => [s.id, s.name])),
        [stores]
    );

    // storeId -> uploaded store photo (null if none)
    const storeAvatars = useMemo(
        () => Object.fromEntries(stores.map((s) => [s.id, s.avatar ?? null])),
        [stores]
    );

    // Product count per category (ignores the search text so counts stay stable)
    const counts = useMemo(() => {
        const result = { [ALL]: products.length };
        for (const p of products) {
            result[p.category] = (result[p.category] ?? 0) + 1;
        }
        return result;
    }, [products]);

    const visibleProducts = useMemo(() => {
        const q = query.trim().toLowerCase();

        const filtered = products.filter((p) => {
            if (category !== ALL && p.category !== category) return false;
            if (!q) return true;

            const store = storeNames[p.storeId] ?? "";
            return (
                p.title.toLowerCase().includes(q) ||
                p.desc.toLowerCase().includes(q) ||
                store.toLowerCase().includes(q)
            );
        });

        const sorted = [...filtered];
        switch (sort) {
            case "price-asc":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                sorted.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;
            default:
                break; // "featured" keeps the original order
        }
        return sorted;
    }, [products, storeNames, category, query, sort]);

    const hasActiveFilters = category !== ALL || query.trim() !== "";

    function clearFilters() {
        setCategory(ALL);
        setQuery("");
    }

    return (
        <div className="
            min-h-screen
            bg-background
            text-foreground
            py-6
            ">

            <header className="pb-8">
                <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">
                    Marketplace
                </h1>
                <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-muted-foreground">
                    Discover student handmade crafts.
                </p>
            </header>

            {/* Search + sort */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products or stores"
                        aria-label="Search products or stores"
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-muted-foreground">
                        Sort by
                    </label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        {SORT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">

                {/* Categories: sidebar on desktop, chips on mobile */}
                <CategorySidebar
                    categories={CATEGORIES}
                    counts={counts}
                    active={category}
                    onSelect={setCategory}
                    allLabel={ALL}
                />

                {/* Products section */}
                <section className="min-w-0 flex-1" aria-live="polite">

                    <div className="mb-4 flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">
                            {visibleProducts.length}{" "}
                            {visibleProducts.length === 1 ? "product" : "products"}
                            {category !== ALL && ` in ${category}`}
                        </p>

                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                <X className="h-4 w-4" />
                                Clear filters
                            </Button>
                        )}
                    </div>

                    {visibleProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {visibleProducts.map((product) => (
                                <ProductListingCard
                                    key={product.id}
                                    product={product}
                                    storeName={storeNames[product.storeId] ?? "Unknown store"}
                                    storeAvatar={storeAvatars[product.storeId] ?? null}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-6 py-16 text-center">
                            <p className="text-lg font-medium">No products found</p>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                Try a different search or pick another category.
                            </p>
                            <Button variant="outline" onClick={clearFilters}>
                                Show all products
                            </Button>
                        </div>
                    )}
                </section>
            </div>
        </div>

    );
}
