<template>
    <div class="container w-full h-[7.3rem] rounded-lg flex px-0.5" :class="inputSummoner.win ? 'container_win' : 'container_loss'">
        <div class="flex flex-col justify-center border-r w-[7.5rem] px-5 gap-y-1" :class="inputSummoner.win ? 'border_win' : 'border_loss'">
            <div class="flex flex-col">
                <div v-if="inputSummoner.win"><span class="text-[#5e84b1] font-bold">승리</span></div>
                <div v-else><span class="text-[#b73e3e] font-bold">패배</span></div>
                <span class="text-gray-600 font-medium text-sm">{{ playDay }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-gray-700 font-medium text-xs">{{ gameMode }}</span>
                <span class="text-gray-700 font-medium text-xs">{{ gameDuration_transform }}</span>
            </div>
        </div>

        <div class="flex flex-col justify-center gap-2 w-[18em] border-r pl-6" :class="inputSummoner.win ? 'border_win' : 'border_loss'">
            <!-- 챔프, 스펠, 룬 -->
            <div class="flex gap-x-8">
                <div class="flex gap-x-1">
                    <!-- 챔프 -->
                    <div class="w-[57px] relative">
                        <img :src="getChampionIconUrl(inputSummoner.championName)" alt="" class="rounded-xl object-fill">
                        <div class="absolute text-[11px] bg-gray-500 w-5 h-[1.1rem] items-center font-medium flex justify-center rounded-xl text-white right-0 bottom-0">
                            {{ inputSummoner.champLevel }}
                        </div>
                    </div>

                    <!-- 스펠, 룬 -->
                    <div class="flex gap-x-1">
                        <!-- 스펠 -->
                        <div class="flex flex-col h-[3.5rem] gap-y-[2px]">
                            <div class=" w-7 h-7">
                                <img :src="getSpellIconUrl(inputSummoner.summoner1Id)" alt="" class="rounded-xl object-fill p-[1px]">
                            </div>
                            <div class="w-7 h-7">
                                <img :src="getSpellIconUrl(inputSummoner.summoner2Id)" alt="" class="rounded-xl object-fill p-[1px]">
                            </div>
                        </div>
                        <!-- 룬 -->
                        <div class="flex flex-col h-[3.5rem] gap-y-[2px]"> 
                            <div class="w-7 h-7 bg-slate-900 rounded-xl">
                                <img :src="getRuneIconUrl(inputSummoner.perks.styles[0].selections[0].perk)" alt="" class="rounded-lg object-fill p-[1px]">  
                            </div>
                            <div class="w-7 h-7 bg-slate-900 rounded-xl">
                                <img :src="getRuneIconUrl(inputSummoner.perks.styles[1].style)" alt="" class="rounded-lg object-fill p-[4px]">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 킬/어시/데스 -->
                <div class="flex flex-col justify-center">
                    <div class="font-medium text-gray-700">
                        <span>{{ inputSummoner.kills }} / </span>
                        <span>{{ inputSummoner.deaths }} / </span>
                        <span>{{ inputSummoner.assists }}</span>
                    </div>
                    <div class="text-sm text-gray-500 font-light">
                        {{ inputSummonerKDA }} <span v-if="inputSummonerKDA !== 'PERPECT'">KDA</span>
                    </div>
                </div>
            </div>
            <!-- 아이템 -->
            <div class="flex gap-x-[2px]">
                <div v-for="item in inputSummonerItems">
                    <div v-if="item === 0" class="w-7 h-7">
                        <div class="w-full h-full rounded-lg object-fill"  :class="inputSummoner.win ? 'blankItem_win' : 'blankItem_loss'" />
                    </div>
                    <div v-else class="w-7">
                        <img :src="getItemIconUrl(item)" class="rounded-lg object-fill">
                    </div>
                </div>
            </div>
        </div>

        <!-- cs -->
        <div class="w-24 h-full border-r flex flex-col items-center gap-y-3.5 px-1" 
        :class="inputSummoner.win ? 'border_win' : 'border_loss', specificKills !== 'none' ? 'py-[1.2rem]': 'justify-center'">
            <div class="flex flex-col items-center justify-center ">
                <span class="text-sm font-medium text-gray-700">cs {{ inputSummoner.totalMinionsKilled + inputSummoner.neutralMinionsKilled  }}</span>
                <span class="text-sm font-medium text-gray-600">({{ calculateCSPerMinute(inputSummoner, gameDuration_transform) }})</span>
            </div>
            <div v-if="specificKills !== 'none'" class="text-xs border border-rose-300 bg-rose-400 py-[0.15rem] px-[0.4rem] rounded-xl text-white">
                {{ specificKills }}
            </div>
        </div>

        <!-- 플레이어 -->
        <div class="flex gap-4 w-[17rem] justify-center items-center px-6">
            <!-- 블루팀 -->
            <div class="flex flex-col h-full justify-center gap-[1.5px]">
                <div v-for="summoner in participants.slice(0, 5)" class="summoner_container">
                    <div class="w-[18px]">
                        <img :src="getChampionIconUrl(summoner.championName)" alt="" class="rounded-lg object-fill">
                    </div>
                    <button @click="clickSummonerName(summoner.summonerName)" class="flex w-20">
                        <span class="summoner_name">{{ summoner.summonerName }}</span>
                    </button>
                    
                </div>
            </div>
            <!-- 레드팀 -->
            <div class="flex flex-col h-full justify-center gap-[1.5px]">
                <div v-for="summoner in participants.slice(5, 10)" class="summoner_container">
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