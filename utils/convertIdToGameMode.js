export default function(queueId) {
    if (queueId === 420) {
        return '솔랭';
    } 
    if (queueId === 430) {
        return "일반";
    } 
    if (queueId === 440) {
        return '자유 5:5 랭크';
    }
    if (queueId === 450) {
        return '무작위 총력전';
    }
    if (queueId === 1700) {
        return '아레나'
    }
    else {
        return '게임';
    }
}
