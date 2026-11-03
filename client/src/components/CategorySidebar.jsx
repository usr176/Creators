import { cn } from "@/lib/utils";

/**
 * Category filter.
 * - lg and up: vertical sidebar with item counts
 * - below lg: horizontally scrollable chips
 *
 * Props:
 *  categories: string[]            category names (without "All")
 *  counts:     { [name]: number }  product count per category, plus counts[allLabel]
 *  active:     string              currently selected category
 *  onSelect:   (name) => void
 *  allLabel:   string              label for the "show everything" option
 */
export default function CategorySidebar({
    categories,
    counts,
    active,
    onSelect,
    allLabel = "All",
}) {
    const options = [allLabel, ...categories];

    return (
        <>
            {/* Mobile / tablet: chips */}
            <nav
                aria-label="Product categories"
                className="lg:hidden -mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
            >
                {options.map((name) => {
                    const isActive = name === active;
                    return (
                        <button
                            key={name}
                            type="button"
                            onClick={() => onSelect(name)}
                            aria-pressed={isActive}
                            className={cn(
                                "shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                isActive
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-foreground hover:bg-muted"
                            )}
                        >
                            {name}
                        </button>
                    );
                })}
            </nav>

            {/* Desktop: sidebar */}
            <aside className="hidden w-60 shrink-0 lg:block">
                <nav
                    aria-label="Product categories"
                    className="sticky top-24 rounded-lg border border-border p-3"
                >
                    <h2 className="px-2 pb-2 text-sm font-medium text-muted-foreground">
                        Categories
                    </h2>

                    <ul className="flex flex-col gap-0.5">
                        {options.map((name) => {
                            const isActive = name === active;
                            return (
                                <li key={name}>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(name)}
                                        aria-current={isActive ? "true" : undefined}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm transition-colors",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-foreground hover:bg-muted"
                                        )}
                                    >
                                        <span>{name}</span>
                                        <span
                                            className={cn(
                                                "text-xs tabular-nums",
                                                isActive
                                                    ? "text-primary-foreground/80"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {counts[name] ?? 0}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
