<template>
    <div class="w-[19rem] flex flex-col items-center gap-y-3.5 px-1">
        <div class="font-semibold text-gray-800">{{ queueType }}</div>
        <div v-if="checkRank">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-x-3">
                <img :src="emblemSrc" class=" w-[4.5rem] sm:w-24 p-2" alt="emblem">
                <div class="flex flex-col gap-y-3 pt-1 sm:pt-4">
                    <div class="relative">
                        <div class="flex gap-x-1 text-[0.94rem] xs:text-[1.25rem] font-medium text-gray-800">
                            <span>{{ leauge.tier }}</span>
                            <span v-if="!noRankTier.includes(leauge.tier.toLowerCase())">{{ leauge.rank }}</span>
                        </div>          
                        <div class="absolute -bottom-[0.6875rem] sm:-bottom-[0.75rem] text-xxs sm:text-xs text-gray-500">{{ leauge.leaguePoints }} LP</div>
                    </div>
                    <div>               
                        <div v-if="leauge.tier!=='unRanked'" class="flex gap-x-1 sm:gap-x-2 text-xs sm:text-sm text-gray-700">
                            <span>{{ leauge.wins }}승</span>
                            <span>{{ leauge.losses }}패</span>
                            <span>({{ ((leauge.wins / (leauge.wins + leauge.losses)) * 100).toFixed(1) }}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex flex-col sm:flex-row items-center gap-x-3">
                <img :src="emblemSrc" class="w-[4.5rem] sm:w-24 p-1">
                <div class="text-[0.94rem] xs:text-[1.25rem] font-medium pt-1 sm:pt-2 text-gray-800">unRanked</div>
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
    emblemSrc.value = `/emblem/${props.leauge.tier.toLowerCase()}.png`;
}
else {
    emblemSrc.value = '/emblem/unranked.png';
}

</script>
