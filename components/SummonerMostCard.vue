<template>
    <div class="w-full h-full bg-white rounded-2xl flex justify-around xs:px-1.5 md:px-1 lg:px-3 py-4 xs:py-5">
        <div class="flex items-center">
            <DoughnutChart :win="summonerWinLoss.win" :loss="summonerWinLoss.loss" />
        </div>
        <div class="box">
            <span class="box-title">모스트 챔피언</span>
                <div class="flex flex-col gap-y-1.5">
                <div v-for="champion in mostChampions" class="box-content">
                    <img :src="getChampionIconUrl(champion[0])" alt="champion">
                    <div class="box-content-group">
                        <div class="text_winrate">{{ calculateWinRate(champion[1].win, champion[1].loss) }}%</div>
                        <div class="text_content">
                            <span>{{ champion[1].win }}승</span>
                            <span>{{ champion[1].loss }}패</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <span class="box-title">모스트 아이템</span>
            <div class="flex flex-col gap-y-1.5">
                <div v-for="item in mostItems" class="box-content">
                    <img :src="getItemIconUrl(item[0])" alt="item">
                    <div class="box-content-group">
                        <div class="text_winrate">{{ calculateWinRate(item[1].win, item[1].loss) }}%</div>
                        <div class="text_content">
                            <span>{{ item[1].win }}승</span>
                            <span>{{ item[1].loss }}패</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <span class="box-title">모스트 신발</span>
            <div class="flex flex-col gap-y-1.5">
                <div v-for="shoes in mostShoes" class="box-content">
                    <img :src="getItemIconUrl(shoes[0])" alt="shoes">
                    <div class="box-content-group">
                        <div class="text_winrate">{{ calculateWinRate(shoes[1].win, shoes[1].loss) }}%</div>
                        <div class="text_content">
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
    mostChampions: Array,
    mostItems: Array,
    mostShoes: Array,
    summonerWinLoss: Object
});

function calculateWinRate(win, loss) {
    return Math.floor(win / (win + loss) * 100);
}

</script>

<style scoped>
.box {
    @apply flex flex-col gap-y-1.5 h-full py-1.5 justify-center;
}
.box-title {
    @apply font-semibold text-xxxs xs:text-[0.845rem] sm:text-[0.95rem] text-gray-700 pb-1;
}
.box-content {
    @apply flex items-center gap-x-1 xs:gap-x-1.5 sm:gap-x-2 lg:gap-x-2.5;
}
img {
    @apply rounded-2xl object-fill w-[1.4rem] h-[1.4rem] xs:w-7 xs:h-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9;
}
.box-content-group{
    @apply w-full flex justify-between gap-x-px xs:gap-x-1 md:gap-x-1.5;
}
.text_content {
    @apply hidden lg:flex items-center text-sm text-gray-500 font-medium gap-x-1;
}
.text_winrate {
    @apply font-medium text-xxxs xs:text-[0.8125rem] sm:text-sm lg:text-[0.9rem] text-gray-600;
}
</style>