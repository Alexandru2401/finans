const brands = ["Forbes", "TechCrunch", "MarketWatch", "Yahoo Finance", "Product Hunt"];

export default function HomeBrands() {
    return <section className="w-full border-y border-border bg-background px-6 py-10">
        <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Trusted by thousands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                {brands.map((b) => (
                    <span key={b} className="text-lg font-semibold text-muted-foreground/60">
                        {b}
                    </span>
                ))}
            </div>
        </div>
    </section>
}