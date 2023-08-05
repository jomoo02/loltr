import { defineStore } from 'pinia';
import { useTimeStore } from '../stores/time';
import { useDayStore } from '../stores/day';
import { usePlayStore } from "../stores/play";
import { useLocalStorage } from '@vueuse/core'

export const useMainStore = defineStore('main', {
    state: () => ({
        loading: false,
        inputSummoner: {},
        winLossRecord: {
            win: 0, loss: 0
        },
        timeRecord: {
            "0-3": { win: 0, loss: 0 },
            "3-6": { win: 0, loss: 0 },
            "6-9": { win: 0, loss: 0 },
            "9-12": { win: 0, loss: 0 },
            "12-15": { win: 0, loss: 0 },
            "15-18": { win: 0, loss: 0 },
            "18-21": { win: 0, loss: 0 },
            "21-24": { win: 0, loss: 0 },
        },
        dayRecord: {
            "Mon": { win: 0, loss: 0 },
            "Tue": { win: 0, loss: 0 },
            "Wed": { win: 0, loss: 0 },
            "Thu": { win: 0, loss: 0 },
            "Fri": { win: 0, loss: 0 },
            "Sat": { win: 0, loss: 0 },
            "Sun": { win: 0, loss: 0 },
        },
        recentSearchSummonerList: useLocalStorage('summoner/recentSearch', [])
    }),

    hydrate(state, initialState) {
        state.recentSearchSummonerList = useLocalStorage('summoner/recentSearch', []);
    },

    actions: {
        setInputSummoner(summoner) {
            this.inputSummoner = summoner;
        },
        recordMatch(matchs) {
            const timeStore = useTimeStore();
            const dayStore = useDayStore();
            const playStore = usePlayStore();

            const summonerPuuid = this.inputSummoner.puuid;
 
            for (const match of matchs) {
                const summonerDTO = match.participants.find(v => v.puuid === summonerPuuid);
                const timeZone = timeStore.classifyMatchTime(match);
                const dayZone = dayStore.classifyMatchDay(match);

                if (summonerDTO.win) {
                    this.timeRecord[timeZone].win += 1;
                    this.dayRecord[dayZone].win += 1;
                    this.winLossRecord.win += 1;
                }
                else {
                    this.timeRecord[timeZone].loss += 1;
                    this.dayRecord[dayZone].loss += 1;
                    this.winLossRecord.loss += 1;
                }
            
                playStore.setData(summonerDTO);
            }
            timeStore.setTimeRecord(this.timeRecord);
            dayStore.setDayRecord(this.dayRecord);
        },
        addRecentSearchSummoner(summonerName) {
            const summonerList = Array.from(new Set([summonerName, ...this.recentSearchSummonerList]));
            if (summonerList.length > 10) {
                useLocalStorage('summoner/recentSearch').value = JSON.stringify(summonerList.slice(0, 10));
            }
            else {
                useLocalStorage('summoner/recentSearch').value = JSON.stringify(summonerList);
            }
        },
        removeRecentSummoner(removeIndex) {
            const summonerList = [...this.recentSearchSummonerList];
            useLocalStorage('summoner/recentSearch').value = JSON.stringify([...summonerList.slice(0, removeIndex), ...summonerList.slice(removeIndex + 1)]);
        }      
    }


})