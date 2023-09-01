import { defineStore } from 'pinia';

export const usePlayStore = defineStore('play', {
    state: () => ({
        playItem: {}, // { cnt, win, loss }
        playChampion: {}, // 'name' :{ cnt, win, loss, kills, deaths, assists }
        playShoes: {}, // { cnt, win, loss }
        playItemArray: [],
        playChampionArray: [],
        playShoesArray: []
    }),
    actions: {
        setData(summonerDTO) {
            const itemList = new Set(
                [summonerDTO.item0, summonerDTO.item1, summonerDTO.item2, summonerDTO.item3, summonerDTO.item4, summonerDTO.item5, summonerDTO.item6]
            );

            const { championName, win, kills, deaths, assists } = summonerDTO;

            const unnecessaryItems = [0, 2052];
            const accessories = [3340, 3363, 3364, 3348]; // 장신구 (시야 관련)
            
            const filterItem = item => ![...unnecessaryItems, ...accessories].includes(item);

            [...itemList].filter(item => filterItem(item)).forEach(item => {
                this.addMostItemAndShoes(item, win);
            });

            this.addMostChampion(championName, { win, kills, deaths, assists });

            this.playItemArray = this.convertPlayDataArray(this.playItem);
            this.playChampionArray = this.convertPlayDataArray(this.playChampion);
            this.playShoesArray = this.convertPlayDataArray(this.playShoes);
            
        },
        addMostChampion(champion, { win, kills, deaths, assists }) {
            if (champion in this.playChampion) {
                this.playChampion[champion].cnt += 1;
                this.playChampion[champion].kills += kills;
                this.playChampion[champion].deaths += deaths;
                this.playChampion[champion].assists += assists;
            }
            else {
                this.playChampion[champion] = {
                    kills,
                    deaths,
                    assists,
                    win: 0,
                    loss: 0,
                    cnt: 1
                };
            }
            win ? this.playChampion[champion].win += 1 : this.playChampion[champion].loss += 1;
        },
        addMostItemAndShoes(item, win) {
            const shoesList = [1001, 3158, 3006, 3009, 3020, 3047, 3111, 3117];
    
            const ornnItem = [7000, 7001, 7002, 7005, 7006, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016, 7017, 7018, 7019, 7020, 7021, 7023, 7024, 7025, 7026, 7027, 7028, 7029, 7030, 7031, 7032, 7033]
            const ornnItemFrom = [6693, 6692, 6691, 6662, 6671, 4633, 4636, 3152, 6653, 6655, 6656, 6630, 6631, 6632, 3078, 3190, 2065, 6617, 3001, 4644, 3084, 6665, 6667, 6657, 3142, 3124, 3031, 6675, 6620]
            const update = (obj, item) => {
                if (item * 1 in obj) {
                    obj[item].cnt += 1;
                }
                else {
                    obj[item] = {
                        cnt: 1,
                        win: 0,
                        loss: 0
                    }
                }
                win ? obj[item].win += 1 : obj[item].loss += 1
            };
            if (item > 10000) {
                item = item.toString().slice(2) * 1;
            }
            // check ornn item
            const checkOrnnItemIdx = ornnItem.indexOf(item * 1);
            if (checkOrnnItemIdx !== -1) {
                item = ornnItemFrom[checkOrnnItemIdx];
            }
            
            if (shoesList.includes(item)) {
                if (item !== 1001) { // 기본 신발 제외
                    update(this.playShoes, item);
                }
            }
            else {
                update(this.playItem, item);
            }
        },

        convertPlayDataArray(playObj) {
            return Object.entries(playObj).sort((a, b) => {
                if (b[1].cnt !== a[1].cnt) {
                    return b[1].cnt - a[1].cnt;
                }
                else {
                    return b[1].win - a[1].win;
                }
            });
        }
    }
});