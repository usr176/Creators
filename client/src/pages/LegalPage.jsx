// Shared layout for Terms, Privacy and Guidelines.
// sections: [{ heading, paragraphs?: string[], items?: string[] }]

export default function LegalPage({ title, intro, updated, sections }) {
    return (
        <div className="mx-auto min-h-screen max-w-3xl py-10">

            <header className="mb-10 border-b pb-6">
                <h1 className="text-4xl font-extralight font-heading">{title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>
                {intro && (
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {intro}
                    </p>
                )}
            </header>

            <div className="flex flex-col gap-8">
                {sections.map((s) => (
                    <section key={s.heading}>
                        <h2 className="mb-2 text-xl font-medium">{s.heading}</h2>

                        {(s.paragraphs ?? []).map((p) => (
                            <p key={p} className="mb-3 text-sm leading-relaxed text-muted-foreground">
                                {p}
                            </p>
                        ))}

                        {s.items && (
                            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                                {s.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
}
