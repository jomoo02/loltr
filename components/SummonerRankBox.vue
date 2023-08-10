<template>
    <div class="container">
        <div class="queuetype_text">{{ queueType }}</div>
        <div v-if="checkRank">
            <div class="ranked_box">
                <div><img :src="emblemSrc" class="ranked_tier_img"></div>
                <div class="ranked_info_group">
                    <div class="relative">
                        <div class="ranked_tier_text_group">
                            <span class="ranked_tier_text">{{ leauge.tier }}</span>
                            <span v-if="!noRankTier.includes(leauge.tier.toLowerCase())" class="ranked_tier_text">{{ leauge.rank }}</span>
                        </div>          
                        <div class="leaguepoint">{{ leauge.leaguePoints }} LP</div>
                    </div>
                    <div>               
                        <div v-if="leauge.tier!=='unRanked'" class="winloss">
                            <div>{{ leauge.wins }}승</div>
                            <div>{{ leauge.losses }}패</div>
                            <div>({{ ((leauge.wins / (leauge.wins + leauge.losses)) * 100).toFixed(1) }}%)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex gap-x-3 items-center flex-col sm:flex-row">
                <div><img :src="emblemSrc" class="w-[4.5rem] sm:w-24 p-1"></div>
                <div class="unranked_text">unRanked</div>
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

<style scoped>
.container {
    @apply w-[19rem] flex flex-col items-center gap-y-3.5 px-1;
}
.queuetype_text {
    @apply font-semibold text-gray-800;
}
.ranked_box {
    @apply flex gap-x-3 flex-col sm:flex-row items-center sm:items-start
}
.ranked_tier_img {
    @apply w-[4.5rem] sm:w-24 p-2;
}
.ranked_info_group {
    @apply flex flex-col pt-1 sm:pt-4 gap-y-3;
}

.ranked_tier_text_group {
    @apply flex gap-x-1;
}
.ranked_tier_text {
    @apply flex gap-x-1 text-[0.94rem] xs:text-[1.25rem] font-medium text-gray-800 ;
}
.unranked_text {
    @apply pt-1 sm:pt-2 text-[0.94] xs:text-[1.25rem] font-medium text-gray-800 sm:pl-[0.1rem]
}
.leaguepoint {
    @apply absolute -bottom-[0.6875rem] sm:-bottom-[0.75rem] text-[0.6875rem] sm:text-[0.75rem] text-gray-500 ;
}
.winloss {
    @apply flex gap-x-1 sm:gap-x-2 text-xs sm:text-[0.875rem] text-gray-700;
}
</style>