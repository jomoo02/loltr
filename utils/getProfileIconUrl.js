export default function(iconId) {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.URL_BASE_CDN;
    return `${baseUrl}/img/profileicon/${iconId}.png`;
}