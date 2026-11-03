import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";


const CartContext = createContext(null);

const STORAGE_KEY = "krafthub-cart";


function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}


export function CartProvider({ children }) {

    // Each item is a snapshot: { id, title, price, image, stock, storeName, qty }
    const [items, setItems] = useState(loadCart);
    const [isOpen, setIsOpen] = useState(false);

    // Keep the cart across page reloads
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // storage unavailable (private mode, quota): cart still works in memory
        }
    }, [items]);


    const count = useMemo(
        () => items.reduce((sum, i) => sum + i.qty, 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
        [items]
    );


    function addItem(product, storeName, qty = 1) {
        const existing = items.find((i) => i.id === product.id);
        const inCart = existing ? existing.qty : 0;
        const left = product.stock - inCart;
        const toastId = `cart-${product.id}`;

        // Stock checks happen before anything is added
        if (product.stock <= 0) {
            toast.error(`${product.title} is out of stock`, { id: toastId });
            return false;
        }
        if (qty > left) {
            toast.error(
                left <= 0
                    ? `You already have all ${product.stock} in your cart`
                    : `Only ${left} more available`,
                { id: toastId }
            );
            return false;
        }

        setItems((prev) =>
            prev.some((i) => i.id === product.id)
                ? prev.map((i) =>
                      i.id === product.id
                          ? { ...i, qty: i.qty + qty, stock: product.stock }
                          : i
                  )
                : [
                      ...prev,
                      {
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image ?? null,
                          stock: product.stock,
                          storeName,
                          qty,
                      },
                  ]
        );

        toast.success(`${product.title} added to cart`, { id: toastId });
        return true;
    }

    function increment(id) {
        const item = items.find((i) => i.id === id);
        if (!item) return;

        if (item.qty >= item.stock) {
            toast.error(`Only ${item.stock} in stock`);
            return;
        }

        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        );
    }

    function decrement(id) {
        setItems((prev) =>
            prev.map((i) =>
                i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
            )
        );
    }

    function removeItem(id) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    function clearCart() {
        setItems([]);
    }


    const value = {
        items,
        count,
        subtotal,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        increment,
        decrement,
        removeItem,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used inside <CartProvider>");
    }
    return ctx;
}
