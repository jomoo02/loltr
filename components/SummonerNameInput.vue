<template>
    <div id="input_id" class="w-full h-full flex border-2 rounded-lg border-zinc-200 bg-white inputcomponent">
        <div class="w-full h-full relative">
            <input type="text" placeholder="소환사명" :value="summonerName" @input="changeInputSummonerName"
            @keypress.enter="routeSummonerName" @focus="focusInputComponent"
            class="w-full h-full px-5 text-xs xs:text-sm outline-none rounded-xl cursor-text">
            <ClientOnly>
                <div class="w-full absolute text-xs xs:text-sm rounded-lg border-2 bg-white" id="recentSearchList" :class="focus === 1 ? 'block' : 'hidden'">
                    <div v-if="summonerName === ''">
                        <div v-if="mainStore.recentSearchSummonerList.length > 0">
                            <ul>
                                <li v-for="(summoner, index) in mainStore.recentSearchSummonerList" 
                                class="h-7 xs:h-8 flex justify-between items-center px-4 hover:bg-gray-50 border-b last:border-none first:rounded-t-lg last:rounded-b-lg">
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
                        <div v-else class="h-7 xs:h-8 flex items-center px-4">
                            <span>최근 검색한 소환사가 없습니다.</span>
                        </div>
                    </div>
                    <div v-else class="h-7 xs:h-8 flex items-center px-4">
                        <span>
                            {{ summonerName }}
                        </span>
                    </div>
                </div>
            </ClientOnly>
        </div>
        <button class="right-3 h-full font-bold text-base xs:text-lg text-zinc-500 hover:bg-stone-200 px-2 rounded-lg subpixel-antialiased"
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
    if (!e.target.closest('.inputcomponent')) {
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
