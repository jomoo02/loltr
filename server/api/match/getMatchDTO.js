import MatchModel from  "~/server/models/Match";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const matchIds = query.matchIds;

    try {
        const matchDTOs = [];
        for (const matchId of matchIds) {
            const matchDTO = await MatchModel.findOne({ matchId: matchId }).lean();
            matchDTOs.push(matchDTO);
        }
        return matchDTOs;

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