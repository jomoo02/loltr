import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useTimeStore = defineStore('time', {
    state: () => ({
        times: ['0-3', '3-6', '6-9', '9-12', '12-15', '15-18', '18-21', '21-24'],

        timeChartData: {},
        timeChartOptions: {},
        
    }),
    actions: {
        classifyMatchTime(matchs) {
            const gameEndTime = dayjs(matchs.gameEndTimestamp);
            const h = gameEndTime.get('h');
            let hour = '';
            if (0 <= h && h < 3) {
                hour = '0-3';
            }
            else if (3 <= h && h < 6) {
                hour = '3-6';
            }
            else if (6 <= h && h < 9) {
                hour = '6-9';
            }
            else if (9 <= h && h < 12) {
                hour = '9-12';
            }
            else if (12 <= h && h < 15) {
                hour = '12-15';
            }
            else if (15 <= h && h < 18) {
                hour = '15-18';
            }
            else if (18 <= h && h < 21) {
                hour = '18-21';
            }
            else if (21 <= h && h < 24) {
                hour = '21-24';
            }
            return hour;
        },
        setTimeRecord(timeRecord) {
            const wins = [];
            const losses = [];
            const winRates = [];

            for (const time of this.times) {
                const { win, loss } = timeRecord[time];
                const winRate = Math.round(win / (win + loss) * 100);
                isNaN(winRate) ? winRates.push(0) : winRates.push(winRate);
                wins.push(win);
                losses.push(loss);
            }
            this.setTimeChartData(wins, losses);
        },
        setTimeChartData(wins, losses) {
            this.timeChartData = null;
            this.timeChartData = {
                labels: this.times.map(v => v + '시'),
                datasets: [
                    { label: '승', data: wins, backgroundColor: '#93c5fd', borderColor: '#60a5fa', borderWidth: 2, borderSkipped: false },
                    { label: '패', data: losses, backgroundColor: '#fca5a5', borderColor: '#f87171', borderWidth: 2, borderSkipped: false }
                ]
            };
            
            let MAX = 0;
            for (let i = 0; i < 8; i++) {
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

            this.timeChartOptions = {
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: '시간 별 승률'
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