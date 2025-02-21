export const cookiesNext = async () => {
    const cookies =
        typeof window === 'undefined'
            ? await import('next/headers')
                  .then(({ cookies }) => cookies())
                  .then(({ getAll }) => Object.fromEntries(getAll().map(({ name, value }) => [name, value])))
            : await import('js-cookie').then((cookies) => cookies.get())

    return {
        get: (name: string) => cookies[name]
    }
}
