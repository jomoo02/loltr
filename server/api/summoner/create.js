import SummonerModel from "~/server/models/Summoner";
import axios from 'axios';

export default defineEventHandler(async (event) => {
    const req = getQuery(event);
    const summonerName = req.summonerName;

    const config = useRuntimeConfig();
    const URL_SUMMONER = config.URL_SUMMONER;
    const URL_MATCHS_PUUID = config.URL_MATCHS_PUUID;
    const API_KEY = config.API_KEY;

    const start = 0;
    const count = 100;
    const curTimestamp = new Date().getTime();

    const normalizeName = (summonerName) => {
        const normalizedName = summonerName.replace(/ /g, '').toLowerCase();

        if (normalizedName.length === 2) {
            return normalizedName.split('').join(' ');
        }
        return normalizedName;
    };

    const normalizedName = normalizeName(summonerName);

    try {
        const summonerDTO = await axios.get(`${URL_SUMMONER}/${normalizedName}?api_key=${API_KEY}`);
        const { id, name, profileIconId, puuid, summonerLevel } = summonerDTO.data;

 

        const findSummoner = await SummonerModel.findOneAndUpdate(
            { puuid:  puuid },
            { name: name },
            { new: true }
        ).lean();
        
        if (findSummoner) {
            return findSummoner;
        }
        
        const matchIdList = await axios.get(`${URL_MATCHS_PUUID}/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`);
        const newSummoner = new SummonerModel({
            id, 
            name, 
            profileIconId, 
            puuid, 
            summonerLevel, 
            matchList: matchIdList.data,
            updateTimestamp: curTimestamp,
            normalizedName
        });
        
        await newSummoner.save();

        return newSummoner;
    } catch (error) {
        console.log('잘못된 소환사 이름입니다.');
    }
})