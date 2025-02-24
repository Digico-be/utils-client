export const useAuth = () => {
    if (typeof globalThis !== 'undefined' && globalThis.__DIGICO_USE_AUTH__) {
        return globalThis.__DIGICO_USE_AUTH__
    }
    throw new Error("useAuthContext n'est pas défini. Assurez-vous d'avoir importé `initAuth.ts` dans votre projet.")
}
