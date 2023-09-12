import MatchModel from  "~/server/models/Match";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const matchIds = body.matchIds;
    const startIndex = body.startIndex;
    const cnt = body.cnt;

    const config = useRuntimeConfig();
    const API_KEY = config.API_KEY;
    const URL_MATCHS = config.URL_MATCHS;

    let matchCnt = 0;
    let idx = startIndex;

    const maxIdx = matchIds.length - 1;
    const matchDTOs = [];
    const newMathcs = [];

    console.log("serverAPI: ", matchIds, startIndex, cnt);
    while (matchCnt < cnt && idx < maxIdx) {
        const matchId = matchIds[idx];
        try {
            const matchDTO = await MatchModel.findOne({ matchId: matchId }).lean();
            if (!matchDTO) {
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
                matchDTOs.push(newMatch);
            }
            else {
                matchDTOs.push(matchDTO);
            }
            matchCnt++;
        } catch (error) {
            console.log(error);
        }
        idx++;
    }
    await MatchModel.insertMany(newMathcs);

    return  {
        matchDTOs: matchDTOs,
        endIndex: idx
    };
})
