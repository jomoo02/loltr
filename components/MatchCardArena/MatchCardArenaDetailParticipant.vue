<template>
    <div 
        class="w-full h-10 xs:h-11 md:h-11 flex justify-between gap-x-1 xl:gap-x-0 px-[2px] xs:px-2 sm:px-5 lg:px-6 xl:px-2 py-1 xs:py-2"
        :class="{ 'bg-slate-400/25': redo, 'bg-win/20': win, 'bg-loss/20': loss, 'bg-win/40': win && participant.puuid === puuid, 'bg-loss/40': loss && participant.puuid === puuid, 'last:rounded-b-md': placement === '4th'}"
    >
        <div class="flex flex-col md:flex-row justify-center md:justify-between sm:items-center">
            <div class="sm:w-[15rem] lg:w-[13.5rem] flex items-center gap-x-1 xs:gap-x-1.5 sm:gap-x-2 lg:gap-x-2.5">
                <div class="flex items-center gap-x-px lg:gap-x-[2px]">
                    <!-- 챔피언 -->
                    <div class="flex relative w-7 h-7 xs:w-[2rem] xs:h-[2rem] lg:w-[2.25rem] lg:h-[2.25rem]">
                        <img :src="getChampionIconUrl(participant.championName)" alt="champion" class="rounded-lg">
                        <span class="absolute bottom-0 right-0 text-xxxs lg:text-xxs text-white bg-gray-500 font-light xs:font-medium rounded-xl px-px py-px">{{ participant.champLevel }}</span>
                    </div>
                    <!-- augment -->
                    <div class="flex gap-x-px items-center">
                        <div class="flex flex-col gap-y-px">
                            <img v-if="participant.playerAugment1" :src="getArenaAugmentUrl(participant.playerAugment1)" alt="augment1" class="img_augment bg-slate-900">
                            <div v-else class="img_augment" 
                                :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                            />
                            <img v-if="participant.playerAugment2" :src="getArenaAugmentUrl(participant.playerAugment2)" alt="augment1" class="img_augment bg-slate-900">
                            <div v-else class="img_augment" 
                                :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                            />
                        </div>
                        <div class="flex flex-col gap-y-px"> 
                            <img v-if="participant.playerAugment3" :src="getArenaAugmentUrl(participant.playerAugment3)" alt="augment1" class="img_augment bg-slate-900">
                            <div v-else class="img_augment" 
                                :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                            />                          
                            <img v-if="participant.playerAugment4" :src="getArenaAugmentUrl(participant.playerAugment4)" alt="augment1" class="img_augment bg-slate-900">
                            <div v-else class="img_augment" 
                                :class="{ 'bg-win/50 border-win/40': win, 'bg-loss/50 border-loss/40': loss, 'bg-slate-400/50 border-slate-400/40': redo }" 
                            />
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
            <div class="w-[6rem] xl:w-[5.25rem] h-full hidden lg:flex flex-col justify-center items-center">
                <div class="text-xxs xs:text-xs lg:text-xs font-medium text-gray-700 flex gap-x-[1.5px]">
                    <span>{{ participant.kills }}</span>/<span>{{ participant.deaths }}</span>/<span>{{ participant.assists }}</span> 
                </div>
                <div class="text-xxxs xs:text-xxs lg:text-xxs font-light text-gray-500 flex">
                    {{ participantKDA }} <span v-if="participantKDA !== 'PERPECT'">:1</span>
                </div>
            </div>
        </div>
        <!-- 피해량, 골드, 아이템 -->
        <div class=" w-[6.3rem] xs:w-[9rem] sm:w-[25rem] md:w-[25.5rem] lg:w-auto flex flex-col-reverse sm:flex-row justify-center sm:justify-between gap-y-1 xs:gap-y-1 sm:gap-y-0">
            <!-- 피해량-->
            <div class="sm:w-[8.4rem] xl:w-[8.8rem] flex gap-x-2.5 lg:px-4 text-xxxs leading-[10px] lg:text-xxs">
                <div class="relative flex items-center lg:flex-col lg:gap-y-[3px] lg:justify-center ">
                    <div class="absolute w-full flex justify-center lg:static items-center">{{ participant.totalDamageDealtToChampions }}</div>
                    <BarOne 
                        :bar-width="calculateRatio(participant.totalDamageDealtToChampions, maxDamage)"
                        :barColor1="'#f87171'" 
                        :barColor2="'#fff'"
                        :height="'7'"
                        :small-size-height="'12'"
                    />
                </div>
                <div class="flex items-center lg:flex-col lg:gap-y-[3px] lg:justify-center relative">
                    <div class="absolute w-full flex justify-center lg:static">{{ participant.totalDamageTaken }}</div>
                    <BarOne 
                        :bar-width="calculateRatio(participant.totalDamageTaken, maxDamageTaken)"
                        :barColor1="'#9ca3af'" 
                        :barColor2="'#fff'"
                        :height="'7'"
                        :small-size-height="'12'"
                    />
                </div>
            </div>
            <!-- 골드 -->
            <div class="w-[8.35rem] h-full hidden lg:flex flex-col justify-center items-center text-xxs">
                {{ participant.goldEarned }}
            </div>
            <!-- 아이템 -->
            <div class="md:h-full lg:w-[11.25rem] flex items-center gap-x-px xs:gap-x-[2px] md:gap-x-[2px]">
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
    placement: {
        type: String
    },
    puuid: {
        type: String
    },
    checkWin: {
        type: Boolean
    },
    checkRedo: {
        type: Boolean
    },
    participant: {
        type: Object
    },
    maxDamageDto: {
        type: Object
    }
})
const participantKDA = calculateKDA(props.participant);
const participantItems = [props.participant.item0, props.participant.item1, props.participant.item2, props.participant.item3, props.participant.item4, props.participant.item5, props.participant.item6];

const { maxDamage, maxDamageTaken } = props.maxDamageDto;

const win = ref(false);
const loss = ref(false);
const redo = ref(false);

const router = useRouter();

setGameResult(props.checkRedo, props.checkWin);

function setGameResult(checkRedo, checkWin) {
    if (checkRedo) {
        redo.value = true;
    }
    else {
        if (checkWin) {
            win.value = true;
        }
        else {
            loss.value = true;
        }
    }
}

function calculateRatio(participantDamage, maxDamage) {
    if (participantDamage === 0) {
        return '0%';
    }
    return Math.floor(participantDamage / maxDamage * 100).toString() + '%'
}

function clickParticipant(participant) {
    router.push({ path: `/${participant}`});
}

</script>

<style scoped>
.img_augment {
    @apply w-[0.9rem] h-[0.9rem] xs:w-[1rem] xs:h-[1rem] md:w-[1.1rem] md:h-[1.1rem] rounded-lg;
}
.img_item {
    @apply w-[0.9rem] h-[0.9rem] xs:w-[1.1rem] xs:h-[1.1rem] sm:w-[1.4rem] sm:h-[1.4rem] md:w-[1.5rem] md:h-[1.5rem] rounded-sm xs:rounded-md;
}
</style>