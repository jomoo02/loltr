<template>
    <div class="container_most">
        <div class="flex items-center">
            <DoughnutChart :win="summonerWinLoss.win" :loss="summonerWinLoss.loss" />
        </div>
        <div class="flex flex-col gap-y-1 h-full">
            <span class="group_title">모스트 챔피언</span>
            <div class="flex flex-col gap-y-1.5">
                <div v-for="champion in mostChampions" class="group">
                    <img :src="getChampionIconUrl(champion[0])" alt="" class="item_img">
                    <div class="item_group">
                        <div class="item_winrate">{{ calculateWinRate(champion[1].win, champion[1].loss) }}%</div>
                        <div class="item_text">
                            <span>{{ champion[1].win }}승</span>
                            <span>{{ champion[1].loss }}패</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-y-1 h-full">
            <span class="group_title">모스트 아이템</span>
            <div class="flex flex-col gap-y-1.5">
                <div v-for="item in mostItems" class="group">
                    <img :src="getItemIconUrl(item[0])" alt="" class="item_img">
                    <div class="item_group">
                        <div class="item_winrate">{{ calculateWinRate(item[1].win, item[1].loss) }}%</div>
                        <div class="item_text">
                            <span>{{ item[1].win }}승</span>
                            <span>{{ item[1].loss }}패</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="flex flex-col gap-y-1 h-full">
            <span class="group_title">모스트 신발</span>
            <div class="flex flex-col gap-y-1.5">
                <div v-for="shoes in mostShoes" class="group">
                    <img :src="getItemIconUrl(shoes[0])" alt="" class="item_img">
                    <div class="item_group">
                        <div class="item_winrate">{{ calculateWinRate(shoes[1].win, shoes[1].loss) }}%</div>
                        <div class="item_text">
                            <span>{{ shoes[1].win }}승</span>
                            <span>{{ shoes[1].loss }}패</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    mostData: {
        type: Object
    },
    summonerWinLoss: {
        type: Object
    }
});

const mostChampions = ref(props.mostData.mostChampion);
const mostItems = ref(props.mostData.mostItem);
const mostShoes = ref(props.mostData.mostShoes);

watch(() => props.mostData, (newValue) => {
    mostChampions.value = newValue.mostChampion;
    mostItems.value = newValue.mostItem;
    mostShoes.value = newValue.mostShoes;

    console.log(mostItems.value)
});

function calculateWinRate(win, loss) {
    const winRate = Math.floor(win / (win + loss) * 100);
    return winRate;
}
</script>

<style scoped>
.container_most {
    @apply w-full h-full bg-white rounded-2xl flex xs:px-1.5 md:px-1 lg:px-3 py-4 xs:py-5 justify-around;
}
.group {
    @apply flex items-center gap-x-0.5 xs:gap-x-1.5 lg:gap-x-2.5;
}
.group_title {
    @apply font-semibold text-[0.625rem] xs:text-[0.845rem] sm:text-[0.95rem] text-gray-700 pb-1;
}
.item_img {
    @apply rounded-2xl object-fill w-[1.2rem] h-[1.2rem] xs:w-7 xs:h-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9;
}
.item_group {
    @apply flex w-full gap-x-px xs:gap-x-1 md:gap-x-1.5 justify-between;
}
.item_text {
    @apply hidden text-[0.875rem] text-gray-500 font-medium lg:flex gap-x-1 items-center;
}
.item_winrate {
    @apply text-[0.625rem] xs:text-[0.8125rem] sm:text-sm lg:text-[0.9rem] text-gray-600 font-medium;
}
</style>