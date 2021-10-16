import cnfg from "./config"

export const client = (endpoint, { body, ...customConfig } = {}) => {
    const headers       = { "Content-Type": "application/json" }


    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    return fetch(`${cnfg.apiUrl}/${endpoint}`, config).then(
        async (res) => {
            const data = await res.json()

            if (res.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        }
    )
}