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
    private async request(url: string, method: string, body?: BodyInit): Promise<Response> {
        const response = await fetch(url, {
            method,
            headers: this.headers,
            body: body ?? null,
        });

        if (!response.ok) {
            throw await response.json();
        }

        return response.json();
    }

    /**
     * Build and fetch GET with the current options
     * @return unhandled the Promise<Response> of the fetch
     */
    async get(url: string, params?: Record<string, any>): Promise<Response>{

        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        return this.request(url, 'GET');
    }

     /**
     * Send data with a POST request
     * @param url Request URL
     * @param data FormData to be sent
     */
     async post(url: string, data: FormData): Promise<Response>{
        return this.request(url, 'POST', data);
    }
    
    /**
     * Send data with a PUT request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async put(url: string, data: FormData): Promise<Response>{
        return this.request(url, 'PUT', data);
    }

    /**
     * Send data with a PUT request
     * @param url Request URL
     * @param data FormData to be sent
     */
    async delete(url: string, data: FormData): Promise<Response>{
        return this.request(url, 'DELETE', data);
    }
}