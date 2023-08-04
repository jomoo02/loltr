export default function(summonerInfo) {
    if (summonerInfo.deaths === 0) return 'PERPECT';

    return ((summonerInfo.kills + summonerInfo.assists) / summonerInfo.deaths).toFixed(2);
}