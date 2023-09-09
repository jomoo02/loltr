export default function(championName) {
    if (championName === 'FiddleSticks') {
        championName = 'Fiddlesticks';
    } 
    return `https://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${championName}.png`
}