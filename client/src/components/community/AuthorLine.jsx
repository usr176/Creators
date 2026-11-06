import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthorName } from "@/data/articles";


/**
 * Small byline used on article rows: avatar, author, and for student creators
 * the store they write from. The official account gets an "Official" tag.
 */
export default function AuthorLine({ store }) {
    const name = getAuthorName(store);

    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Avatar className="h-6 w-6">
                <AvatarImage src={store.avatar ?? undefined} alt="" />
                <AvatarFallback className="text-xs">{name.charAt(0)}</AvatarFallback>
            </Avatar>

            <Link
                to={`/store/${store.id}`}
                className="rounded-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {name}
            </Link>

            {store.official ? (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Official
                </span>
            ) : (
                <span className="text-muted-foreground">in {store.name}</span>
            )}
        </div>
    );
}
