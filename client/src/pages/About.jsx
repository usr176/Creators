import { Eye, Target } from "lucide-react";


export default function About() {

    return (
        <div className="
            min-h-screen
            bg-background
            text-foreground
            ">

            <div className="max-w-5xl mx-auto">

                <header className="border-b pb-8">
                    <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">
                        About
                    </h1>
                </header>

                <section className="py-10 sm:py-14">
                    <span className="mb-5 block h-0.5 w-10 bg-primary" aria-hidden="true" />
                    <h2 className="max-w-3xl font-serif text-2xl font-light leading-snug sm:text-3xl">
                        Where student creativity finds its audience.
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                        Every student has a skill, passion, or creative idea waiting to be shared.
                        Whether it is handmade crafts, artwork, customized products, or unique creations, many students turn their hobbies into something meaningful.
                        However, great ideas often remain unseen because creators lack the right platform, audience, and opportunity to showcase their work.
                    </p>
                </section>

                <section className="border-t py-10 sm:py-14">
                    <span className="mb-5 block h-0.5 w-10 bg-primary" aria-hidden="true" />
                    <h2 className="max-w-3xl font-serif text-2xl font-light leading-snug sm:text-3xl">
                        KraftHub was created to change that.
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                        We believe that student creativity deserves more than being limited to personal networks, scattered social media posts, or word-of-mouth.
                        Our platform provides student creators with a dedicated space where they can showcase their products professionally,
                        connect with their university community,
                        and turn their passions into real opportunities.
                    </p>
                </section>

                {/* Mission and vision: stacked on mobile, side by side from md up */}
                <section className="grid grid-cols-1 gap-4 border-t py-10 sm:py-14 md:grid-cols-2 md:gap-6">

                    <div className="min-w-0 rounded-2xl border bg-muted/30 p-6 sm:p-8">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Target className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h2 className="mt-5 font-serif text-2xl font-light">
                            Our Mission
                        </h2>
                        <p className="mt-3 break-words leading-relaxed text-muted-foreground">
                            To empower student creators by providing them with the platform
                            and community they need to transform their hobbies and creative skills into opportunities.
                        </p>
                    </div>

                    <div className="min-w-0 rounded-2xl border bg-muted/30 p-6 sm:p-8">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Eye className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h2 className="mt-5 font-serif text-2xl font-light">
                            Our Vision
                        </h2>
                        <p className="mt-3 wrap-break-word leading-relaxed text-muted-foreground">
                            To become a platform where every student creator has the opportunity to be discovered,
                            supported, and empowered to grow.
                        </p>
                    </div>

                </section>

            </div>
        </div>
    );
}
