export default function(summonerInfo) {
    if (summonerInfo.deaths === 0) {
        if (summonerInfo.kills === 0 && summonerInfo.assists === 0) {
            return '0.00';
        }
        return 'PERPECT';
    }
    return ((summonerInfo.kills + summonerInfo.assists) / summonerInfo.deaths).toFixed(2);
}