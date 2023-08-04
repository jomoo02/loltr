<template>
    <div id="input_id" class="flex w-full h-full border-2 border-zinc-200 rounded-lg bg-white inputComponent">
        <div class="w-full h-full relative items-center">
            <input type="text" placeholder="소환사명" :value="summonerName" @input="changeInputSummonerName"
            @keypress.enter="routeSummonerName" @focus="focusInputComponent"
            class="h-full w-full px-5 text-sm outline-none rounded-xl cursor-text">
            <ClientOnly>
                <div class="absolute w-full rounded-lg border-2 bg-white text-sm" id="recentSearchList" :class="focus === 1 ? 'block' : 'hidden'">
                    <div v-if="summonerName === ''">
                        <div v-if="mainStore.recentSearchSummonerList.length > 0">
                            <ul>
                                <li v-for="(summoner, index) in mainStore.recentSearchSummonerList" 
                                class="h-8 border-b last:border-none px-4 hover:bg-gray-50 flex justify-between items-center first:rounded-t-lg last:rounded-b-lg">
                                    <span @click="routeRecentSearchSummonerName(summoner)" class="w-full h-full flex items-center cursor-pointer">{{ summoner }}</span>
                                    <button 
                                    @click.stop="removeRecentSearchSummoner(index, $event)" 
                                    @mouseover.stop="overRemoveBtn(index)"
                                    @mouseleave.stop="leaveRemoveBtn"
                                    class="w-4 flex justify-center">
                                        <div v-show="removeBtnHover !== index"><Icon name="ph:x" size="1rem" /></div>
                                        <div v-show="removeBtnHover === index"><Icon name="ph:x-bold" size="1.3rem" /></div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div v-else class="h-8 flex items-center px-4">
                            <span>최근 검색한 소환사가 없습니다.</span>
                        </div>
                    </div>
                    <div v-else class="h-8 flex items-center px-4">
                        <span>
                            {{ summonerName }}
                        </span>
                    </div>
                </div>
            </ClientOnly>
        </div>
        <button class="right-3 hover:bg-stone-200 px-2 h-full rounded-lg font-bold text-lg text-zinc-500 subpixel-antialiased"
        @click="routeSummonerName">
            lol.tr
        </button>
    </div>
</template>

<script setup>
import { useMainStore } from '~/stores/main';

const mainStore = useMainStore();


const summonerName = ref('');
const router = useRouter();
const focus = ref(0);
const removeBtnHover = ref(-1);

const handleClose = (e) => {
    if (!e.target.closest('.inputComponent')) {
        focus.value = 0;
    }
};


onMounted(() => {
    if (process.client) {
        console.log('onMounted')
        window.addEventListener('click', handleClose);
    }
});

onUnmounted(() => {
    if (process.client) {
        window.removeEventListener('click', handleClose);
    }
});

function routeRecentSearchSummonerName(summonerName) {
    focusOutInputComponent();
    mainStore.addRecentSearchSummoner(summonerName);

    router.push({ path: `/${summonerName}`});
}

function changeInputSummonerName(e) {
    summonerName.value = e.target.value;
}

function routeSummonerName() {
    focusOutInputComponent();
    mainStore.addRecentSearchSummoner(summonerName.value);

    router.push({ path: `/${summonerName.value}`});
}

function focusInputComponent() {
    focus.value = 1;
}

function focusOutInputComponent() {
    focus.value = 0;
}

function removeRecentSearchSummoner(index, e) {
    mainStore.removeRecentSummoner(index);
}

function leaveRemoveBtn() {
    removeBtnHover.value = -1;
}

function overRemoveBtn(index) {
    removeBtnHover.value = index;
}

</script>

<style scoped>

</style>