<template>
    <div class="w-full h-full bg-white rounded-2xl flex py-5 xs:py-7 md:py-7 xl:py-3 px-0.5 xs:px-3 md:px-12 flex-col xl:flex-row sm:justify-between gap-y-6 xl:gap-y-0">
        <!-- 아이콘, 레벨 -->
        <div class="w-full xl:w-[30rem] flex xs:gap-x-2 sm:gap-x-5 px-3 md:px-0">
            <div class="flex items-center pr-2 sm:pr-0">
                <div class="relative">
                    <img alt="profileicon" :src="getProfileIconUrl(inputSummoner.profileIconId)" class="rounded-2xl object-fill w-[3.65rem] xs:w-[4.5rem] sm:w-[5.5rem]">
                    <span class="absolute transform -translate-x-1/2 left-1/2 -bottom-2 bg-gray-600 font-medium text-xs sm:text-sm rounded-xl text-neutral-100 px-1 sm:px-1.5">{{ inputSummoner.summonerLevel }}</span>
                </div>
            </div>
            <div class="flex flex-col justify-center xs:gap-y-px sm:w-[23rem] sm:gap-y-[0.125rem]">
                <div class="text-base xs:text-xl sm:text-2xl font-bold text-zinc-700 xs:pb-1 sm:pb-2 px-1">{{ inputSummoner.name }}</div>
                <div class="pt-2">
                    <div class="flex gap-x-2 xs:gap-x-3 sm:gap-x-3">
                        <button class="bg-slate-200 font-medium text-xxs xs:text-sm px-1 py-1 xs:px-1.5 xs:py-1.5 sm:px-2 sm:py-2 rounded-lg" @click="$emit('updateRecord')">전적 갱신</button>
                        <div class="flex text-xxs xs:text-xs items-end px-px py-[0.15625rem]">최근 업데이트: {{ updatedDay }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-x-0.5 xs:gap-x-3 md:gap-x-20 lg:gap-x-0 justify-around lg:items-center pt-2.5 xs:pt-3.5 lg:pt-9 xl:pt-0">
            <SummonerRankBox :checkRank="check_ranked_solo" :leauge="ranked_solo" :queueType="queueType_ranked_solo"></SummonerRankBox>
            <SummonerRankBox :checkRank="check_ranked_flex_sr" :leauge="ranked_flex_sr" :queueType="queueType_ranked_flex_sr"></SummonerRankBox>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    inputSummoner: {
        type: Object
    },
    leagueDTO: {
        type: Array,
        default: [1]
    }
});


const updatedDay = ref(calculatePlayDay(props.inputSummoner.updateTimestamp));

const leagues = ref(props.leagueDTO);

const ranked_proto_data = {
    wins: 0,
    losses: 0,
    tier: 'unranked',
    rank: '',
    leaguePoints: 0
};

const ranked_solo = ref({ ...ranked_proto_data });
const queueType_ranked_solo = '솔로 랭크';
const check_ranked_solo = ref();

const ranked_flex_sr = ref({ ...ranked_proto_data });
const queueType_ranked_flex_sr = '자유 랭크';
const check_ranked_flex_sr = ref();

getRanked_solo();
getRanked_flex_sr();

function getRanked_solo() {
    const ranked_solo_data = leagues.value.find(league => league.queueType === 'RANKED_SOLO_5x5');

    if (ranked_solo_data === undefined) {
        check_ranked_solo.value = false;
    }
    else {
        ranked_solo.value = ranked_solo_data;
        check_ranked_solo.value = true;
    }
}

function getRanked_flex_sr() {
    const ranked_flex_sr_data = leagues.value.find(league => league.queueType === 'RANKED_FLEX_SR');

    if (ranked_flex_sr_data === undefined) {
        check_ranked_flex_sr.value = false;
    }
    else {
        ranked_flex_sr.value = ranked_flex_sr_data;
        check_ranked_flex_sr.value = true;
    }
}
</script>
