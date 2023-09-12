import axios from "axios";

export default defineEventHandler(async (event) => {
    const req = getQuery(event);
    const puuid = req.puuid;
    const mostRecentMatchId = req.mostRecentMatchId;
    const config = useRuntimeConfig();
    const URL_MATCHS_PUUID = config.URL_MATCHS_PUUID;
    const API_KEY = config.API_KEY;

    const count = 1;
    let start = 0;

    const newMatchIds = [];
    while (true) {
        if (start > 100) break;

        try {
            const result = await axios.get(`${URL_MATCHS_PUUID}/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`);

            if (result.data[0] === mostRecentMatchId) break;
            
            newMatchIds.push(result.data[0]);
        } catch (error) {
            console.log(error);
        }
        start++;
    }
    return newMatchIds;
});