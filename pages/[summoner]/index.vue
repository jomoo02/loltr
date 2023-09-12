<template>
    <div class="mx-auto max-w-7xl px-1 md:px-10 lg:px-24 xl:px-10" v-if="mainStore.loading">
        <template v-if="!checkNotExistSummoner">
            <ClientOnly>
                <div class="flex flex-col justify-center items-center gap-y-10 mt-20 text-slate-700">
                    <div class="flex flex-col items-center justify-center text-sm md:text-base lg:text-lg">
                        <div class="flex justify-center items-center gap-x-1.5">
                            <span>소환사</span>
                            <span class="font-bold text underline underline-offset-2">{{ summonerName }}</span>
                        </div>
                        <div>관한 검색 결과가 없습니다.</div>
                    </div>
                    <div class="flex flex-col w-full justify-center items-center gap-y-2 my-2">
                        <div class="text-sm sm:text-base font-medium">다른 소환사 검색</div>
                        <div class="xs:w-10/12 px-2.5 xs:px-0 sm:w-8/12 lg:w-5/12">
                            <SummonerNameInput />
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </template>
        <template v-else>
            <div class="fixed right-1 xs:right-3 md:right-6 lg:right-8 bottom-3 flex flex-col">
                <button @click="scrollToTop">
                    <Icon name="mdi:arrow-up-circle" size="2.2rem" color="rgb(100 116 139)" />
                </button>
                <button @click="scrollToBottom">
                    <Icon name="mdi:arrow-down-circle" size="2.2rem" color="rgb(100 116 139)" />
                </button>
            </div>

            <div class="flex w-full justify-end my-2">
                <div class="w-[30rem] h-8 z-50">
                    <SummonerNameInput />
                </div>
            </div>
            <div class="xl:h-[12rem] my-2 z-0 w-full">
                <SummonerCard :input-summoner="inputSummonerInfo" :leagueDTO="leagueDTO" @update-record="setNewMatchIds(inputSummonerInfo, matchIds)" />
            </div>
            <div class="my-8 w-full">
                <SummonerMostCard 
                    v-bind="{   
                        mostChampions: playStore.playChampionArray.slice(0, 3),
                        mostItems: playStore.playItemArray.slice(0, 3),
                        mostShoes: playStore.playShoesArray.slice(0, 3)
                    }"
                    :summoner-win-loss="mainStore.winLossRecord" 
                />
            </div>
            <!-- 차트 -->
            <div class="w-full bg-white rounded-xl p-2.5 my-8">
                <div v-show="chartSelect === 0" class="flex justify-center" >
                    <ClientOnly><BarChart :chart-data="timeStore.timeChartData" :chart-options="timeStore.timeChartOptions" /></ClientOnly>
                    
                </div>
                <div v-show="chartSelect === 1" class="flex justify-center">
                    <ClientOnly><BarChart :chart-data="dayStore.dayChartData" :chart-options="dayStore.dayChartOptions" :width="900" :height="450" /></ClientOnly>
                </div>
                <div class="w-full flex justify-center pb-1">
                    <nav class="w-[56.25rem]">
                        <ul class="flex items-center">
                            <li :class="chartSelect === 0 ? 'btn_on' : ''" @click="toggleChartSelect()">시간별</li>
                            <li :class="chartSelect === 1 ? 'btn_on' : ''" @click="toggleChartSelect()">요일별</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div>
                <div class="flex lg:justify-between flex-col xl:flex-row gap-y-8 xl:gap-y-0">
                    <SummonerPlayChampion :play-champions="playStore.playChampionArray" />
                    <div class="flex flex-col gap-y-1.5">
                        <div v-for="(matchDTO, index) in matchDTOs" :key="index">
                            <template v-if="matchDTO.queueId === 1700">
                                <MatchCardArena
                                    :matchDTO="matchDTO"
                                    :puuid="inputSummonerPuuid"
                                />
                            </template>
                            <template v-else>
                                <MatchCard
                                    :matchDTO="matchDTO"
                                    :puuid="inputSummonerPuuid"
                                />
                            </template>
                        </div>
                        <div class="bg-slate-200 rounded-lg text-sm font-medium p-1 flex justify-center my-1">
                            <button @click="clickSeeMoreBtn()" class="w-full">더 보기</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useMainStore } from '~/stores/main';
import { useTimeStore } from '~/stores/time';
import { useDayStore } from '~/stores/day';
import { usePlayStore } from '~/stores/play';

const mainStore = useMainStore();
const timeStore = useTimeStore();
const dayStore = useDayStore();
const playStore = usePlayStore();

mainStore.$reset();
timeStore.$reset();
dayStore.$reset();
playStore.$reset();

const route = useRoute();
const router = useRouter();

const summonerName = route.params.summoner;

console.log(summonerName);

const matchDTOs = ref([]);

const chartSelect = ref(0);

const matchIds = ref();
const leagueDTO = ref();

// match 더 보기 관련
const matchIndex = ref(0);

const inputSummonerPuuid = ref();
// 소환사 db 검색 없으면 db에 생성
const inputSummonerInfo = await getSummonerInfo(summonerName) || await createSummoner(summonerName);

const checkNotExistSummoner = ref(!inputSummonerInfo ? false : true);

if (checkNotExistSummoner) {
    setInputSummonerData(inputSummonerInfo);
    // inputSummoner league
    const leagues = await getLeagueDTO(inputSummonerInfo);
    setLeagueDTO(leagues);

    // 소환사 matchId List
    const matchIdList = [...inputSummonerInfo.matchList];
    setMatchIds(matchIdList);

    // matchId를 통해 match 데이터를 저장
    const { matchDTOs: matchs, endIndex: idx} = await getMatchDTO(matchIdList, matchIndex.value, 20);
    setMatchIndex(idx);
    setMatchDTO(matchs);

    saveInputSummonerName(inputSummonerInfo.name);
}

mainStore.loading = true;


function saveInputSummonerName(inputSummonerName) {
    mainStore.addRecentSearchSummoner(inputSummonerName);
}

function setMatchIndex(idx) {
    matchIndex.value = idx;
}

function setInputSummonerData(inputSummoner) {
    inputSummonerPuuid.value = inputSummoner?.puuid;
    // pinia 저장소에 입력한 소환사 데이터 저장
    mainStore.setInputSummoner(inputSummoner);
}

function setMatchIds(matchIdList) {
    matchIds.value = matchIdList;
}

function setLeagueDTO(leagues) {
    leagueDTO.value = [...leagues];
}

function setMatchDTO(matchs) {
    const matchDTO = [...matchs];
    matchDTOs.value = matchDTO;
    mainStore.recordMatch(matchDTO);
}


async function getLeagueDTO(summonerInfo) {
    const { data: leagueDTO } = await useFetch('/api/league/getLeagueDTO', {
        query: { summonerId: summonerInfo?.id }
    });
    
    return leagueDTO.value;
}
async function getMatchDTO(matchIds, startIndex, cnt) {
    const { data } = await useFetch('/api/match/getMatchDTO', {
        query : { matchIds: matchIds, startIndex, cnt }
    });
    return data.value;
}

async function setNewMatchIds(summonerInfo, matchIds) {
    const puuid = summonerInfo?.puuid;
    const { data: newMatchId } = await useFetch('/api/match/findNewMatch', {
        query: { 
            puuid: puuid,
            mostRecentMatchId: matchIds[0]
        }
    });
    const newMatchIds = [...newMatchId.value];

    await useFetch('/api/match/saveMatch', {
        query: {
            newMatchIds: newMatchIds
        }
    });

    await useFetch('/api/summoner/updateMatchIds', {
        method: 'post',
        body: { 
            matchIds: matchIds,
            newMatchIds: newMatchIds,
            puuid: puuid
        }
    });

    router.go();
}

async function getSummonerInfo(summonerName) {
    const { data } = await useFetch('/api/summoner/search', {
        query: { summonerName: summonerName }
    });
    return data.value;
}

async function createSummoner(summonerName) {
    const { data } = await useFetch('/api/summoner/create', {
        query: { summonerName: summonerName }
    });
    return data.value;
}

// 더보기 버튼
async function clickSeeMoreBtn() {
    const curIndex = matchIndex.value;

    const { matchDTOs: matchDTO, endIndex: idx } = await getMatchDTO(matchIds.value, curIndex, 5);
    setMatchIndex(idx);
    matchDTOs.value.push(...matchDTO);
    mainStore.recordMatch([...matchDTO]);

    matchIndex.value += 5;
}

function toggleChartSelect() {
    const curChartSelect = chartSelect.value;
    chartSelect.value = curChartSelect === 1 ? 0 : 1;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth'});
}

</script>

<style scoped>
li {
    @apply mx-0.5 md:mx-1 lg:mx-1.5 my-1 py-1 px-2 cursor-pointer rounded hover:bg-gray-100 hover:shadow-sm text-xs xs:text-sm md:text-base font-medium;
}

.btn_on {
    @apply bg-gray-200
}

</style>