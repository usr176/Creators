import AuthCard from "@/components/auth/auth-card";

export default function Auth() {
    return (
        <section
            className="
                flex
                h-full
                items-start
                justify-center
                pt-16
                pb-16
                min-h-[calc(100vh-140px)]
            "
        >
            <AuthCard />
        </section>
    );
}