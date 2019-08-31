
const API_KEY = "58OcTlBlb6wwZcuVIyutkk0C0Tt5wJUR"
const BASE_URL = "https://api.giphy.com/v1/gifs/search"
const LIMIT = 25


function getRequestUrl(offset = 0, query = "") {
    return `${BASE_URL}?api_key=${API_KEY}&q=${query}&limit=${LIMIT}&offset=${offset}&rating=G&lang=en`;
}

export class GiphyService {

    static async getGifs(offset, query) {
        return fetch(getRequestUrl(offset, query),
            {
                method: `get`,
            })
    };
}