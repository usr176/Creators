// Temporary data source for the marketplace.
// Shape mirrors what a Flask endpoint (e.g. GET /api/products, GET /api/stores)
// would return, so swapping to fetch() later only touches Marketplace.jsx.

export const CATEGORIES = [
    "Art & Illustration",
    "Crafts & Decor",
    "Jewelry & Accessories",
    "Clothing & Textiles",
    "Stationery & Prints",
    "Tech & Gadgets",
    "Food & Baked Goods",
];

// avatar / banner: images uploaded by the store (URL or imported asset).
// When null, the UI shows a placeholder.
export const STORES = [
    {
        id: 1, name: "Inkwell Studio", handle: "@inkwellstudio", owner: "Areeba K.",
        bio: "Illustrations and prints by Areeba. Mostly watercolor and linocut, made to order.",
        followers: 1240, joined: "2026-08-14", university: "FAST NUCES",
        avatar: null, banner: null,
    },
    {
        id: 2, name: "Threaded", handle: "@threaded", owner: "Hamza R.",
        bio: "Embroidery and textile work by Hamza. Every piece is stitched by hand.",
        followers: 860, joined: "2026-08-20", university: "FAST NUCES",
        avatar: null, banner: null,
    },
    {
        id: 3, name: "Clay & Co.", handle: "@clayandco", owner: "Sana M.",
        bio: "Ceramics and handmade jewelry by Sana. Small batches, finished by hand.",
        followers: 2310, joined: "2026-07-30", university: "FAST NUCES",
        avatar: null, banner: null,
    },
    {
        id: 4, name: "Bit by Bit", handle: "@bitbybit", owner: "Usman T.",
        bio: "3D prints and custom keyboard parts by Usman.",
        followers: 540, joined: "2026-09-05", university: "FAST NUCES",
        avatar: null, banner: null,
    },
    {
        id: 5, name: "Sugar Lab", handle: "@sugarlab", owner: "Maham A.",
        bio: "Brownies and cupcakes by Maham, baked to order.",
        followers: 1780, joined: "2026-08-02", university: "FAST NUCES",
        avatar: null, banner: null,
    },
    {
        id: 6, name: "Paper Trail", handle: "@papertrail", owner: "Zain F.",
        bio: "Notebooks, stickers and prints by Zain.",
        followers: 970, joined: "2026-09-12", university: "FAST NUCES",
        avatar: null, banner: null,
    },
    {
        id: 7, name: "KraftHub", handle: "@krafthub", owner: "The KraftHub team", official: true,
        bio: "Official guides, starter kits and picks from the KraftHub team.",
        followers: 3200, joined: "2026-07-15", university: "FAST NUCES",
        avatar: null, banner: null,
    },
];

// stock: units available. 0 = out of stock.
// image: set to a URL (or imported asset) when you have one.
// When null, the card shows a placeholder block instead.
export const PRODUCTS = [
    {
        id: 1,
        title: "Watercolor Campus Postcards (Set of 6)",
        desc: "Hand-painted postcards of campus corners, printed on textured paper.",
        price: 1200,
        stock: 12,
        category: "Art & Illustration",
        storeId: 1,
        image: null,
        details: "Six postcards, each painted in watercolor from a different corner of campus, then printed on textured paper. The back is blank with space for a message. They ship flat in a card sleeve.",
        highlights: ["Set of 6 different designs", "Printed on textured paper", "Blank back for writing", "Ships flat in a protective sleeve"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-28",
    },
    {
        id: 2,
        title: "Hand-Embroidered Tote Bag",
        desc: "Cotton tote with floral embroidery, stitched by hand over several evenings.",
        price: 1800,
        stock: 5,
        category: "Clothing & Textiles",
        storeId: 2,
        image: null,
        details: "A sturdy cotton tote with a floral design embroidered by hand. Each bag takes several evenings to finish, so small differences between bags are normal.",
        highlights: ["100% cotton", "Hand-embroidered floral design", "Fits books and a laptop", "Each piece is slightly unique"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-30",
    },
    {
        id: 3,
        title: "Glazed Ceramic Mug",
        desc: "Wheel-thrown mug with a speckled blue glaze. Dishwasher safe.",
        price: 1500,
        stock: 8,
        category: "Crafts & Decor",
        storeId: 3,
        image: null,
        details: "A wheel-thrown ceramic mug with a speckled blue glaze. Comfortable handle, holds a full cup of tea or coffee, and is dishwasher safe.",
        highlights: ["Wheel-thrown by hand", "Speckled blue glaze", "Dishwasher safe", "Glazes vary slightly from mug to mug"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-20",
    },
    {
        id: 4,
        title: "Mechanical Keyboard Keycap Set",
        desc: "Custom resin keycaps, cast and sanded in small batches.",
        price: 3500,
        stock: 3,
        category: "Tech & Gadgets",
        storeId: 4,
        image: null,
        details: "A set of custom resin keycaps cast and sanded in small batches. Made for standard mechanical keyboards.",
        highlights: ["Cast in small batches", "Hand-sanded finish", "Fits standard MX-style switches", "Colors may vary slightly between batches"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-25",
    },
    {
        id: 5,
        title: "Brownie Box (6 pieces)",
        desc: "Fudgy brownies baked to order. Ready within 48 hours.",
        price: 900,
        stock: 20,
        category: "Food & Baked Goods",
        storeId: 5,
        image: null,
        details: "Six fudgy brownies baked to order and packed in a box. Orders are ready within 48 hours.",
        highlights: ["6 brownies per box", "Baked to order", "Ready within 48 hours", "Best eaten within 3 days"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-11-01",
    },
    {
        id: 6,
        title: "Dotted Hardcover Notebook",
        desc: "A5 notebook, hand-bound with a linen cover and 120 dotted pages.",
        price: 1100,
        stock: 15,
        category: "Stationery & Prints",
        storeId: 6,
        image: null,
        details: "An A5 notebook, bound by hand with a linen cover. The 120 pages have a dotted grid, good for notes, sketches and planning.",
        highlights: ["A5 size", "120 dotted pages", "Hand-bound linen cover", "Lies flat when open"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-15",
    },
    {
        id: 7,
        title: "Beaded Bracelet Trio",
        desc: "Three stackable bracelets in glass and wooden beads.",
        price: 700,
        stock: 1,
        category: "Jewelry & Accessories",
        storeId: 3,
        image: null,
        details: "Three stackable bracelets made from glass and wooden beads on stretch cord. Sold as a set.",
        highlights: ["Set of 3 bracelets", "Glass and wooden beads", "Stretch cord, one size", "Stackable"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-31",
    },
    {
        id: 8,
        title: "Linocut Print: Badshahi Mosque",
        desc: "Hand-carved linocut, printed on cotton rag paper. A4, signed.",
        price: 2200,
        stock: 6,
        category: "Art & Illustration",
        storeId: 1,
        image: null,
        details: "A linocut print of the Badshahi Mosque. The block was carved by hand and printed on cotton rag paper. A4 size, signed by the artist.",
        highlights: ["A4 size", "Hand-carved linocut block", "Cotton rag paper", "Signed by the artist"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-10",
    },
    {
        id: 9,
        title: "Macramé Wall Hanging",
        desc: "Knotted cotton cord wall piece with a wooden dowel, about 60 cm long.",
        price: 2600,
        stock: 0,
        category: "Crafts & Decor",
        storeId: 2,
        image: null,
        details: "A wall hanging knotted from cotton cord on a wooden dowel, about 60 cm long. Works well above a bed, desk or sofa.",
        highlights: ["About 60 cm long", "Natural cotton cord", "Wooden dowel with hanging loop", "Handmade, so sizes vary slightly"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-22",
    },
    {
        id: 10,
        title: "3D-Printed Phone Stand",
        desc: "Foldable desk stand, printed in PLA. Choose from five colors.",
        price: 800,
        stock: 10,
        category: "Tech & Gadgets",
        storeId: 4,
        image: null,
        details: "A foldable desk stand for phones, printed in PLA. It folds flat to fit in a bag. Choose from five colors.",
        highlights: ["Folds flat", "3D-printed in PLA", "Five colors available", "Fits most phones"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-11-02",
    },
    {
        id: 11,
        title: "Sticker Pack: Debug Duck",
        desc: "Ten waterproof vinyl stickers for laptops and bottles.",
        price: 500,
        stock: 30,
        category: "Stationery & Prints",
        storeId: 6,
        image: null,
        details: "Ten waterproof vinyl stickers with the Debug Duck design. Suitable for laptops, bottles and notebooks.",
        highlights: ["Pack of 10 stickers", "Waterproof vinyl", "Suitable for laptops and bottles", "Easy to peel and place"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-29",
    },
    {
        id: 12,
        title: "Cupcake Dozen",
        desc: "Twelve vanilla and chocolate cupcakes with buttercream frosting.",
        price: 1600,
        stock: 4,
        category: "Food & Baked Goods",
        storeId: 5,
        image: null,
        details: "Twelve cupcakes, a mix of vanilla and chocolate, topped with buttercream frosting. Baked to order.",
        highlights: ["12 cupcakes per box", "Vanilla and chocolate", "Buttercream frosting", "Baked to order"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-10-27",
    },
    {
        id: 13,
        title: "Linocut Starter Set",
        desc: "Everything for your first linocut: blocks, gouges, ink, a roller and a pressing spoon.",
        price: 3200,
        stock: 15,
        category: "Art & Illustration",
        storeId: 7,
        image: null,
        details: "A starter set for your first linocut. It includes two soft-cut printing blocks, five carving gouges, a tube of water-based black ink, a roller and a wooden spoon for pressing. A short written guide is included.",
        highlights: ["Two soft-cut printing blocks", "Five carving gouges", "Water-based ink and roller", "Beginner guide included"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-11-04",
    },
    {
        id: 14,
        title: "Beginner Embroidery Kit",
        desc: "A pre-printed floral pattern, wooden hoop, six thread colors, needles and a stitch guide.",
        price: 2400,
        stock: 20,
        category: "Clothing & Textiles",
        storeId: 7,
        image: null,
        details: "A beginner kit with a pre-printed cotton pattern, a 15 cm wooden hoop, six colors of embroidery thread, needles and a stitch guide card. Pairs with the five-stitch guide in the community section.",
        highlights: ["Pre-printed floral pattern", "15 cm wooden hoop", "Six colors of thread", "Stitch guide included"],
        images: [],   // extra photos: ["/img/a.jpg", ...]
        createdAt: "2026-11-03",
    },
];


// Lookup helpers. When Flask is ready, replace these with fetch() calls
// (e.g. GET /api/products/:id, GET /api/stores/:id, GET /api/stores/:id/products).
export const getProductById = (id) =>
    PRODUCTS.find((p) => p.id === Number(id)) ?? null;

export const getStoreById = (id) =>
    STORES.find((s) => s.id === Number(id)) ?? null;

export const getProductsByStore = (storeId) =>
    PRODUCTS.filter((p) => p.storeId === Number(storeId));
