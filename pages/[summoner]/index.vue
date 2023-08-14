<template>
    <div class="mx-auto max-w-7xl px-1 md:px-10 lg:px-24 xl:px-10" v-if="mainStore.loading">
        <div class="fixed right-8 bottom-3 flex flex-col">
            <button @click="scrollToTop">
                <Icon name="mdi:arrow-up-circle" size="2.3rem" color="rgb(100 116 139)" />
            </button>
            <button @click="scrollToBottom">
                <Icon name="mdi:arrow-down-circle" size="2.3rem" color="rgb(100 116 139)" />
            </button>
        </div>

        <div class="flex w-full justify-end my-2">
            <div class="w-[30rem] h-8 xs:h-9 z-50">
                <SummonerNameInput />
            </div>
        </div>
        <div class="xl:h-[12rem] my-2 z-0 w-full">
            <SummonerCard :inputSummoner="inputSummonerInfo" :leagueDTO="leagueDTO" @update-record="setNewMatchIds(inputSummonerInfo, matchIds)" />
        </div>
        <div class="my-8 sm:h-[12rem] w-full">
            <SummonerMostCard 
                :most-data="{ 
                    'mostChampion': playStore.playChampionArray.slice(0, 3),
                    'mostItem': playStore.playItemArray.slice(0, 3),
                    'mostShoes': playStore.playShoesArray.slice(0, 3)
                }"
                :summoner-win-loss="mainStore.winLossRecord" 
            />
        </div>
        <!-- 차트 -->
        <div class="w-full bg-white rounded-xl p-2.5 my-8">
            <div v-if="chartSelect === 0" class="flex justify-center" >
                <BarChart :chartData="timeStore.timeChartData" :chartOptions="timeStore.timeChartOptions" />
            </div>
            <div v-else class="flex justify-center">
                <BarChart :chartData="dayStore.dayChartData" :chartOptions="dayStore.dayChartOptions" :width="900" :height="450" />
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
                <div>
                    <SummonerPlayChampion :playChampions="playStore.playChampionArray"/>
                </div>
                
                <div class="flex flex-col gap-y-1.5">
                    <div v-for="(matchDTO, index) in matchDTOs" :key="index" class="h-[5.5rem] xs:h-[6.5rem] md:h-[8.5rem] lg:h-[7.3rem]">
                        <div v-if="matchDTO.queueId === 1700" class="h-full">
                            <MatchCardArena 
                            :gameEndTimestamp="matchDTO.gameEndTimestamp"
                            :queueId="matchDTO.queueId"
                            :gameDuration="matchDTO.gameDuration"
                            :participants="matchDTO.participants"
                            :puuid="inputSummonerPuuid"
                            />
                        </div>
                        <div v-else class="h-full">
                            <MatchCard
                            :gameEndTimestamp="matchDTO.gameEndTimestamp"
                            :queueId="matchDTO.queueId"
                            :gameDuration="matchDTO.gameDuration"
                            :participants="matchDTO.participants"
                            :puuid="inputSummonerPuuid"
                            />
                        </div>
                    </div>
                    <div v-for="(beforeMatchDTO, index) in beforeMatchDTOs" :key="index" class="h-[5.5rem] xs:h-[6.5rem] md:h-[8.5rem] lg:h-[7.3rem]">
                        <div v-if="beforeMatchDTO.queueId === 1700" class="h-full">
                            <MatchCardArena
                            :gameEndTimestamp="beforeMatchDTO.gameEndTimestamp"
                            :queueId="beforeMatchDTO.queueId"
                            :gameDuration="beforeMatchDTO.gameDuration"
                            :participants="beforeMatchDTO.participants"
                            :puuid="inputSummonerPuuid"
                            />
                        </div>
                        <div v-else class="h-full">
                            <MatchCard
                            :gameEndTimestamp="beforeMatchDTO.gameEndTimestamp"
                            :queueId="beforeMatchDTO.queueId"
                            :gameDuration="beforeMatchDTO.gameDuration"
                            :participants="beforeMatchDTO.participants"
                            :puuid="inputSummonerPuuid"
                            />
                        </div>
                    </div>
                    <div class="bg-slate-200 rounded-lg text-sm font-medium p-1 flex justify-center my-1">
                        <button @click="clickSeeMoreBtn()" class="w-full">더 보기</button>
                    </div>
                </div>
            </div>
        </div>
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
const inputSummonerInfo = ref();
const matchDTOs = ref([]);

const chartSelect = ref(0);

const matchIds = ref();
const leagueDTO = ref();

// 소환사 db 검색
inputSummonerInfo.value = await getSummonerInfo(summonerName);

// 소환사가 db에 없으면 db에 생성
if (inputSummonerInfo.value === '') {
    inputSummonerInfo.value = await createSummoner(summonerName);
}

const inputSummonerPuuid = ref(inputSummonerInfo.value.puuid);

leagueDTO.value = await getLeagueDTO(inputSummonerInfo.value);
// pinia 저장소에 입력한 소환사 데이터 저장
mainStore.setInputSummoner(inputSummonerInfo.value);

// 소환사 matchId List
matchIds.value = inputSummonerInfo.value.matchList;

// matchId를 통해 match 데이터를 저장
const matchs = [];

const matchDTO = await getMatchDTO(matchIds.value.slice(0, 10));
matchs.push(...matchDTO);

matchDTOs.value = matchs;

mainStore.recordMatch(matchs);

mainStore.loading = true;

// match 더 보기 관련
const matchShownNumber = ref(10);
const beforeMatchDTOs = ref([]);

async function setNewMatchIds(summonerInfo, matchIds) {
    const puuid = summonerInfo.puuid;
    const { data: newMatchId } = await useFetch('/api/match/findNewMatch', {
        query: { 
            puuid: puuid,
            mostRecentMatchId: matchIds[0]
        }
    });
    const newMatchIds = [...newMatchId.value];

    const { data: saveMatchs } = await useFetch('/api/match/saveMatch', {
        query: {
            newMatchIds: newMatchIds
        }
    });

    const { data: updateSummoner } = await useFetch('/api/summoner/updateMatchIds', {
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

async function getMatchDTO(matchIds) {
    const { data } = await useFetch('/api/match/getMatchDTO', {
        method: 'get',
        query : { matchIds: matchIds }
    });
    return data.value;
}

async function getLeagueDTO(summonerInfo) {
    const { data: leagueDTO } = await useFetch('/api/league/getLeagueDTO', {
        query: { summonerId: summonerInfo.id }
    });
    return leagueDTO.value;
}

// 더보기 버튼
async function clickSeeMoreBtn() {
    const curIndex = matchShownNumber.value;
    matchShownNumber.value += 5;
  
    const matchDTO = await getMatchDTO(matchIds.value.slice(curIndex, curIndex + 5));

    beforeMatchDTOs.value.push(...matchDTO);
    mainStore.recordMatch([...matchDTO]);
}

function toggleChartSelect() {
    if (chartSelect.value === 1) {
        chartSelect.value = 0;
    }
    else {
        chartSelect.value = 1;
    }
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