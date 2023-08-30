<template>
    <div
        class="w-full h-10 xs:h-11 flex justify-between gap-x-1 xl:gap-x-0 px-[2px] xs:px-2 sm:px-5 lg:px-6 xl:px-2 py-1 xs:py-2"
        :class="{ 'bg-slate-400/25': redo, 'bg-win/20': win, 'bg-slate-400/40': redo && puuid === participant.puuid, 'bg-loss/20': loss, 'bg-win/40': win && puuid === participant.puuid, 'bg-loss/40': loss && puuid === participant.puuid, 'rounded-b-md': team === '레드팀' && index === 4 }"
    >
        <div class="flex flex-col md:flex-row justify-center md:justify-between sm:items-center">
            <!-- 챔피언, 스펠 룬, 소환사 이름 -->
            <div class="sm:w-[15rem] lg:w-[13.5rem] flex items-center gap-x-1 xs:gap-x-1.5 sm:gap-x-2 lg:gap-x-2.5">
                <div class="flex items-center gap-x-px lg:gap-x-[2px]">
                    <!-- 챔피언 -->
                    <div class="w-7 h-7 xs:w-[2rem] xs:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem] flex relative">
                        <img :src="getChampionIconUrl(participant.championName)" alt="champion" class="rounded-lg">
                        <span class="absolute bottom-0 right-0 text-xxxs lg:text-xxs text-white bg-gray-500 font-light xs:font-medium rounded-xl px-px py-px">{{ participant.champLevel }}</span>
                    </div>
                    <!-- 스펠, 룬 -->
                    <div class="flex xs:gap-x-px items-center">
                        <div class="flex flex-col gap-y-px">
                            <img :src="getSpellIconUrl(participant.summoner1Id)" alt="spell1" class="img_spell p-px">
                            <img :src="getSpellIconUrl(participant.summoner2Id)" alt="spell2" class="img_spell p-px">
                        </div>
                        <div class="flex flex-col gap-y-px"> 
                            <div class="bg-slate-900 rounded-lg">
                                <img :src="getRuneIconUrl(participant.perks.styles[0].selections[0].perk)" alt="rune1" class="img_spell p-px">  
                            </div>
                            <div class="bg-slate-900 rounded-lg">
                                <img :src="getRuneIconUrl(participant.perks.styles[1].style)" alt="rune2" class="img_spell p-[4px]">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- summonerName -->
                <div class="w-[6rem] xs:w-[8rem] h-full flex flex-col justify-center sm:justify-start text-xxxs xs:text-xs gap-y-[1.5px]">
                    <div class="truncate lg:font-medium text-slate-800">
                        <span class="cursor-pointer" @click="clickParticipant(participant.summonerName)">
                            {{ participant.summonerName }}
                        </span>
                    </div>
                    <div class="flex lg:hidden gap-x-1 xs:gap-x-2">
                        <div class="text-xxxs xs:text-xs font-light lg:font-medium text-gray-700">
                            {{ participant.kills }}/{{ participant.deaths }}/{{ participant.assists }}
                        </div>
                        <div class="flex items-end text-xxxs xs:text-xxs font-extralight lg:font-light text-gray-500">
                            {{ participantKDA }}
                            <span v-if="participantKDA !== 'PERPECT'">:1</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- kda lg -->
            <div class="lg:w-[6rem] xl:w-[5.25rem] h-full hidden lg:flex flex-col justify-center items-center">
                <div class="flex text-xxs xs:text-xs lg:text-xs font-medium text-gray-700 gap-x-[1.5px]">
                    <span>{{ participant.kills }}</span>/<span>{{ participant.deaths }}</span>/<span>{{ participant.assists }}</span> 
                </div>
                <div class="text-xxxs xs:text-xxs lg:text-xxs font-light text-gray-500 flex">
                    {{ participantKDA }} <span v-if="participantKDA !== 'PERPECT'">:1</span>
                </div>
            </div>
        </div>
        <div class="w-[6.3rem] xs:w-[9rem] sm:w-[25rem] md:w-[25.5rem] lg:w-auto flex flex-col-reverse sm:flex-row justify-center sm:justify-between gap-y-1 xs:gap-y-1 sm:gap-y-0">
            <!-- 피해량-->
            <div class="sm:w-[8.4rem] xl:w-[8.8rem] flex  gap-x-2.5 lg:px-4 text-xxxs leading-[10px] lg:text-xxs">
                <div class="relative flex items-center lg:flex-col lg:gap-y-[3px] lg:justify-center">
                    <div class="absolute w-full flex justify-center lg:static items-center">{{ participant.totalDamageDealtToChampions }}</div>
                    <BarOne 
                        :barWidth="calculateRatio(participant.totalDamageDealtToChampions, maxDamage)"
                        :barColor1="'#f87171'" 
                        :barColor2="'#fff'"
                        :height="'7'"
                        :smallSizeHeight="'12'"
                    />
                </div>
                <div class="relative flex items-center lg:flex-col lg:gap-y-[3px] lg:justify-center">
                    <div class="absolute w-full flex justify-center lg:static">{{ participant.totalDamageTaken }}</div>
                        <BarOne 
                        :barWidth="calculateRatio(participant.totalDamageTaken, maxDamageTaken)"
                        :barColor1="'#9ca3af'" 
                        :barColor2="'#fff'"
                        :height="'7'"
                        :smallSizeHeight="'12'"
                    />
                </div>
            </div>
            <!-- 와드 -->
            <div class="w-[3.3rem] h-full hidden lg:flex flex-col justify-center items-center text-xxs">
                <span>{{ participant.visionWardsBoughtInGame }}</span>
                <span>
                    {{ participant.wardsPlaced }} / {{ participant.wardsKilled }}
                </span>
            </div>
            <!-- cs -->
            <div class="w-[5.05rem] h-full hidden lg:flex justify-center">
                <div class="flex flex-col justify-center items-center lg:text-xxs font-medium">
                    <span class="text-gray-700">cs {{ participant.totalMinionsKilled + participant.neutralMinionsKilled  }}</span>
                    <span class="text-gray-600">분당 {{ calculateCSPerMinute(participant, gameDuration) }}</span>
                </div>
            </div>
            <!-- 아이템 -->
            <div class="md:h-full flex items-center gap-x-px xs:gap-x-[2px] md:gap-x-[2px] lg:w-[11.25rem]">
                <div v-for="item in participantItems">
                    <div v-if="item === 0" class="img_item border" 
                        :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                    />
                    <img v-else :src="getItemIconUrl(item)" alt="item" class="img_item">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    gameInfoDTO: {
        type: Object,
        default: {
            team: '블루팀',
            gameDuration: '24분 12초',
            gameResult: '승리'
        }
    },
    puuid: {
        type: String
    },
    participant: {
        type: Object,
        required: true
    },
    maxDamageDTO: {
        type: Object,
        default: {
            maxDamage: 1000,
            maxDamageTaken: 1000
        }
    },
    index: {
        type: Number
    }
});

const router = useRouter();

const { team, gameDuration, gameResult } = props.gameInfoDTO;
const participantKDA = calculateKDA(props.participant);
const participantItems = [props.participant.item0, props.participant.item1, props.participant.item2, props.participant.item3, props.participant.item4, props.participant.item5, props.participant.item6];

const win = ref(false);
const loss = ref(false);
const redo = ref(false);

const { maxDamage, maxDamageTaken } = props.maxDamageDTO;

setGameResult(gameResult);

function calculateRatio(participantDamage, maxDamage) {
    if (participantDamage === 0) {
        return '0%';
    }
    return Math.floor(participantDamage / maxDamage * 100).toString() + '%';
}

function setGameResult(gameResult) {
    if (gameResult === '다시하기') {
        redo.value = true;
    }
    else if (gameResult === '승리') {
        win.value = true;
    }
    else {
        loss.value = true;
    }
}

function clickParticipant(participant) {
    router.push({ path: `/${participant}`});
}

</script>


<style scoped>
.img_spell {
    @apply w-[0.9rem] h-[0.9rem] xs:w-[1rem] xs:h-[1rem] md:w-[1.1rem] md:h-[1.1rem] rounded-md;
}
.img_item {
    @apply w-[0.9rem] h-[0.9rem] xs:w-[1.1rem] xs:h-[1.1rem] sm:w-[1.4rem] sm:h-[1.4rem] md:w-[1.5rem] md:h-[1.5rem] rounded-sm xs:rounded-md;
}
</style>