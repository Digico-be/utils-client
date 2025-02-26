import dayjs from 'dayjs'

import 'dayjs/locale/fr'

export class DateHelper {
    /**
     * Convertit une date en un format spécifique.
     * @param date - La date à formater. Peut être une chaîne, un objet Date ou autre compatible avec Day.js.
     * @param format - Le format cible (par défaut : 'YYYY-MM-DD').
     * @returns La date formatée sous forme de chaîne.
     */
    static format(date: string | Date, format: string = 'DD-MM-YYYY'): string {
        return dayjs(date).locale('fr').format(format)
    }

    /**
     * Convertit une chaîne de date d'un format à un autre.
     * @param date - La chaîne de date source.
     * @param fromFormat - Le format de la date source.
     * @param toFormat - Le format cible (par défaut : 'YYYY-MM-DD').
     * @returns La date convertie sous forme de chaîne.
     */
    static convertFormat(date: string, fromFormat: string, toFormat: string = 'YYYY-MM-DD'): string {
        return dayjs(date, fromFormat).format(toFormat)
    }

    /**
     * Vérifie si une date est valide.
     * @param date - La date à valider.
     * @param format - Format à valider (optionnel).
     * @returns Vrai si la date est valide, sinon faux.
     */
    static isValid(date: string | Date, format?: string): boolean {
        return format ? dayjs(date, format, true).isValid() : dayjs(date).isValid()
    }

    /**
     * Ajoute ou soustrait des jours/mois/années à une date.
     * @param date - La date de base.
     * @param value - La valeur à ajouter ou soustraire (peut être négative).
     * @param unit - L'unité de temps ('day', 'month', 'year', etc.).
     * @returns La nouvelle date sous forme d'objet Day.js.
     */
    static addOrSubtract(date: string | Date, value: number, unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second'): string {
        return dayjs(date).add(value, unit).format('YYYY-MM-DD')
    }

    /**
     * Renvoie la différence entre deux dates.
     * @param date1 - La première date.
     * @param date2 - La deuxième date.
     * @param unit - L'unité de la différence ('day', 'month', 'year', etc.).
     * @returns La différence entre les deux dates dans l'unité spécifiée.
     */
    static difference(date1: string | Date, date2: string | Date, unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second' = 'day'): number {
        return dayjs(date1).diff(dayjs(date2), unit)
    }
}
