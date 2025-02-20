export class HttpRequestBuilder {
    private headers: HeadersInit

    /**
     * Adds a header to the HTTP request
     * @param key The key that will hold te value. If the key already exists it will add the value with the others.
     * @param value The value of the header.
     */
    setHeader(headers: HeadersInit): HttpRequestBuilder {
        this.headers = headers
        return this
    }

    /**
     * Generic request handler to reduce redundancy
     * @param url Request URL
     * @param method HTTP method (GET, POST, PUT, DELETE)
     * @param body Optional request body
     */
    private async request<R = unknown, T = unknown>(url: string, method: string, body?: T | FormData | Record<string, unknown>): Promise<R> {
        const isFormData = body instanceof FormData
        const headers = isFormData ? this.headers : { ...this.headers, 'Content-Type': 'application/json' }

        const response = await fetch(url, {
            method,
            headers: {
                Accept: 'application/json',
                ...headers
            },
            body: isFormData ? body : body ? JSON.stringify(body) : null
        })

        if (!response.ok) {
            const error: {
                message: string
                errors: any[]
            } = await response.json()

            throw error
        }

        return response.json() as Promise<R>
    }

    /**
     * Build and fetch GET with the current options
     * @return unhandled the Promise<Response> of the fetch
     */
    async get<R = unknown>(url: string, params?: Record<string, any>): Promise<R> {
        if (params) {
            const queryString = new URLSearchParams(params).toString()
            url += `?${queryString}`
        }

        return this.request<R, undefined>(url, 'GET')
    }

    /**
     * Send data with a POST request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async post<R = unknown, T = unknown>(url: string, data: T | FormData): Promise<R> {
        return this.request<R, T>(url, 'POST', data)
    }

    /**
     * Send data with a PUT request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async put<R = unknown, T = unknown>(url: string, data: T | FormData): Promise<R> {
        return this.request<R, T>(url, 'PUT', data)
    }

    /**
     * Send data with a PUT request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async delete(url: string): Promise<Response> {
        return this.request<undefined, undefined>(url, 'DELETE')
    }
}

export const HttpRequest = new HttpRequestBuilder()
