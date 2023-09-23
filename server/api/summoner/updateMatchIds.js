import SummonerModel from "../../models/Summoner";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    // const matchIds = body.matchIds;
    const newMatchIds = body.newMatchIds;
    const puuid = body.puuid;
    const curTimestamp = new Date().getTime();

    try {
        const summoner = await SummonerModel.findOne({ puuid }).lean();
        const matchList = [...new Set([...newMatchIds, ...summoner.matchList])];

        const updatedSummoner = await SummonerModel.findOneAndUpdate(
            { puuid:  puuid },
            { $set: { updateTimestamp: curTimestamp, matchList: matchList } },
            { new: true }
        ).lean();
        return updatedSummoner;
    }
    catch (error) {
        console.log(error);
    }
})