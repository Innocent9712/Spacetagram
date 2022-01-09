import axios from  "axios"

const nasaEndpoint = process.env.NASA_ENDPOINT
const apiKey = process.env.NASA_API_KEY

axios.interceptors.request.use(config => {
    config.params = config.params ? config.params : {}
    const configUrl = config.url
    if (configUrl.includes(nasaEndpoint)) {
        config.params["api_key"] = apiKey
    }
    return config
    },
    err => {
        return Promise.reject(err)
    }

)

export default {
    getNasaData() {
        return axios.get(`${nasaEndpoint}`)
    }
}