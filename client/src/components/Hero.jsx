import img from "../assets/1.webp"
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative h-[85vh] overflow-hidden m-10 rounded-3xl">

            {/* Background image */}
            <img
                src={img}
                alt="Student crafts"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                "
            />

            {/* Dark overlay */}
            <div className="
                absolute
                inset-0
                bg-black/55
            " />

            {/* Content */}
            <div className="
                relative
                z-10
                mx-auto
                flex
                h-full
                max-w-6xl
                flex-col
                items-center
                justify-center
                px-6
                text-center
            ">
                <h1 className="
                    max-w-4xl
                    font-heading
                    text-6xl
                    font-semibold
                    text-white
                ">
                    Handmade stories,<br />
                    crafted by students.
                </h1>

                <p className="
                    mt-6
                    max-w-2xl
                    text-lg
                    text-white/90
                ">
                    Discover original student creations.
                </p>

                <Button
                    asChild
                    size="lg"
                    className="mt-10"
                >
                    <Link to="/Marketplace">
                        Explore Marketplace
                    </Link>
                </Button>
            </div>

            {/* Bottom fade */}
            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    h-48
                    w-full
                    bg-linear-to-b
                    from-transparent
                    to-background
                "
            />
        </section>
    );
}