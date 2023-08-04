import axios from "axios";

export default defineCachedEventHandler(async (event) => {
    const req = getQuery(event);
    const summonerId = req.summonerId;

    const config = useRuntimeConfig();
    const URL_LEAGUE = config.URL_LEAGUE;
    const API_KEY = config.API_KEY;

    try {
        const result = await axios.get(`${URL_LEAGUE}/${summonerId}?api_key=${API_KEY}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
})