import MatchModel from  "~/server/models/Match";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const matchIds = query.matchIds;

    const config = useRuntimeConfig();
    const API_KEY = config.API_KEY;
    const URL_MATCHS = config.URL_MATCHS;

    try {
        const matchDTOs = [];
        const newMathcs = [];
        for (const matchId of matchIds) {
            const matchDTO = await MatchModel.findOne({ matchId: matchId }).lean();

            if (!matchDTO) {
                const result = await axios.get(`${URL_MATCHS}/${matchId}?api_key=${API_KEY}`);
                const { metadata, info } = result.data;
                const { gameDuration, gameEndTimestamp, queueId, participants } = info;
                const newMatch = new MatchModel({
                    matchId,
                    gameDuration,
                    gameEndTimestamp,
                    queueId,
                    participants
                });
                newMathcs.push(newMatch);
                matchDTOs.push(newMatch);
            }
            else {
                matchDTOs.push(matchDTO);
            }
        }
        await MatchModel.insertMany(newMathcs);

        return matchDTOs;

    } catch (error) {
        console.log(error);
    }
})
