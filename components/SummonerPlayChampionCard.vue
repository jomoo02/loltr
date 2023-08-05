<template>
    <div>
        <div class="h-16 w-full sm:w-[22.5rem]">
            <div class="flex h-full w-full justify-between px-7">
                <div class="flex items-center gap-x-2 w-[8rem]">
                    <!-- 챔피언 아이콘 -->
                    <div class="w-[2.5rem]">
                        <img :src="getChampionIconUrl(playChampionName)">
                    </div>
                    <!-- 챔피언 이름 -->
                    <div><span class="text-xs font-medium">{{ playChampionName }}</span></div>
                </div>
                <!-- 킬 뎃 -->
                <div class="flex flex-col items-center justify-center">
                    <div class="flex items-center gap-x-1">
                        <span class="text-sm font-medium">{{ playChampionKDA }}</span>
                        <span v-if="playChampionKDA !== 'PERPECT'" class="text-xs">KDA</span>
                    </div>
                    <div class="text-xs font-medium text-gray-600">
                        <span>{{ (playChampionInfo.kills / playChampionInfo.cnt).toFixed(1) }} / </span>
                        <span>{{ (playChampionInfo.deaths / playChampionInfo.cnt).toFixed(1) }} / </span>
                        <span>{{ (playChampionInfo.assists / playChampionInfo.cnt).toFixed(1) }}</span>
                    </div>
                </div>
                <!-- 승률 -->
                <div class="flex flex-col items-center justify-center">
                    <span class="text-sm">{{ Math.floor((playChampionInfo.win / playChampionInfo.cnt) * 100) }}%</span>
                    <span class="text-xs font-medium text-gray-800">{{ playChampionInfo.cnt }} 게임</span>
                </div>
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