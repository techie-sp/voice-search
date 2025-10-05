export interface ParsedQuery {
    brand?: string;
    color?: string;
    category?: string;
    price?: { operator: "<" | ">" | "="; value: number };
    keywords?: string[];
}

/**
 * Parses natural speech into structured query parameters.
 */
export const parseVoiceQuery = (text: string): ParsedQuery => {
    const query = text.toLowerCase().trim();

    const result: ParsedQuery = {};

    // 1️⃣ Detect price patterns
    const priceMatch = query.match(/(under|below|less than|over|above|more than|under rupees|below rupees|under rs)?\s?(\d+(?:,\d+)?)/);
    if (priceMatch) {
        const operator =
            /under|below|less than/.test(priceMatch[1] || "") ? "<" :
                /over|above|more than/.test(priceMatch[1] || "") ? ">" : "=";

        result.price = {
            operator,
            value: parseInt(priceMatch[2].replace(/,/g, ""), 10),
        };
    }

    // 2️⃣ Known color list
    const colors = ["black", "white", "red", "blue", "green", "yellow", "gray", "pink", "brown", "orange", "purple"];
    const foundColor = colors.find((c) => query.includes(c));
    if (foundColor) result.color = foundColor;

    // 3️⃣ Known categories
    const categories = [
        'beauty',
        'fragrances',
        'furniture',
        'groceries',
        'home',
        'decoration',
        'kitchen',
        'accessories',
        'laptops',
        'mens',
        'shirts',
        'shoes',
        'watches',
        'mobile',
        'motorcycle',
        'skin',
        'care',
        'smartphones',
        'sports',
        'sunglasses',
        'tablets',
        'tops',
        'vehicle',
        'womens',
        'bags',
        'dresses',
        'jewellery',
    ];
    const foundCategory = categories.find((c) => query.includes(c));
    if (foundCategory) result.category = foundCategory;

    // 4️⃣ Brand extraction (simplified)
    // You could load brand list dynamically from your product API
    const brands = ["nike", "adidas", "apple", "samsung", "puma", "reebok", "titan", "hp", "dell"];
    const foundBrand = brands.find((b) => query.includes(b));
    if (foundBrand) result.brand = foundBrand;

    // 5️⃣ Extract remaining keywords for fallback
    const stopWords = ["show", "me", "find", "under", "below", "above", "more", "than", "rupees", "rs"];
    const words = query.split(/\s+/).filter((w) => !stopWords.includes(w));
    result.keywords = words;

    return result;
};
