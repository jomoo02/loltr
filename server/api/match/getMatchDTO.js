import axios from "axios";
import MatchModel from  "~/server/models/Match";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const matchId = query.matchId;

    const config = useRuntimeConfig();
    const API_KEY = config.API_KEY;
    const URL_MATCHS = config.URL_MATCHS;

    try {
        const findMatch = await MatchModel.findOne({ matchId: matchId }).lean();
    
        if (findMatch) {
            return findMatch;
        }

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

        await newMatch.save();
        
        return newMatch;

    } catch (error) {
        console.log(error);
    }

})



function selectParticipantInfo(participant) {
    const {
        champLevel,
        championId,
        championName,
        summoner1Id,
        summoner2Id,
        summonerId,
        summonerName,
        perks,
        kills,
        assists, 
        deaths,
        totalDamageTaken,
        totalDamageDealtToChampions,
        totalMinionsKilled,
        neutralMinionsKilled,
        goldEarned,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        lane,
        participantId,
        puuid,
        role,
        teamId,
        visionScore,
        visionClearedPings,
        visionWardsBoughtInGame,
        wardsPlaced,
        win
    } = participant;
    
    return { 
        champLevel,
        championId,
        championName,
        summoner1Id,
        summoner2Id,
        summonerId,
        summonerName,
        perks,
        kills,
        assists, 
        deaths,
        totalDamageTaken,
        totalDamageDealtToChampions,
        totalMinionsKilled,
        neutralMinionsKilled,
        goldEarned,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        lane,
        participantId,
        puuid,
        role,
        teamId,
        visionScore,
        visionClearedPings,
        visionWardsBoughtInGame,
        wardsPlaced,
        win
    };
};