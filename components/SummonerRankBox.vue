<template>
    <div class="w-[19rem] flex flex-col items-center gap-y-3.5 py-5 px-1">
        <div class="font-semibold text-gray-800">{{ queueType }}</div>
        <div v-if="checkRank">
            <div class="flex gap-x-3">
                <div><img :src="emblemSrc" class="w-24 p-2"></div>
                <div class="flex flex-col pt-4 gap-y-3">
                    <!-- <div class="flex gap-x-1.5 h-[26px]"> -->
                    <div class="relative">
                        <div class="flex gap-x-1 text-[20px] font-medium text-gray-800 ">
                            <span>{{ leauge.tier }}</span>
                            <span v-if="!noRankTier.includes(leauge.tier.toLowerCase())">{{ leauge.rank }}</span>
                        </div>          
                        <div class="absolute -bottom-[12px] text-[12px] text-gray-500 ">{{ leauge.leaguePoints }} LP</div>
                    </div>
                    <div>               
                        <div v-if="leauge.tier!=='unRanked'" class="flex gap-x-2 text-[14px] text-gray-700">
                            <div>{{ leauge.wins }}승</div>
                            <div>{{ leauge.losses }}패</div>
                            <div>({{ ((leauge.wins / (leauge.wins + leauge.losses)) * 100).toFixed(1) }}%)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex gap-x-3 items-center">
                <div><img :src="emblemSrc" class="w-24 p-1"></div>
                <div class="pt-2 text-[20px] font-medium text-gray-800 pl-[1.5px]">unRanked</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    queueType: {
        type: String,
        default: 'RANKED_SOLO_5x5'
    },
    checkRank: {
        type: Boolean,
        default: true
    },
    leauge: {
        type: Object,
        default: {
            queueType: 'RANKED_SOLO_5x5',
            wins: 1,
            losses: 1,
            tier: 'GOLD',
            rank: 'II',
            leaguePoints: 2
        }
    }
});
const noRankTier = ['grandmaster', 'master', 'challenger'];
const emblemSrc = ref();
if (props.checkRank) {
    emblemSrc.value = `../assets/emblem/${props.leauge.tier.toLowerCase()}.png`;
}
else {
    emblemSrc.value = '../assets/emblem/unranked.png';
}
</script>