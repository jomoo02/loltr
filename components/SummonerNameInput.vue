<template>
    <div class="inputcomponent h-full">
        <div id="input_id" class="w-full h-full flex items-center border-2 rounded-lg border-zinc-200 bg-white inputcomponent" :class="focus === 1 ? 'rounded-b-none': ''">
            <input type="text" placeholder="소환사명" :value="summonerName" @input="changeInputSummonerName"
                @keypress.enter="routeSummonerName" @focus="focusInputComponent"
                class="w-full flex px-5  text-xs xs:text-sm outline-none rounded-xl cursor-text" 
                :class="focus === 1 ? 'ed-b-roundnone': ''"
            >
            <button class="flex h-full font-bold text-base xs:text-lg text-zinc-500 hover:bg-stone-200 px-2 rounded-md subpixel-antialiased" 
                @click="routeSummonerName"
            >
                lol.tr
            </button>
        </div>
        <ClientOnly>
            <div class="w-full text-xs xs:text-sm rounded-b-xl border-x-2 border-b-2 border-zinc-200 bg-white" id="recentSearchList" :class="focus === 1 ? 'block' : 'hidden'">
                <div v-if="summonerName === ''">
                    <ul v-if="mainStore.recentSearchSummonerList.length > 0">
                        <li v-for="(summoner, index) in mainStore.recentSearchSummonerList" 
                            class="h-[29px] flex justify-between items-center px-5 border-b hover:bg-gray-50 ring-b last:border-none last:rounded-b-lg"
                        >
                            <div @click="routeRecentSearchSummonerName(summoner)" class="w-full h-full flex items-center cursor-pointer">{{ summoner }}</div>
                            <button 
                                @click.stop="removeRecentSearchSummoner(index, $event)" 
                                @mouseover.stop="overRemoveBtn(index)"
                                @mouseleave.stop="leaveRemoveBtn"
                                class="w-4 flex justify-center"
                            >
                                <div v-show="removeBtnHover !== index"><Icon name="ph:x" size="1rem" /></div>
                                <div v-show="removeBtnHover === index"><Icon name="ph:x-bold" size="1.3rem" /></div>
                            </button>
                        </li>
                    </ul>
                    <div v-else class="h-7 xs:h-8 flex items-center px-4">
                        최근 검색한 소환사가 없습니다.
                    </div>
                </div>
                <div v-else class="h-7 xs:h-8 flex items-center px-4">
                    {{ summonerName }}
                </div>
            </div>
        </ClientOnly>
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
    router.push({ path: `/${summonerName}`});
}

function changeInputSummonerName(e) {
    summonerName.value = e.target.value;
}

function routeSummonerName() {
    focusOutInputComponent();
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
