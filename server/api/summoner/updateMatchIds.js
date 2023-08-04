import SummonerModel from "../../models/Summoner";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    // const matchIds = body.matchIds;
    const newMatchIds = body.newMatchIds;
    const puuid = body.puuid;
    const position = 0;
    const curTimestamp = new Date().getTime();

    try {
        const updatedSummoner = await SummonerModel.findOneAndUpdate(
            { puuid:  puuid },
            { $push: { matchList: { $each: newMatchIds, $position: position } }, $set: { updateTimestamp: curTimestamp } },
            { new: true }
        );
        return updatedSummoner;
    }
    catch (error) {
        console.log(error);
    }
})