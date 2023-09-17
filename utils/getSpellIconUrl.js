export default function(key) {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.URL_BASE_CDN;
    const dic = {
        '1': 'SummonerBoost.png',
        '3': 'SummonerExhaust.png',
        '4': 'SummonerFlash.png',
        '6': 'SummonerHaste.png',
        '7': 'SummonerHeal.png',
        '11': 'SummonerSmite.png',
        '12': 'SummonerTeleport.png',
        '13': 'SummonerMana.png',
        '14': 'SummonerDot.png',
        '21': 'SummonerBarrier.png',
        '30': 'SummonerPoroRecall.png',
        '31': 'SummonerPoroThrow.png',
        '32': 'SummonerSnowball.png',
        '39': 'SummonerSnowURFSnowball_Mark.png',
        '54': 'Summoner_UltBookPlaceholder.png',
        '55': 'Summoner_UltBookSmitePlaceholder.png',
        '2201': 'SummonerCherryHold.png',
        '2202': 'SummonerCherryFlash.png'
    };

    return `${baseUrl}/img/spell/${dic[key]}`;
}
