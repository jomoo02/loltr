import SummonerModel from "~/server/models/Summoner";

export default defineEventHandler(async (event) => {
    const req = getQuery(event);
    const summonerName = req.summonerName;

    const normalizeName = (summonerName) => {
        const normalizedName = summonerName.replace(/ /g, '').toLowerCase();

        if (normalizedName.length === 2) {
            return normalizedName.split('').join(' ');
        }
        return normalizedName;
    };

    const normalizedName = normalizeName(summonerName);

    try {
        const result = await SummonerModel.findOne({ normalizedName: normalizedName }).lean();
    
        return result;
    } catch (error) {
        console.log(error);
    }
})
