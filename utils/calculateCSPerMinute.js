export default function(summonerInfo, gameDurationString) {
    const timeArr = gameDurationString.split(' ');
    const m = timeArr[0].slice(0, timeArr[0].length - 1) * 1;
    const s = timeArr[1].slice(0, timeArr[1].length - 1) * 1;
    const sumTime = m + (s / 60).toFixed(1) * 1; 

    return (((summonerInfo.totalMinionsKilled + summonerInfo.neutralMinionsKilled) / sumTime ).toFixed(1));
}