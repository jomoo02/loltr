<template>
    <div class="w-full xl:w-[22rem] h-14 xs:h-16 md:px-10 xl:px-0">
        <div class="w-full h-full flex justify-between px-3 xs:px-7 xl:px-6">
            <div class="w-[6rem] xs:w-[8rem] flex items-center gap-x-1.5 xs:gap-x-2">
                <!-- 챔피언 아이콘 -->
                <img :src="getChampionIconUrl(playChampionName)" class="w-[1.85rem] h-[1.85rem] xs:w-[2.3rem] xs:h-[2.3rem] lg:h-[2.5rem] lg:w-[2.5rem]">
                <!-- 챔피언 이름 -->
                <span class="text-xxs xs:text-xs sm:text-sm font-medium">
                    {{ playChampionName }}
                </span>
            </div>
            <!-- 킬 뎃 -->
            <div class="flex flex-col items-center justify-center">
                <div class="flex items-center gap-x-1">
                    <span class="text-xs xs:text-sm font-medium">{{ playChampionKDA }}</span>
                    <span v-if="playChampionKDA !== 'PERPECT'" class="text-xxxs xs:text-xs text-gray-700">KDA</span>
                </div>
                <div class="text-xxxs xs:text-xs font-medium text-gray-600">
                    <span>{{ (playChampionInfo.kills / playChampionInfo.cnt).toFixed(1) }} / </span>
                    <span>{{ (playChampionInfo.deaths / playChampionInfo.cnt).toFixed(1) }} / </span>
                    <span>{{ (playChampionInfo.assists / playChampionInfo.cnt).toFixed(1) }}</span>
                </div>
            </div>
            <!-- 승률 -->
            <div class="flex flex-col items-center justify-center">
                <span class="text-xs xs:text-sm">{{ Math.floor((playChampionInfo.win / playChampionInfo.cnt) * 100) }}%</span>
                <span class="text-xxxs xs:text-xs text-gray-600">{{ playChampionInfo.cnt }} 게임</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    champion: {
        type: Array,
        default: ['championName', { kills: 0, deaths: 0, assists: 0, cnt: 0, win: 0, loss: 0 }]
    }
});

const playChampionName = computed(() => props.champion[0]);
const playChampionInfo = computed(() => props.champion[1]);
const playChampionKDA = computed(() => calculateKDA(props.champion[1]));

</script>