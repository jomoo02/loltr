<template>
    <div>
        <div class="flex flex-col bg-white rounded-2xl">
            <div v-for="(champion, index) in mostChampions" :key="champion" class="border-b last-of-type:border-0">
                <SummonerPlayChampionCard :champion="champion"/>
            </div>
            <!-- 더 보기 클릭 시 -->
            <div v-if="check">
                <div v-for="(champion, index) in mostChampionsMore" :key="champion" class="border-b last-of-type:border-0">
                    <SummonerPlayChampionCard :champion="champion"/>
                </div>
            </div>
        </div>
        <button class="w-full bg-slate-200 rounded-lg flex justify-center p-1 my-4" @click="clickMoreSeeBtn()" v-if="!check">
            <span class="font-medium text-sm">더 보기</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    playChampions: {
        type: Array,
        default: [
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0}],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0}],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0}],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0}],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0}],
        ]
    }
});

const check = ref(false);

const mostChampions = ref();
const mostChampionsMore = ref();


cutMaxSevenMostChampions(props.playChampions);

watch(() => props.playChampions, (newValue) => {
    cutMaxSevenMostChampions(newValue);
});

function cutMaxSevenMostChampions(playChampions) {
    if (props.playChampions.length > 5) {
        mostChampions.value = playChampions.slice(0, 7);
        mostChampionsMore.value = playChampions.slice(7);
    }
    else {
        mostChampions.value = playChampions
    }
}

function clickMoreSeeBtn() {
    check.value = true;
}

</script>