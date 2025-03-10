/**
 * Formate un nombre flottant en une chaîne monétaire avec le symbole €.
 *
 * @param value - Le nombre à formater.
 * @param locale - La locale pour le formatage (par défaut "fr-FR").
 * @param currency - La devise à afficher (par défaut "EUR").
 * @returns Une chaîne formatée comme "12,24€".
 */
export function formatCurrency(value: number, locale: string = 'fr-FR', currency: string = 'EUR'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}

export function getPricingDetails(
    subtotal: number = 0,
    vat: number = 21
): {
    subtotal: number
    tax: number
    total: number
} {
    const tax = subtotal * (vat / 100)
    const total = subtotal + tax

    return {
        subtotal,
        tax,
        total
    }
}

export function formatStructuredCommunication(value?: string): string {
    if (!value) {
        return ''
    }

    if (value.length !== 12) {
        return value
    }

    return `+++${value.replace(/(\d{3})(\d{4})(\d{5})/, '$1/$2/$3')}+++`
}

export function formatIBAN(iban?: string) {
    if (!iban) {
        return ''
    }

    const cleanedIban = iban.replace(/\s+/g, '')

    return cleanedIban
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .toUpperCase()
}
