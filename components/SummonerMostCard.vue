<template>
    <div class="w-full h-full bg-white rounded-2xl flex px-1.5 md:px-1 lg:px-3 py-5 justify-around">
        <div class="flex items-center">
            <DoughnutChart :win="summonerWinLoss.win" :loss="summonerWinLoss.loss" />
        </div>
        <div class="flex flex-col gap-y-1 h-full">
            <span class="group_title">모스트 챔피언</span>
            <div class="flex flex-col gap-y-1.5">
                <div v-for="champion in mostChampions" class="group">
                    <img :src="getChampionIconUrl(champion[0])" alt="" class="item_img">
                    <div class="item_group">
                        <div class="item_text">{{ champion[1].win }}승</div>
                        <div class="item_text">{{ champion[1].loss }}패</div>
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
                        <div class="item_text">{{ item[1].win }}승</div>
                        <div class="item_text">{{ item[1].loss }}패</div>
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
                        <div class="item_text">{{ shoes[1].win }}승</div>
                        <div class="item_text">{{ shoes[1].loss }}패</div>
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
</script>

<style scoped>
.group {
    @apply flex items-center gap-x-0.5 xs:gap-x-1.5 lg:gap-x-2.5;
}
.group_title {
    @apply font-semibold text-[13.5px] sm:text-[15.5px] text-gray-700 pb-1;
}
.item_img {
    @apply rounded-2xl object-fill w-7 h-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9;
}
.item_group {
    @apply flex justify-around w-full gap-x-px xs:gap-x-1 md:gap-x-2;
}
.item_text {
    @apply text-[13px] sm:text-sm lg:text-[15px] text-gray-600 font-medium;
}
</style>