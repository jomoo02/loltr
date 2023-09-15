<template>
    <div class="w-full h-full flex flex-col rounded-lg">
        <div class="w-full h-[5.5rem] xs:h-[6.5rem] md:h-[8.5rem] lg:h-[7.3rem] rounded-lg flex flex-col lg:flex-row" 
            :class="{ 'bg-slate-400/25':redo, 'bg-win/25': win, 'bg-loss/25': loss }"
        >
            <!-- 게임 모드 -->
            <div class="w-auto lg:w-[8rem] xl:w-[8.4rem] flex lg:flex-col items-center lg:items-start justify-between lg:justify-center lg:gap-x-0 gap-y-1 border-b lg:border-b-0 lg:border-r pl-1 xs:pl-3 sm:pl-5 xl:pl-[1rem] xl:pr-[0.4rem] lg:py-0" 
                :class="{'border-slate-400/40': redo, 'border-win/30': win, 'border-loss/30': loss }"
            >
                <div class="flex lg:flex-col items-center lg:items-start gap-x-1 lg:gap-x-0">
                    <div class="font-bold text-xs xs:text-sm lg:text-base" :class="{'text-slate-500': redo, 'text-wintext': win, 'text-losstext': loss }">
                        {{ gameResult }}
                    </div>
                    <div class="flex px-1 lg:px-0 text-gray-600 font-medium text-xxs xs:text-xs lg:text-sm">
                        {{ playDay }}
                    </div>
                </div>
                <div class="flex gap-x-2 sm:gap-x-4 lg:gap-x-0 text-gray-700 font-medium text-xxs xs:text-xs items-center">
                    <div class="flex lg:flex-col gap-x-2">
                        <span>{{ gameMode }}</span>
                        <span>{{ gameDuration_transform }}</span>
                    </div>
                    <button @click="clickDetail" class="w-6 rounded-tr-lg items-center justify-center flex lg:hidden"
                        :class="{ 'bg-slate-400/25':redo, 'bg-win/40': win, 'bg-win/80': win && checkDetail, 'bg-loss/40': loss, 'bg-loss/80': loss && checkDetail }"
                    >
                        <div :class="checkDetail ? 'hidden' : 'block'">
                            <Icon name="material-symbols:keyboard-arrow-down-rounded" size="1.6rem" color="rgb(100 116 139)" />
                        </div> 
                        <div :class="checkDetail ? 'block' : 'hidden'">
                            <Icon name="material-symbols:keyboard-arrow-up-rounded" size="1.6rem" color="rgb(100 116 139)" />
                        </div>
                    </button>
                </div>
            </div>
            <!-- 챔피언, 스펠, 룬, 아이템, 킬뎃, cs, 팀 -->
            <div class="w-full h-full flex items-center px-0.5 lg:px-0 justify-between lg:justify-between">
                <!-- (챔프, 스펠, 룬, 킬뎃), cs(under md size), 아이템-->
                <div class="w-full md:w-auto h-full flex md:flex-col justify-between md:justify-evenly xs:px-1.5 sm:px-4 lg:pl-5">
                    <!-- 챔피언, 스펠룬, 킬뎃 -->
                    <div class="md:w-[15.5rem] flex lg:justify-between gap-x-1.5 md:gap-x-4">
                        <div class="h-full lg:h-auto flex items-center gap-x-0.5 xs:gap-x-1">
                            <!-- 챔피언 -->
                            <div class="relative w-[2.2rem] xs:w-11 md:w-[3rem] lg:w-[3.5rem]">
                                <img :src="getChampionIconUrl(inputSummoner.championName)" alt="playchampion" class="rounded-xl object-fill">
                                <div class="absolute right-0 bottom-0 w-4 md:w-5 h-[1.1rem] text-xxs flex justify-center items-center text-white bg-gray-500 font-medium rounded-xl">
                                    {{ inputSummoner.champLevel }}
                                </div>  
                            </div>
                            <!-- 스펠, 룬 -->
                            <div class="flex gap-x-px xs:gap-x-[1.5px]">
                                <!-- 스펠 -->
                                <div class="lg:h-[3.6rem] flex flex-col justify-center md:justify-start gap-y-[1.5px]">
                                    <img :src="getSpellIconUrl(inputSummoner.summoner1Id)" alt="spell1" class="img_spell p-px">
                                    <img :src="getSpellIconUrl(inputSummoner.summoner2Id)" alt="spell2" class="img_spell p-px">
                                </div>
                                <!-- 룬 -->
                                <div class="lg:h-[3.6rem] flex flex-col justify-center md:justify-start gap-y-[1.5px]"> 
                                    <div class="bg-slate-900 rounded-xl">
                                        <img :src="getRuneIconUrl(inputSummoner.perks.styles[0].selections[0].perk)" alt="rune1" class="img_spell p-px">  
                                    </div>
                                    <div class="bg-slate-900 rounded-xl">
                                        <img :src="getRuneIconUrl(inputSummoner.perks.styles[1].style)" alt="rune2" class="img_spell p-[4px]">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 킬뎃 -->
                        <div class="xs:w-[5rem] sm:w-[5.5rem] md:w-[6.5rem] lg:w-[7rem] flex flex-col justify-center items-center lg:items-center">
                            <div class="text-xxs xs:text-sm lg:text-base font-medium text-gray-700">
                                {{ inputSummoner.kills }} / {{ inputSummoner.deaths }} / {{ inputSummoner.assists }}
                            </div>
                            <div class="text-xxxs xs:text-xs lg:text-sm font-light text-gray-500 ">
                                {{ inputSummonerKDA }} <span v-if="inputSummonerKDA !== 'PERPECT'">KDA</span>
                            </div>
                            <div v-if="inputSummonerSpecificKills !== 'none'" class=" md:hidden text-xxxs xs:text-xs text-white bg-rose-400 mt-0.5 px-[0.25rem] xs:px-[0.3rem] py-[0.13rem] xs:py-[0.15rem] rounded-xl">
                                {{ inputSummonerSpecificKills }}
                            </div>
                        </div>
                    </div>
                    <!-- cs(under md size) -->
                    <div class="xs:w-[3rem] flex flex-col justify-center gap-y-3 md:hidden">
                        <div class="flex flex-col items-center justify-center text-xxxs xs:text-xs font-medium">
                            <span class="text-gray-700">cs {{ inputSummoner.totalMinionsKilled + inputSummoner.neutralMinionsKilled  }}</span>
                            <span class="text-gray-600">({{ calculateCSPerMinute(inputSummoner, gameDuration_transform) }})</span>
                        </div>
                    </div>
                    <!-- 아이템 -->
                    <div class="flex items-center">
                        <div class="flex gap-x-px xs:gap-x-[2px]">
                            <!-- 장신구 제외한 아이템 -->
                            <div class="flex flex-col md:flex-row gap-x-[2px] gap-y-px xs:gap-y-[2.5px] md:gap-y-0">
                                <div class="flex gap-x-px xs:gap-x-[2px]">
                                    <template v-for="item in inputSummonerItems.slice(0, 3)">
                                        <div v-if="item === 0" class="img_item w-full h-full border" 
                                            :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }"
                                        ></div>
                                        <img v-else :src="getItemIconUrl(item)" class="img_item">
                                    </template>
                                </div>
                                <div class="flex gap-x-px xs:gap-x-[2px]">
                                    <template v-for="item in inputSummonerItems.slice(3, 6)">
                                        <div v-if="item === 0" class="img_item w-full h-full border" 
                                            :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                                        ></div>
                                        <img v-else :src="getItemIconUrl(item)" class="img_item">
                                    </template>
                                </div>
                            </div>
                            <!-- 장신구 -->
                            <div v-if="inputSummonerItems[6] === 0" class="img_item w-full h-full"  
                                :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                            />
                            <img v-else :src="getItemIconUrl(inputSummonerItems[6])" class="img_item">
                        </div>
                    </div>
                </div>
                <!-- cs(up md size)  -->
                <div class="w-24 lg:w-24 h-full hidden md:flex md:justify-center lg:px-1 lg:border-x" 
                    :class="{ 'border-slate-400/30': redo, 'border-win/30': win, 'border-loss/30': loss }"
                >
                    <div class="flex flex-col items-center gap-y-2.5"  :class="inputSummonerSpecificKills !== 'none' ? 'py-[0.8rem] justify-end': 'justify-center'">
                        <div class="flex flex-col justify-center items-center text-xs lg:text-sm font-medium">
                            <span class="text-gray-700">cs {{ inputSummoner.totalMinionsKilled + inputSummoner.neutralMinionsKilled  }}</span>
                            <span class="text-gray-600">({{ calculateCSPerMinute(inputSummoner, gameDuration_transform) }})</span>
                        </div>
                        <div v-if="inputSummonerSpecificKills !== 'none'" class="text-xxs lg:text-xs bg-rose-400 px-[0.25rem] lg:px-[0.4rem] py-[0.1rem] lg:py-[0.15rem] rounded-xl text-white">
                            {{ inputSummonerSpecificKills }}
                        </div>
                    </div>
                </div>
                <!-- 플레이어 -->
                <div class="lg:w-[17.5rem] xl:w-[15.5rem] h-full hidden md:flex justify-center lg:justify-around xl:justify-center items-center gap-4 px-3 xl:px-2">
                    <!-- 블루팀 -->
                    <div class="h-full flex flex-col justify-center gap-[1.5px]">
                        <div v-for="summoner in participants.slice(0, 5)" class="flex items-center gap-x-1">
                            <img :src="getChampionIconUrl(summoner.championName)" alt="blueteamplayer" class="w-4 lg:w-[1.15rem] rounded-lg">
                            <div class="w-20 flex">
                                <span class="text_summoner-name" @click="clickSummonerName(summoner.summonerName)" >{{ summoner.summonerName }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 레드팀 -->
                    <div class="h-full flex flex-col justify-center gap-[1.5px]">
                        <div v-for="summoner in participants.slice(5, 10)" class="flex items-center gap-x-1">
                            <img :src="getChampionIconUrl(summoner.championName)" alt="redteamplayer" class="w-4 lg:w-[1.15rem] rounded-lg">
                            <div class="w-20 flex">
                                <span class="text_summoner-name" @click="clickSummonerName(summoner.summonerName)">{{ summoner.summonerName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="clickDetail" class="w-6 h-full rounded-r-lg items-end justify-center hidden lg:flex"
                :class="{ 'bg-slate-400/25':redo, 'bg-win/40 hover:bg-win/80': win, 'bg-loss/40 hover:bg-loss/80': loss, 'bg-win/80': win && checkDetail, 'bg-loss/80': loss && checkDetail }"
            >
                <div :class="checkDetail ? 'hidden' : 'block'">
                    <Icon name="material-symbols:keyboard-arrow-down-rounded" size="1.6rem" color="rgb(100 116 139)" />
                </div> 
                <div :class="checkDetail ? 'block' : 'hidden'">
                    <Icon name="material-symbols:keyboard-arrow-up-rounded" size="1.6rem" color="rgb(100 116 139)" />
                </div>
            </button>
        </div>
        <div :class="checkDetail ? 'block' : 'hidden'">
            <MatchCardDetail 
                :puuid="puuid"
                :game-duration="gameDuration_transform"
                :blue-team-dto="blueTeamDTO"
                :red-team-dto="redTeamDTO"
                :max-damage-dto="maxDamageDTO"
                :check-redo="gameResult === '다시하기' ? true : false"
            />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    matchDto: {
        type: Object
    },
    puuid: {
        type: String,
        required: true
    },
});

const router = useRouter();

const { gameDuration, teams, participants, gameEndTimestamp, queueId } = props.matchDto;
const puuid = props.puuid;

const checkDetail = ref(false);

const playDay = ref(calculatePlayDay(gameEndTimestamp));
const gameDuration_transform = ref(calculateGameDuration(gameDuration));
const gameMode = ref(convertIdToGameMode(queueId));

const redo = ref(false);
const win = ref(false);
const loss = ref(false);

const inputSummonerSpecificKills = ref();
const inputSummonerKDA = ref();
const inputSummonerItems = ref();

const gameResult = ref();

const maxDamageDTO = ref();

const inputSummoner = ref();

const blueTeamDTO = ref();
const redTeamDTO = ref();

setInitialData(participants, gameDuration, puuid, teams);

function setInitialData(participants, gameDuration, puuid, teams) {
    const teamsObjectives = teams.map(v => v.objectives);
    let maxDamage = 0;
    let maxDamageTaken = 0;
    let inputSummonerWin = false;

    const updateMaxDamage = (totalDamageDealtToChampions) => maxDamage = Math.max(maxDamage, totalDamageDealtToChampions);

    const updateMaxDamageTaken = (totalDamageTaken) => maxDamageTaken = Math.max(maxDamageTaken, totalDamageTaken);

    const addTotal = (total) => (totalMap, addSome) => totalMap.set(total, totalMap.get(total) + addSome);
    
    const addTotalKills = addTotal('totalKills');
    const addTotalGoldEarned = addTotal('totalGoldEarend');

    const findInputSummoner = (participant, setInputSummonerData) => {
        if (puuid === participant.puuid) {
            setInputSummonerData(participant); 
            inputSummonerWin = participant.win;
        }
    };

    const teamDTOs = [participants.slice(0, 5), participants.slice(5, 10)].reduce((acc, curTeam, idx) => {
        const objectives = teamsObjectives[idx];
        const totalMap = new Map([['totalGoldEarend', 0], ['totalKills', 0]]);
        
        curTeam.forEach(participant => {
            const { goldEarned, kills, totalDamageDealtToChampions, totalDamageTaken } = participant;

            addTotalGoldEarned(totalMap, goldEarned);
            addTotalKills(totalMap, kills);
            
            updateMaxDamage(totalDamageDealtToChampions);
            updateMaxDamageTaken(totalDamageTaken);
    
            findInputSummoner(participant, setInputSummonerData);
        });

        const teamDTO = {
            totalGoldEarned: totalMap.get('totalGoldEarend'), 
            totalKills: totalMap.get('totalKills'),
            objectives,
            participants: curTeam,
        };
        return [...acc, teamDTO];
    }, []);
    
    [blueTeamDTO.value, redTeamDTO.value] = teamDTOs;
    maxDamageDTO.value = { maxDamage, maxDamageTaken };
    setGameResult(inputSummonerWin, gameDuration);
}

function setInputSummonerData(participant) {
    inputSummonerKDA.value = calculateKDA(participant);;
    inputSummonerItems.value = [participant.item0, participant.item1, participant.item2, participant.item3, participant.item4, participant.item5, participant.item6];
    inputSummonerSpecificKills.value = findSpecificKill(participant);
    inputSummoner.value = participant;
}

function findSpecificKill({ doubleKills, tripleKills, quadraKills, pentaKills }) {
    if (pentaKills > 0) {
        return '펜타킬';
    }
    else if (quadraKills > 0) {
        return '쿼드라킬';
    }
    else if (tripleKills > 0) {
        return '트리플킬';
    }
    else if (doubleKills > 0) {
        return '더블킬';
    }
    return 'none';
}

function setGameResult(inputSummonerWin, gameDuration) {
    if (gameDuration <= 180) {
        redo.value = true;
        gameResult.value = '다시하기';
    }
    else {
        if (inputSummonerWin) {
            win.value = true;
            gameResult.value = '승리';
        }
        else {
            loss.value = true;
            gameResult.value = '패배';
        }
    }
}

function clickSummonerName(summonerName) {
    router.push({ path: `/${summonerName}`});
}

function clickDetail() {
    checkDetail.value = !checkDetail.value;
}

</script>

<style scoped>
.img_spell {
    @apply w-[1.1rem] h-[1.1rem] xs:w-[1.3rem] xs:h-[1.3rem] md:w-[1.5rem] md:h-[1.5rem] lg:w-7 lg:h-7 rounded-lg;
}
.text_summoner-name {
    @apply text-xs font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer;
}
.img_item {
    @apply w-[1.1rem] h-[1.1rem]  xs:w-[1.4rem] xs:h-[1.4rem] md:w-[1.6rem] md:h-[1.6rem] lg:w-7 lg:h-7 rounded-md md:rounded-lg; 
}

</style>