import mongoose from "mongoose";

const summonerSchema = new mongoose.Schema({
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    normalizedName: { type: String, required: true, trim: true },
    profileIconId: { type: Number, required: true, trim: true },
    puuid: { type: String, required: true, trim: true },
    summonerLevel: { type: Number, required: true, trim: true },
    matchList: { type: Array, required: true },
    updateTimestamp: { type: Number, required: true }
});

const SummonerModel = mongoose.model('summoner', summonerSchema);

export default SummonerModel;