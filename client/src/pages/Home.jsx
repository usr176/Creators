import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

import Hero from "@/components/Hero";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { PRODUCTS, STORES, getProductsByStore, getStoreById } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";


/* ---------- Shared section header ---------- */

function SectionHeader({ title, intro, action }) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4">
            <div>
                <h2 className="text-2xl font-extralight font-heading sm:text-3xl">
                    {title}
                </h2>
                {intro && (
                    <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
                )}
            </div>
            {action}
        </div>
    );
}


/* ---------- Product carousel ---------- */

function ProductSlide({ product }) {
    const store = getStoreById(product.storeId);

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                {product.image ? (
                    <img
                        src={product.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-6xl font-extralight text-primary/60 transition-transform duration-500 group-hover:scale-105"
                    >
                        {product.title.charAt(0)}
                    </div>
                )}

                {product.stock <= 0 && (
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs text-muted-foreground">
                        Out of stock
                    </span>
                )}
            </div>

            <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium group-hover:underline">
                        {product.title}
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                        {store?.name ?? "Unknown store"}
                    </p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                    Rs. {product.price.toLocaleString("en-PK")}
                </span>
            </div>
        </Link>
    );
}

function FeaturedCarousel() {
    const latest = [...PRODUCTS]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);

    return (
        <section>
            <SectionHeader
                title="Fresh from the makers"
                intro="New pieces from students on campus."
                action={
                    <Link to="/marketplace" className="shrink-0 text-sm hover:underline">
                        View all products
                    </Link>
                }
            />

            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {latest.map((p) => (
                        <CarouselItem
                            key={p.id}
                            className="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4"
                        >
                            <ProductSlide product={p} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Arrows sit inside the edges so they never get clipped; touch users just swipe */}
                <CarouselPrevious className="w-8 h-20" />
                <CarouselNext className="w-8 h-20" />
            </Carousel>
        </section>
    );
}

/* ---------- Stores ---------- */

function StoreQuote({ store }) {
    const count = getProductsByStore(store.id).length;

    return (
        <Card className="flex h-full flex-col gap-0 py-0">

            {/* The quote: the store's own description */}
            <CardContent className="flex-1 p-6">
                <Quote className="h-6 w-6 text-primary/50" aria-hidden="true" />
                <blockquote className="mt-4 text-lg font-light leading-relaxed">
                    &ldquo;{store.bio}&rdquo;
                </blockquote>
            </CardContent>

            {/* Who said it, and the way to their store */}
            <CardFooter className="flex-col items-stretch gap-4 border-t p-6">
                <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11">
                        <AvatarImage src={store.avatar ?? undefined} alt="" />
                        <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate font-medium">{store.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                            {store.owner}, {store.university}
                        </p>
                    </div>

                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {count} {count === 1 ? "product" : "products"}
                    </span>
                </div>

                <Button asChild variant="outline" className="w-full">
                    <Link to={`/store/${store.id}`}>Visit store</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

function Storefronts() {
    const makers = STORES.filter((s) => !s.official)
        .sort((a, b) => b.followers - a.followers)
        .slice(0, 3);

    return (
        <section>
            <SectionHeader
                title="Meet the makers"
                intro="Every product on KraftHub comes from a student's store."
            />

            <div className="grid gap-4 md:grid-cols-3">
                {makers.map((s) => (
                    <StoreQuote key={s.id} store={s} />
                ))}
            </div>
        </section>
    );
}


/* ---------- Call to action ---------- */

function JoinCta() {

    const { user, loading } = useAuth();

    const firstName = user?.name?.split(" ")[0];

    return (
        <section className="rounded-3xl bg-primary p-3 text-primary-foreground sm:p-4">

            {/* Dashed inner border: a stitched-patch look */}
            <div
                className={cn(
                    "rounded-2xl border border-dashed border-primary-foreground/40 px-6 py-14 text-center transition-opacity sm:px-12 sm:py-20",
                    loading && "opacity-0"
                )}
                aria-busy={loading}
            >

                <p className="text-sm uppercase tracking-widest text-primary-foreground/80">
                    {user ? "You're part of KraftHub" : "For student makers"}
                </p>

                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light font-heading sm:text-5xl">
                    {user
                        ? `Ready to share your work, ${firstName}?`
                        : "Made something you\u2019re proud of?"}
                </h2>

                <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
                    {user
                        ? "Set up your profile and put your creations in front of students across campus."
                        : "Join KraftHub and put your work in front of students across campus."}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button asChild size="lg" variant="secondary">
                        {user ? (
                            <Link to="/profile">Go to your profile</Link>
                        ) : (
                            <Link to="/auth">Join KraftHub</Link>
                        )}
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                        <Link to="/guidelines">Read the guidelines</Link>
                    </Button>
                </div>

                <dl className="mx-auto mt-12 flex max-w-sm justify-center gap-12 border-t border-primary-foreground/20 pt-8">
                    <div>
                        <dt className="text-sm text-primary-foreground/80">Student stores</dt>
                        <dd className="text-2xl font-light tabular-nums">{STORES.filter((s) => !s.official).length}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-primary-foreground/80">Handmade products</dt>
                        <dd className="text-2xl font-light tabular-nums">{PRODUCTS.length}</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}


/* ---------- Page ---------- */

function Home() {

    return (
        <div>
            <Hero />

            <div className="flex flex-col gap-30 py-12 sm:gap-24 sm:py-16">
                <FeaturedCarousel />
                <Storefronts />
                <JoinCta />
            </div>
        </div>
    );
}

export default Home;
