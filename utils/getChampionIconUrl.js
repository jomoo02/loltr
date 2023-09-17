export default function(championName) {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.URL_BASE_CDN;

    if (championName === 'FiddleSticks') {
        championName = 'Fiddlesticks';
    } 
    return `${baseUrl}/img/champion/${championName}.png`
}