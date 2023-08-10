<template>
    <div class="h-14 xs:h-16 w-full xl:w-[22.5rem] md:px-10 xl:px-0">
        <div class="flex h-full w-full justify-between px-7">
            <div class="champion_info_group">
                <!-- 챔피언 아이콘 -->
                <div class="champion_img">
                    <img :src="getChampionIconUrl(playChampionName)">
                </div>
                <!-- 챔피언 이름 -->
                <div><span class="champion_name">{{ playChampionName }}</span></div>
            </div>
            <!-- 킬 뎃 -->
            <div class="flex flex-col items-center justify-center">
                <div class="flex items-center gap-x-1">
                    <span class="kda">{{ playChampionKDA }}</span>
                    <span v-if="playChampionKDA !== 'PERPECT'" class="text-[0.6875rem] xs:text-xs">KDA</span>
                </div>
                <div class="text-[0.625rem] xs:text-xs font-medium text-gray-600">
                    <span>{{ (playChampionInfo.kills / playChampionInfo.cnt).toFixed(1) }} / </span>
                    <span>{{ (playChampionInfo.deaths / playChampionInfo.cnt).toFixed(1) }} / </span>
                    <span>{{ (playChampionInfo.assists / playChampionInfo.cnt).toFixed(1) }}</span>
                </div>
            </div>
            <!-- 승률 -->
            <div class="flex flex-col items-center justify-center">
                <span class="text-xs xs:text-sm">{{ Math.floor((playChampionInfo.win / playChampionInfo.cnt) * 100) }}%</span>
                <span class="text-[0.625rem] xs:text-xs font-medium text-gray-800">{{ playChampionInfo.cnt }} 게임</span>
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

const playChampionName = ref(props.champion[0]);
const playChampionInfo = ref(props.champion[1]);
const playChampionKDA = ref(calculateKDA(props.champion[1]));

watch(() => props.champion, (newValue) => {
    playChampionName.value = newValue[0];
    playChampionInfo.value = newValue[1];
});

</script>

<style scoped>
.champion_info_group {
    @apply flex items-center gap-x-1.5 w-[6rem] xs:gap-x-2 xs:w-[8rem];
}
.champion_name {
    @apply text-[0.6875rem] xs:text-xs sm:text-sm font-medium;
}
.champion_img {
    @apply w-[1.85rem] h-[1.85rem] xs:w-[2.5rem] xs:h-[2.5rem];
}
.kda {
    @apply text-xs xs:text-sm font-medium;
}
</style>