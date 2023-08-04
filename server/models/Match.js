import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    // metadata
    matchId: { type: String, required: true },
    // info
    gameDuration: { type: Number, required: true },
    gameEndTimestamp: { type: Number, required: true },
    queueId: { type: Number, required: true },
    participants: { type: Array, required: true },
    

});

const MatchModel = mongoose.model('match', matchSchema);

export default MatchModel;