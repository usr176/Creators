import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { useCart } from "@/context/CartContext";


const formatPrice = (n) => `Rs. ${n.toLocaleString("en-PK")}`;


/**
 * Cart panel. Rendered once (inside Navbar) and opened through CartContext.
 * - sm and up: slides in from the right as a sidebar
 * - below sm: takes the full screen
 */
export default function CartDrawer() {

    const navigate = useNavigate();

    const {
        items,
        count,
        subtotal,
        isOpen,
        openCart,
        closeCart,
        increment,
        decrement,
        removeItem,
    } = useCart();

    function goToCheckout() {
        closeCart();
        navigate("/checkout");
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
            <SheetContent
                side="right"
                className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
            >
                <SheetHeader className="border-b p-4 text-left">
                    <SheetTitle>Your cart</SheetTitle>
                    <SheetDescription>
                        {count === 0
                            ? "Nothing here yet"
                            : `${count} ${count === 1 ? "item" : "items"}`}
                    </SheetDescription>
                </SheetHeader>

                {/* Items */}
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <p className="max-w-xs text-sm text-muted-foreground">
                            Add something handmade from the marketplace and it will show up here.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                closeCart();
                                navigate("/marketplace");
                            }}
                        >
                            Browse marketplace
                        </Button>
                    </div>
                ) : (
                    <ul className="flex-1 divide-y overflow-y-auto px-4">
                        {items.map((item) => {
                            const atLimit = item.qty >= item.stock;

                            return (
                                <li key={item.id} className="flex gap-3 py-4">
                                    {/* Thumbnail */}
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                aria-hidden="true"
                                                className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-muted text-xl font-extralight text-primary/60"
                                            >
                                                {item.title.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="line-clamp-2 text-sm font-medium leading-snug">
                                                    {item.title}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {item.storeName}
                                                </p>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 shrink-0"
                                                onClick={() => removeItem(item.id)}
                                                aria-label={`Remove ${item.title} from cart`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 pt-1">
                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => decrement(item.id)}
                                                    disabled={item.qty <= 1}
                                                    aria-label={`Decrease quantity of ${item.title}`}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>

                                                <span
                                                    className="w-8 text-center text-sm tabular-nums"
                                                    aria-live="polite"
                                                >
                                                    {item.qty}
                                                </span>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => increment(item.id)}
                                                    disabled={atLimit}
                                                    aria-label={`Increase quantity of ${item.title}`}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <span className="text-sm font-semibold tabular-nums">
                                                {formatPrice(item.price * item.qty)}
                                            </span>
                                        </div>

                                        {atLimit && (
                                            <p className="text-xs text-muted-foreground">
                                                Maximum available: {item.stock}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {/* Footer: subtotal + checkout */}
                {items.length > 0 && (
                    <div className="border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Subtotal</span>
                            <span className="text-lg font-semibold tabular-nums">
                                {formatPrice(subtotal)}
                            </span>
                        </div>

                        <Button className="w-full" size="lg" onClick={goToCheckout}>
                            Checkout
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
