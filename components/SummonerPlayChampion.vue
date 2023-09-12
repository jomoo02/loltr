<template>
    <div>
        <div class="flex flex-col bg-white rounded-2xl">
            <SummonerPlayChampionCard :champion="champion" v-for="champion in mostChampions" :key="champion" class="border-b last-of-type:border-0"/>
            <template v-if="btnClickCheck">
                <SummonerPlayChampionCard :champion="champion" v-for="champion in mostChampionsMore" :key="champion" class="border-b last-of-type:border-0"/>
            </template>
        </div>
        <button v-if="!maxNumberUpCheck" class="w-full bg-slate-200 rounded-lg flex justify-center p-1 my-4" @click="clickMoreSeeBtn()">
            <span class="font-medium text-sm">더 보기</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    playChampions: {
        type: Array,
        default: [
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0 }],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0 }],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0 }],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0 }],
            ['', { win: 0, loss:0, kills:0 , deaths: 0, assists: 0 }],
        ]
    }
});

const maxNumberUpCheck = ref(false);
const btnClickCheck = ref(false);

const mostChampions = ref();
const mostChampionsMore = ref();

cutMaxSevenMostChampions(props.playChampions);

watch(() => props.playChampions, (newValue) => {
    cutMaxSevenMostChampions(newValue);
});

function cutMaxSevenMostChampions(playChampions) {
    maxNumberUpCheck.value = btnClickCheck.value ? true : false;

    if (props.playChampions.length > 7) {
        mostChampions.value = playChampions.slice(0, 7);
        mostChampionsMore.value = playChampions.slice(7);
    }
    else {
        maxNumberUpCheck.value = true;;
        mostChampions.value = playChampions;
    }
}

function clickMoreSeeBtn() {
    btnClickCheck.value = true;
    maxNumberUpCheck.value = true;
}

</script>