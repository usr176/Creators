// Community articles. Written by selected creators (storeId of their store)
// and by the official KraftHub account (storeId 7).
//
// Shape mirrors what a Flask endpoint (e.g. GET /api/articles) could return.
// body is a list of blocks:
//   { type: "p" | "h2" | "quote", text }
//   { type: "ul" | "ol", items: [...] }
// products: ids of products featured in the article (shown at the bottom).
// cover: image URL, or null for a placeholder.

const RAW_ARTICLES = [
    {
        slug: "photograph-your-handmade-work",
        title: "How to photograph your handmade work with just a phone",
        excerpt:
            "Good photos are the difference between a listing people scroll past and one they open. You do not need a camera to get them.",
        topic: "Seller guide",
        storeId: 7,
        date: "2026-11-04",
        cover: null,
        products: [],
        body: [
            { type: "p", text: "Most of the best-selling listings on KraftHub share one thing: the photos are clear, bright and honest. You do not need a camera or a studio. A phone, a window and a little patience are enough." },
            { type: "h2", text: "Start with the light" },
            { type: "p", text: "Soft natural light from a window is the most flattering light there is. Place your piece next to a window during the day and keep direct midday sun off it, since harsh shadows hide detail. Turn off the ceiling lights, which tint photos yellow." },
            { type: "h2", text: "Keep the background simple" },
            { type: "p", text: "A sheet of white paper, a wooden table or a plain piece of cloth works well. The aim is for the eye to land on your work, not on the clutter behind it." },
            { type: "h2", text: "Take more than one photo" },
            { type: "ol", items: [
                "A clear, front-on shot of the whole piece.",
                "A close-up of the detail you are proudest of.",
                "Something that shows size, such as the item in a hand or next to a coin.",
                "One shot of it in use, if that makes sense for your product.",
            ] },
            { type: "quote", text: "A buyer cannot touch your work, so your photos have to do the touching for them." },
            { type: "h2", text: "Be honest" },
            { type: "p", text: "Handmade pieces vary. If the color looks different on screen, or the finish is slightly uneven, say so in the description. Buyers on campus will see your work in person, and honest listings lead to happy hand-overs and good word of mouth." },
        ],
    },
    {
        slug: "your-first-linocut",
        title: "Your first linocut: a beginner’s guide",
        excerpt:
            "Linocut is one of the friendliest ways into printmaking. Here is the whole process, from a blank block to your first print.",
        topic: "Printmaking",
        storeId: 7,
        date: "2026-11-03",
        cover: null,
        products: [13],
        body: [
            { type: "p", text: "Linocut is carving a design into a soft block, rolling ink over what is left, and pressing paper onto it. The result is a bold, graphic print, and you can make many copies from one block. It is also forgiving enough for a first attempt." },
            { type: "h2", text: "What you need" },
            { type: "ul", items: [
                "A soft rubber or linoleum block.",
                "A set of carving gouges.",
                "Water-based printing ink and a roller.",
                "A flat spoon, or a baren, for pressing.",
                "Paper that is not too thin.",
            ] },
            { type: "h2", text: "The process" },
            { type: "ol", items: [
                "Draw your design on paper, then transfer it onto the block. The print is a mirror image, so any lettering must be drawn in reverse.",
                "Carve away everything you want to stay white. Always cut away from your hand, and keep your other hand behind the tool.",
                "Roll a thin, even layer of ink over the block.",
                "Lay the paper on top and press firmly with the spoon, working across the whole surface.",
                "Peel the paper back slowly and let the print dry flat.",
            ] },
            { type: "quote", text: "Your first prints will not be perfect, and that is part of the fun." },
            { type: "p", text: "Look at what the first print shows you. Patches of ink where you wanted white mean more carving is needed. Patchy ink means the roller needs another pass. If you would like everything in one box, the Linocut Starter Set below has the blocks, tools and ink." },
        ],
    },
    {
        slug: "sketch-to-print-linocut",
        title: "From sketch to print: how I carve a linocut",
        excerpt:
            "A look at how one of my campus prints goes from a pencil sketch to a finished piece on the wall.",
        topic: "Printmaking",
        storeId: 1,
        date: "2026-10-29",
        cover: null,
        products: [8],
        body: [
            { type: "p", text: "Every print starts as a rough pencil sketch of a place I walk past every day. The sketch is never the final design. Its job is to help me decide what matters in the scene." },
            { type: "h2", text: "Simplify into shapes" },
            { type: "p", text: "Linocut cannot do soft shading, so I turn the sketch into a few strong shapes: light, dark and one or two in between. Squinting at the drawing helps. Whatever disappears when you squint is usually safe to leave out." },
            { type: "h2", text: "Carve in the right order" },
            { type: "p", text: "I carve the outlines first with a fine tool, then clear the larger white areas with a wide one. Working in this order keeps the edges crisp and stops me from slipping into a line I meant to keep." },
            { type: "h2", text: "Test, then adjust" },
            { type: "p", text: "I pull a test print on cheap paper before anything else. It always shows me something I missed, such as a stray ridge catching ink or a line that looks too heavy. A few more careful cuts, and then I print the edition on good paper." },
            { type: "quote", text: "The block is only half the artwork. The other half is what you decide to cut away." },
            { type: "p", text: "Each finished print is signed and numbered by hand, which is the part I enjoy most." },
        ],
    },
    {
        slug: "five-stitches-embroidery",
        title: "Five stitches that will get you through almost any embroidery project",
        excerpt:
            "You do not need to learn dozens of stitches. These five cover lines, fills, curves and tiny details.",
        topic: "Embroidery",
        storeId: 2,
        date: "2026-10-24",
        cover: null,
        products: [14, 2],
        body: [
            { type: "p", text: "When I started embroidering, I thought I had to memorize an entire stitch dictionary. I did not. Most of my pieces use the same five stitches in different combinations." },
            { type: "ol", items: [
                "Running stitch: the simplest line. In and out along a path. Use it for outlines and for a dashed, sketched look.",
                "Back stitch: a solid, continuous line. Each stitch goes back to meet the last one. Use it for lettering and outlines.",
                "Satin stitch: smooth, close stitches side by side that fill a shape. Take your time and keep the stitches parallel.",
                "Stem stitch: a rope-like line that curves gracefully. Perfect for flower stems and flowing outlines.",
                "French knot: a small raised dot. Use it for flower centers and texture.",
            ] },
            { type: "h2", text: "A few habits that help" },
            { type: "ul", items: [
                "Keep the fabric drum-tight in the hoop, and re-tighten as you go.",
                "Use shorter lengths of thread, so it does not tangle or fray.",
                "Do not pull stitches too hard. Fabric should lie flat, not pucker.",
            ] },
            { type: "p", text: "Once these five feel natural, everything else is a variation. A beginner kit, like the one below, has all the supplies in one place." },
        ],
    },
    {
        slug: "after-the-wheel",
        title: "What happens to a mug after it leaves the wheel",
        excerpt:
            "Throwing a mug takes minutes. Turning it into something you can drink from takes weeks. Here is where the time goes.",
        topic: "Pottery",
        storeId: 3,
        date: "2026-10-18",
        cover: null,
        products: [3],
        body: [
            { type: "p", text: "People love watching clay spin on a wheel, but that is only the first step. Most of the work happens after the mug comes off the wheel." },
            { type: "h2", text: "Drying and trimming" },
            { type: "p", text: "The mug rests until it is leather-hard: firm enough to hold its shape but still soft enough to carve. At that point I trim the base and attach the handle. Rushing this stage is how cracks happen later." },
            { type: "h2", text: "The first firing" },
            { type: "p", text: "After drying completely, the mug goes into the kiln for its first firing, called the bisque. This turns soft clay into a hard, porous ceramic that is ready to take glaze." },
            { type: "h2", text: "Glazing" },
            { type: "p", text: "Glaze is a coating of ground minerals suspended in water. Before firing it looks chalky and dull, nothing like the final color. I dip the mug, wipe the base clean, and trust the kiln." },
            { type: "quote", text: "Glaze is the one part of pottery where you never know exactly what you will get." },
            { type: "h2", text: "The second firing" },
            { type: "p", text: "In the final firing the glaze melts into glass and bonds to the clay. When the kiln cools and the door opens, that is the moment I enjoy most. Each mug comes out a little different, which is why no two of mine are exactly alike." },
        ],
    },
    {
        slug: "phone-stand-no-supports",
        title: "Designing a phone stand that prints without supports",
        excerpt:
            "Supports waste plastic and leave rough surfaces. A few design choices let you skip them entirely.",
        topic: "3D printing",
        storeId: 4,
        date: "2026-10-12",
        cover: null,
        products: [10],
        body: [
            { type: "p", text: "Supports are temporary structures a 3D printer builds under overhanging parts. They work, but they waste material and leave rough marks where they were removed. When I designed my foldable phone stand, I wanted it to print clean the first time." },
            { type: "h2", text: "Design around the overhang limit" },
            { type: "p", text: "Most printers can handle surfaces angled up to about 45 degrees from vertical without support. Anything flatter than that sags. I kept every angled surface of the stand inside this limit." },
            { type: "h2", text: "Choose the print orientation first" },
            { type: "p", text: "Before finalizing a design, I decide how the part will lie on the print bed. A flat face on the bed gives a strong base and avoids overhangs. Designing with the orientation in mind saves hours of trial and error." },
            { type: "h2", text: "Leave room for moving parts" },
            { type: "p", text: "The stand folds, so the hinge needs a small gap, around 0.3 mm in my case, so the parts do not fuse together while printing. The right gap depends on your printer, so print a small test hinge before committing to the full part." },
            { type: "quote", text: "A small test print costs minutes. A failed full print costs an evening." },
        ],
    },
    {
        slug: "hand-bound-notebook",
        title: "Hand-binding a notebook with a needle and thread",
        excerpt:
            "A bound notebook needs paper, thread and an hour. Here is the simple stitch I use for every one I make.",
        topic: "Stationery",
        storeId: 6,
        date: "2026-10-05",
        cover: null,
        products: [6],
        body: [
            { type: "p", text: "Hand-bound books look complicated, but the basic method is surprisingly simple. A notebook is just folded sheets of paper, sewn together along the fold, and attached to a cover." },
            { type: "h2", text: "Make the pages" },
            { type: "p", text: "Fold sheets of paper in half and nest several inside each other. This bundle is called a signature. A thin notebook can be a single signature, while a thicker one uses several." },
            { type: "h2", text: "Sew the spine" },
            { type: "ol", items: [
                "Mark evenly spaced holes along the fold, then pierce them with an awl or a pin.",
                "Thread a needle with waxed thread. Waxing stops it from tangling.",
                "Start inside the fold, and sew in and out through each hole along the spine.",
                "Come back along the spine through the holes you skipped, then tie off with a tight knot.",
            ] },
            { type: "h2", text: "Add the cover" },
            { type: "p", text: "I use a thicker paper or card for the cover, folded around the pages and attached with glue along the spine. Pressing the book under a heavy weight for an hour helps it set flat." },
            { type: "quote", text: "The first notebook you bind will be uneven. You will still use it every day." },
        ],
    },
    {
        slug: "fudgy-brownies",
        title: "Why my brownies are fudgy: the three things that matter",
        excerpt:
            "Cakey or fudgy comes down to a few simple choices. Here is what I do differently.",
        topic: "Baking",
        storeId: 5,
        date: "2026-09-28",
        cover: null,
        products: [5],
        body: [
            { type: "p", text: "People ask me for the recipe more often than anything else. The truth is that most of what makes a brownie fudgy is technique rather than a secret ingredient." },
            { type: "h2", text: "More fat, less flour" },
            { type: "p", text: "Fudgy brownies lean on butter and chocolate, with only a little flour. More flour gives you a cake. Measure it carefully, and go lightly." },
            { type: "h2", text: "Do not overmix" },
            { type: "p", text: "Once the flour goes in, stir only until it disappears. Mixing further builds structure that makes the brownie bready instead of dense and rich." },
            { type: "h2", text: "Underbake slightly, then wait" },
            { type: "p", text: "A brownie keeps cooking in the tray after it leaves the oven. I take mine out when the center still looks slightly soft. Then comes the hardest part: letting them cool completely before cutting. Cut too early and the middle will not set." },
            { type: "quote", text: "Patience is the secret ingredient. It is also the one that is hardest to measure." },
        ],
    },
];

export const ARTICLES = [...RAW_ARTICLES].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
);

export const TOPICS = [...new Set(ARTICLES.map((a) => a.topic))];


/* ---------- Helpers (replace with fetch() once the API exists) ---------- */

export const getArticleBySlug = (slug) =>
    ARTICLES.find((a) => a.slug === slug) ?? null;

// Name shown on the byline: the creator for student stores, "KraftHub" for the official account
export const getAuthorName = (store) =>
    store.official ? store.name : store.owner;


export const formatArticleDate = (iso) =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
