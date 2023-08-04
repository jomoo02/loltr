import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useDayStore = defineStore('day', {
    state: () => ({
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

        dayChartData: {},
        dayChartOptions: {},
        
    }),
    actions: {
        classifyMatchDay(matchs) {
            const gameEndTime = dayjs(matchs.gameEndTimestamp);
            const d = gameEndTime.get('day');
            let day = '';
 
            if (d === 0) {
                day = 'Sun';
            }
            else if (d === 1) {
                day = 'Mon';
            }
            else if (d === 2) {
                day = 'Tue';
            }
            else if (d === 3) {
                day = 'Wed';
            }
            else if (d === 4) {
                day = 'Thu';
            }
            else if (d === 5) {
                day = 'Fri';
            }
            else if (d === 6) {
                day = 'Sat';
            }
        
            return day;
        },
        setDayRecord(dayRecord) {
            const wins = [];
            const losses = [];
            const winRates = [];

            for (const time of this.days) {
                const { win, loss } = dayRecord[time];
                const winRate = Math.round(win / (win + loss) * 100);
                isNaN(winRate) ? winRates.push(0) : winRates.push(winRate);
                wins.push(win);
                losses.push(loss);
            }
            this.setDayChartData(wins, losses);
        },
        setDayChartData(wins, losses) {
            this.dayChartData = null;
            this.dayChartData = {
                labels: this.days,
                datasets: [
                    { label: '승', data: wins, backgroundColor: '#93c5fd', borderColor: '#60a5fa', borderWidth: 2, borderSkipped: false },
                    { label: '패', data: losses, backgroundColor: '#fca5a5', borderColor: '#f87171', borderWidth: 2, borderSkipped: false }
                ]
            };
            
            let MAX = 0;
            for (let i = 0; i < 7; i++) {
                if (MAX < wins[i]) MAX = wins[i];
                if (MAX < losses[i]) MAX = losses[i];
            }

            if (MAX < 10) {
                MAX = 10;
            }
            else if (MAX < 100) {
                MAX = MAX - (MAX % 10) + 10;
            }
            else if (MAX < 1000) {
                MAX = MAX - (MAX % 100) + 50;
            }

            this.dayChartOptions = {
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: '요일 별 승률'
                  }
                },
                layout: {
                  padding: 15
                },
                responsive: false,
                scales: {
                    y: {
                      min: 0,
                      max: MAX,
                    }
                  }
            };
        },
    }
});