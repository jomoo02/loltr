export default function(itemName) {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.URL_BASE_CDN;
    return `${baseUrl}/img/item/${itemName}.png`
}