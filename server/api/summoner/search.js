import SummonerModel from "~/server/models/Summoner";

export default defineEventHandler(async (event) => {
    const req = getQuery(event);
    const summonerName = req.summonerName;

    try {
        const result = await SummonerModel.findOne({ name: summonerName }).lean();
    
        return result;
    } catch (error) {
        console.log(error);
    }
})
