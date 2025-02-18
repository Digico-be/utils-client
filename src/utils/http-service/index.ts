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
    private async request<T>(url: string, method: string, body?: T | FormData | Record<string, unknown>): Promise<T> {
        const isFormData = body instanceof FormData

        const response = await fetch(url, {
            method,
            headers: isFormData ? this.headers : { ...this.headers, 'Content-Type': 'application/json' },
            body: isFormData ? body : JSON.stringify(body)
        })

        if (!response.ok) {
            throw await response.json()
        }

        return response.json() as Promise<T>
    }

    /**
     * Build and fetch GET with the current options
     * @return unhandled the Promise<Response> of the fetch
     */
    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        if (params) {
            const queryString = new URLSearchParams(params).toString()
            url += `?${queryString}`
        }

        return this.request<T>(url, 'GET')
    }

    /**
     * Send data with a POST request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async post<T>(url: string, data: T | FormData): Promise<T> {
        return this.request<T>(url, 'POST', data)
    }

    /**
     * Send data with a PUT request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async put<T>(url: string, data: T | FormData): Promise<T> {
        return this.request<T>(url, 'PUT', data)
    }

    /**
     * Send data with a PUT request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async delete<T>(url: string, data: T | FormData): Promise<T> {
        return this.request<T>(url, 'DELETE', data)
    }
}
