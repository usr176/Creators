import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";


export default function CartButton() {

    const { count, openCart } = useCart();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative h-10 w-10"
        >
            <ShoppingBag className="h-5 w-5" />

            {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </Button>
    );
}
