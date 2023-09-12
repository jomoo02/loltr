import MatchModel from  "~/server/models/Match";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const matchIds = body.matchIds;
    const startIndex = body.startIndex;
    const targetCnt = body.targetCnt;

    const config = useRuntimeConfig();
    const API_KEY = config.API_KEY;
    const URL_MATCHS = config.URL_MATCHS;

    let matchCnt = 0;
    let curIndex = startIndex;

    const MAXINDEX = matchIds.length;
    const matchDTOs = [];
    const newMathcs = [];

    while (matchCnt < targetCnt && curIndex < MAXINDEX) {
        const matchId = matchIds[curIndex++];
        try {
            const matchDTO = await MatchModel.findOne({ matchId: matchId }).lean();
            if (!matchDTO) {
                const result = await axios.get(`${URL_MATCHS}/${matchId}?api_key=${API_KEY}`);
                const { info } = result.data;
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
    }
    await MatchModel.insertMany(newMathcs);

    return  {
        matchDTOs,
        endIndex: curIndex
    };
})
