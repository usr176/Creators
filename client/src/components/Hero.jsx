import img from "../assets/1.webp";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";


export default function Hero() {

    return (

        <section
            className="
                relative
                h-[75vh]
                md:h-[85vh]
                overflow-hidden
                my-6
                rounded-3xl
            "
        >

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


            <div
                className="
                    absolute
                    inset-0
                    bg-black/55
                "
            />


            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    justify-center
                    px-6
                    text-center
                "
            >

                <h1
                    className="
                        max-w-4xl
                        font-heading
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-semibold
                        text-white
                    "
                >
                    Handmade stories,<br />
                    crafted by students.
                </h1>


                <p
                    className="
                        mt-6
                        max-w-2xl
                        text-lg
                        text-white/90
                    "
                >
                    Discover original student creations.
                </p>


                <Button
                    asChild
                    size="lg"
                    className="mt-10"
                >

                    <Link to="/marketplace">
                        Explore Marketplace
                    </Link>

                </Button>


            </div>


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