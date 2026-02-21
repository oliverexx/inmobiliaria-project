import pluralize from "pluralize";

// ─── Price Formatting ───────────────────────────────────────────
export function formatPrice(
    price: number | string,
    operation: string
): string {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    const isRent = operation === "rent";

    const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: isRent ? "ARS" : "USD",
        maximumFractionDigits: 0,
    }).format(numericPrice);

    return isRent ? `${formatted}/mes` : formatted;
}

// ─── Pluralize Helpers (Spanish) ────────────────────────────────
// Register Spanish rules — pluralize only works well for English,
// so we handle common Spanish cases manually.
const spanishPlurals: Record<string, string> = {
    propiedad: "propiedades",
    habitación: "habitaciones",
    baño: "baños",
    consulta: "consultas",
    resultado: "resultados",
    encontrada: "encontradas",
    encontrado: "encontrados",
};

export function pluralizeEs(word: string, count: number): string {
    if (count === 1) return word;
    return spanishPlurals[word.toLowerCase()] ?? pluralize(word, count);
}

/**
 * "5 propiedades encontradas" / "1 propiedad encontrada"
 */
export function propertyCountText(count: number): string {
    const propWord = pluralizeEs("propiedad", count);
    const foundWord = pluralizeEs("encontrada", count);
    return `${count} ${propWord} ${foundWord}`;
}

// ─── Slug Generation ────────────────────────────────────────────
export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
