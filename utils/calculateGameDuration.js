export default function(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const hDisplay = h > 0 ? h + "시간 ": "";
    const mDisplay = m > 0 ? m + "분 ": "";
    const sDisplay = s > 0 ? s + "초": "";
    
    return hDisplay + mDisplay + sDisplay;
}