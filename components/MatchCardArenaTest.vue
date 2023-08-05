<template>
    <div class="w-full h-full rounded-lg flex px-0.5 flex-col sm:flex-row" :class="inputSummoner.win ? 'container_win' : 'container_loss'">
        <div class="flex items-center sm:items-start sm:flex-col justify-between sm:gap-x-0 sm:justify-center border-b sm:border-r sm:w-[7.5rem] px-3 sm:px-5 gap-y-1 py-0.5 sm:py-0" :class="inputSummoner.win ? 'border_win' : 'border_loss'">
            <div class="flex sm:flex-col items-center sm:items-start gap-x-1 sm:gap-x-0">
                <div v-if="inputSummoner.win"><span class="text-[#5e84b1] font-bold text-sm sm:text-base">승리</span></div>
                <div v-else><span class="text-[#b73e3e] font-bold text-sm sm:text-base">패배</span></div>
                <div class="px-1 sm:px-0">
                    <span class="text-gray-600 font-medium text-xs sm:text-sm">{{ playDay }}</span>
                </div>
            </div>
            <div class="flex sm:flex-col gap-x-2 sm:gap-x-0 w-">
                <span class="text-gray-700 font-medium text-xs">{{ gameMode }}</span>
                <span class="text-gray-700 font-medium text-xs">{{ gameDuration_transform }}</span>
            </div>
        </div>
        <div class="w-full flex px-3 sm:px-0 h-full items-center">
            <!-- 챔프, 스펠, 룬, cs, 아이템 -->
            <div class="flex h-full  w-full sm:w-auto">
                <div class="flex sm:flex-row w-full sm:w-auto h-full items-center">
                    <div class="flex sm:flex-col w-full justify-between sm:justify-center gap-1 sm:gap-2 h-full sm:pl-6 items-center sm:items-start sm:w-[17rem] sm:gap-x-0" :class="inputSummoner.win ? 'border_win' : 'border_loss'">
                        <div class="flex sm:gap-x-8">
                            <!-- 챔프, 스펠, 룬 -->
                            <div class="flex gap-x-1 h-full items-center pr-1">
                                <!-- 챔프 -->
                                <div class="w-11 sm:w-[57px] relative">
                                    <img :src="getChampionIconUrl(inputSummoner.championName)" alt="" class="rounded-xl object-fill">
                                    <div class="absolute text-[11px] bg-gray-500 w-4 sm:w-5 h-[1.1rem] items-center font-medium flex justify-center rounded-xl text-white right-0 bottom-0">
                                        {{ inputSummoner.champLevel }}
                                    </div>
                                </div>
                        
                                <!-- augment -->
                                <div class="flex gap-x-[1.5px] sm:gap-x-1">
                                    <div class="flex flex-col h-[3.5rem] gap-y-[1.5px] justify-center sm:justify-start">
                                        <div class="w-[1.3rem] h-[1.3rem] sm:w-7 sm:h-7">
                                            <div v-if="inputSummoner.playerAugment1">
                                                <img :src="getArenaAugmentUrl(inputSummoner.playerAugment1)" alt="" class="rounded-xl object-fill bg-slate-900">
                                            </div>
                                            <div v-else class="w-full h-full">
                                                <div class="w-full h-full rounded-xl" :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                            </div>
                                        </div>
                                        <div class="w-[1.3rem] h-[1.3rem] sm:w-7 sm:h-7">
                                            <div v-if="inputSummoner.playerAugment2">
                                                <img :src="getArenaAugmentUrl(inputSummoner.playerAugment2)" alt="" class="rounded-xl object-fill bg-slate-900">
                                            </div>
                                            <div v-else class="w-full h-full">
                                                <div class="w-full h-full rounded-xl" :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col h-[3.5rem] gap-y-[1.5px] justify-center sm:justify-start"> 
                                        <div class="w-[1.3rem] h-[1.3rem] sm:w-7 sm:h-7">
                                            <div v-if="inputSummoner.playerAugment3">
                                                <img :src="getArenaAugmentUrl(inputSummoner.playerAugment3)" alt="" class="rounded-xl object-fill bg-slate-900">
                                            </div>
                                            <div v-else class="w-full h-full">
                                                <div class="w-full h-full rounded-xl" :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                            </div>
                                        </div>
                                        <div class="w-[1.3rem] h-[1.3rem] sm:w-7 sm:h-7">
                                            <div v-if="inputSummoner.playerAugment4">
                                                <img :src="getArenaAugmentUrl(inputSummoner.playerAugment4)" alt="" class="rounded-xl object-fill bg-slate-900">
                                            </div>
                                            <div v-else class="w-full h-full">
                                                <div class="w-full h-full rounded-xl" :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 킬/어시/데스 -->
                            <div class="w-[5.5rem] sm:w-full flex flex-col justify-center items-center sm:items-start">
                                <div class="text-sm sm:text-base font-medium text-gray-700">
                                    <span>{{ inputSummoner.kills }} / </span>
                                    <span>{{ inputSummoner.deaths }} / </span>
                                    <span>{{ inputSummoner.assists }}</span>
                                </div>
                                <div class="text-xs sm:text-sm text-gray-500 font-light">
                                    {{ inputSummonerKDA }} <span v-if="inputSummonerKDA !== 'PERPECT'">KDA</span>
                                </div>
                                
                                <div v-if="specificKills !== 'none'" class="sm:hidden mt-0.5 text-[11px] leading-[12px]  border border-rose-300 bg-rose-400 py-[0.2rem] px-[0.3rem] rounded-xl text-white">
                                    {{ specificKills }}
                                </div>
                            </div>
                            <div class="w-[3rem] block sm:hidden">
                    
                            </div>
                        </div>
      
                        <!-- 아이템 -->
                        <div class="flex gap-x-[2px]">
                            <div class="flex flex-col sm:flex-row gap-x-[2px] gap-y-[2px] sm:gap-y-0">
                                <div class="flex gap-x-[1px] sm:gap-x-[2px] ">
                                    <div v-for="item in inputSummonerItems.slice(0, 3)">
                                        <div v-if="item === 0" class="w-[1.4rem] h-[1.4rem] sm:w-7 sm:h-7">
                                            <div class="w-full h-full rounded-lg object-fill"  :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                        </div>
                                        <div v-else class="w-[1.4rem] h-[1.4rem] sm:w-7 sm:h-7">
                                            <img :src="getItemIconUrl(item)" class="rounded-lg object-fill">
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-x-[1px] sm:gap-x-[2px]">
                                    <div v-for="item in inputSummonerItems.slice(3, 6)">
                                        <div v-if="item === 0" class="w-[1.4rem] h-[1.4rem] sm:w-7 sm:h-7">
                                            <div class="w-full h-full rounded-lg object-fill"  :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                        </div>
                                        <div v-else class="w-[1.4rem] h-[1.4rem] sm:w-7 sm:h-7">
                                            <img :src="getItemIconUrl(item)" class="rounded-lg object-fill">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div v-if="inputSummonerItems[6] === 0" class="w-[1.4rem] h-[1.4rem] sm:w-7 sm:h-7">
                                    <div class="w-full h-full rounded-lg object-fill"  :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                                </div>
                                <div v-else class="w-[1.4rem] h-[1.4rem] sm:w-7 sm:h-7">
                                    <img :src="getItemIconUrl(inputSummonerItems[6])" class="rounded-lg object-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>

            <div class="w-24 h-full hidden sm:flex  justify-center items-end py-[0.8rem]">
                <div v-if="specificKills !== 'none'" class="text-xs border border-rose-300 bg-rose-400 py-[0.15rem] px-[0.4rem] rounded-xl text-white">
                    {{ specificKills }}
                </div>
            </div>
        
            <!-- 플레이어 -->
            <div class="hidden sm:flex gap-4 w-[17rem] justify-center items-center px-6 border-l h-full" :class="inputSummoner.win ? 'border_win' : 'border_loss'">
                <div class="flex flex-col h-full justify-center gap-y-2.5">
                    <div class="flex flex-col justify-center gap-y-[2px]">
                        <div v-for="summoner in participants.slice(0, 2)" class="summoner_container">
                            <div class="w-[18px]">
                                <img :src="getChampionIconUrl(summoner.championName)" alt="" class="rounded-lg object-fill">
                            </div>
                            <button @click="clickSummonerName(summoner.summonerName)" class="flex w-20">
                                <span class="summoner_name">{{ summoner.summonerName }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center gap-y-[2px]">
                        <div v-for="summoner in participants.slice(2, 4)" class="summoner_container">
                            <div class="w-[18px]">
                                <img :src="getChampionIconUrl(summoner.championName)" alt="" class="rounded-lg object-fill">
                            </div>
                            <button @click="clickSummonerName(summoner.summonerName)" class="flex w-20">
                                <span class="summoner_name">{{ summoner.summonerName }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col h-full justify-center gap-y-2.5">
                    <div class="flex flex-col justify-center gap-y-[2px]">
                        <div v-for="summoner in participants.slice(4, 6)" class="summoner_container">
                            <div class="w-[18px]">
                                <img :src="getChampionIconUrl(summoner.championName)" alt="" class="rounded-lg object-fill">
                            </div>
                            <button @click="clickSummonerName(summoner.summonerName)" class="flex w-20">
                                <span class="summoner_name">{{ summoner.summonerName }}</span>
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-col justify-center gap-y-[2px]">
                        <div v-for="summoner in participants.slice(6, 8)" class="summoner_container">
                            <div class="w-[18px]">
                                <img :src="getChampionIconUrl(summoner.championName)" alt="" class="rounded-lg object-fill">
                            </div>
                            <button @click="clickSummonerName(summoner.summonerName)" class="flex w-20">
                                <span class="summoner_name">{{ summoner.summonerName }}</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useMainStore } from '~/stores/main';
const router = useRouter();
const props = defineProps({
    gameEndTimestamp: {
        type: Number,
        required: true
    },
    queueId: {
        type: Number,
        default: 420,
        required: true
    },
    gameDuration: {
        type: Number,
        // required: true
    },
    participants: {
        type: Object,
        required: true
    },
    puuid: {
        type: String,
        required: true
    }
});

const mainStore = useMainStore();

const findInputSummoner = () => {
    for (const participant of props.participants) {
        if (participant.puuid === props.puuid) {
            return participant;
        }
    }
};

const inputSummoner = ref(findInputSummoner());

const playDay = ref(calculatePlayDay(props.gameEndTimestamp));
const gameDuration_transform = ref(calculateGameDuration(props.gameDuration));
const gameMode = ref(convertIdToGameMode(props.queueId));

const inputSummonerKDA = calculateKDA(inputSummoner.value);

const inputSummonerItems = ref([]);
inputSummonerItems.value = [
    inputSummoner.value.item0, 
    inputSummoner.value.item1, 
    inputSummoner.value.item2, 
    inputSummoner.value.item3, 
    inputSummoner.value.item4, 
    inputSummoner.value.item5, 
    inputSummoner.value.item6
];

const specificKills = ref('none');
const { doubleKills, tripleKills, quadraKills, pentaKills } = inputSummoner.value;
if (pentaKills > 0) {
    specificKills.value = '펜타킬'
}
else if (quadraKills > 0) {
    specificKills.value = '쿼드라킬';
}
else if (tripleKills > 0) {
    specificKills.value = '트리플킬';
}
else if (doubleKills > 0) {
    specificKills.value = '더블킬';
}

function clickSummonerName(summonerName) {
    mainStore.addRecentSearchSummoner(summonerName);
    router.push({ path: `/${summonerName}`});
}

</script>

<style scoped>
.container_win {
    @apply bg-[#93c5fd]/25 border-2 border-[#93c5fd]/40; 
}
.container_loss {
    @apply bg-[#fca5a5]/25 border-2 border-[#fca5a5]/40;
}
.border_win {
    @apply border-[#93c5fd]/40;
}
.border_loss {
    @apply border-[#fca5a5]/40;
}
.blankItem_win {
    @apply bg-[#93c5fd]/60 border border-[#93c5fd]/40;
}
.blankItem_loss {
    @apply bg-[#fca5a5]/60 border border-[#fca5a5]/40;
}
.summoner_container {
    @apply flex items-center gap-x-1;
} 
.summoner_name {
    @apply text-xs font-medium text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis;
}

</style>