export default function(timestamp) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1일의 밀리초 수
    const millisecondsPerHour = 60 * 60 * 1000; // 
    const millisecondsPerMinute = 60 * 1000;

    const targetDate = new Date(timestamp);
    const currentDate = new Date();

    const differenceInDays = Math.round(Math.abs(currentDate - targetDate) / millisecondsPerDay);
    const differenceInHour = Math.round(Math.abs(currentDate - targetDate) / millisecondsPerHour);
    const differenceInMinute = Math.round(Math.abs(currentDate - targetDate) / millisecondsPerMinute);
    const difference = Math.abs(currentDate - targetDate);

    if (difference < 60) {
        return `${difference}초 전`;
    }
    if (differenceInMinute < 60) {
        return `${differenceInMinute}분 전`;
    }
    if (differenceInHour < 24) {
        return `${differenceInHour}시간 전`;
    }
    if (differenceInDays < 30) {
        return `${differenceInDays}일 전`;
    }

    const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
    const monthDiff = currentDate.getMonth() - targetDate.getMonth();
    const totalMonthDiff = yearDiff * 12 + monthDiff;
  
    return `${totalMonthDiff}달 전`;
}
