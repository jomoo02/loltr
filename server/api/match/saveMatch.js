import axios from "axios";
import MatchModel from  "~/server/models/Match";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const newMatchIds = typeof query.newMatchIds === 'string'? [query.newMatchIds] : query.newMatchIds;
    
    if (!newMatchIds) {
        return 'newMatch num zero';
    }

    const config = useRuntimeConfig();
    const API_KEY = config.API_KEY;
    const URL_MATCHS = config.URL_MATCHS;

    try {
        const newMathcs = [];
        for (const matchId of newMatchIds) {
            const result = await axios.get(`${URL_MATCHS}/${matchId}?api_key=${API_KEY}`);
            const { metadata, info } = result.data;
            const { gameDuration, gameEndTimestamp, queueId, participants, teams } = info;
            const newMatch = new MatchModel({
                matchId,
                gameDuration,
                gameEndTimestamp,
                queueId,
                participants,
                teams
            });
            newMathcs.push(newMatch);
        }

        const insertedMatches = await MatchModel.insertMany(newMathcs);
        
        return insertedMatches;
    } catch (error) {
        console.log(error);
    }
})
