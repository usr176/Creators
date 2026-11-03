import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";


const formatPrice = (n) => `Rs. ${n.toLocaleString("en-PK")}`;


// Summary-only placeholder. Payment and delivery details come later.
export default function Checkout() {

    const { items, count, subtotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 py-6 text-center">
                <h1 className="text-3xl font-extralight font-heading">Nothing to check out</h1>
                <p className="text-sm text-muted-foreground">
                    Your cart is empty.
                </p>
                <Button asChild variant="outline">
                    <Link to="/marketplace">Browse marketplace</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto min-h-screen max-w-2xl py-6">

            <h1 className="p-6 text-center text-4xl font-extralight font-heading">
                Order summary
            </h1>

            <ul className="divide-y rounded-lg border border-border">
                {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-4 p-4">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{item.title}</p>
                            <p className="truncate text-xs text-muted-foreground">
                                {item.storeName} · {formatPrice(item.price)} × {item.qty}
                            </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold tabular-nums">
                            {formatPrice(item.price * item.qty)}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-4">
                <span className="text-sm text-muted-foreground">
                    Total ({count} {count === 1 ? "item" : "items"})
                </span>
                <span className="text-xl font-semibold tabular-nums">
                    {formatPrice(subtotal)}
                </span>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
                Payment and delivery are not available yet.
            </p>

            <div className="mt-4 flex justify-center">
                <Button asChild variant="outline">
                    <Link to="/marketplace">Keep shopping</Link>
                </Button>
            </div>
        </div>
    );
}
