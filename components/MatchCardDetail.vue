<template>
    <div class="flex flex-col mt-1 mb-4 lg:mt-2.5 lg:mb-4">
        <!-- header -->
        <div class="flex bg-white border-b justify-between rounded-t-lg px-1.5 xs:px-2.5 sm:px-5 lg:px-6 xl:px-4 py-1 md:py-2 lg:py-2" >
             <!-- blue Team info -->
            <div class="flex gap-x-1 lg:gap-x-1.5 text-xxs xs:text-sm lg:text-base">
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectBaron :color="blueTeamBarColor"/>
                    <span>{{ teams[0].objectives.baron.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectHerald :color="blueTeamBarColor"/>
                    <span>{{ teams[0].objectives.riftHerald.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectDragon :color="blueTeamBarColor"/>
                    <span>{{ teams[0].objectives.dragon.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectTower :color="blueTeamBarColor"/>
                    <span>{{ teams[0].objectives.tower.kills }}</span>
                </div>
            </div>
            <!-- 총 킬, 총 머니 -->
            <div class="hidden flex-col gap-y-1" :class="showToTalBar ? 'md:flex' : 'hidden'">
                <div class="relative w-[22rem] flex items-center">
                    <div class="flex w-full">
                        <BarOne
                            :barWidth="calculateBarWidth(blueTeamDTO.totalKills, redTeamDTO.totalKills)"
                            :barColor1="blueTeamBarColor"
                            :barColor2="redTeamBarColor" 
                            :smallSizeHeight="'18'"
                            :height="'20'"
                            :rx="'1'"
                        />
                    </div>
                    <div class="w-full h-full absolute flex items-center justify-between text-xxs lg:text-xs text-white px-2">
                        <span>{{ blueTeamDTO.totalKills }}</span>
                        <span>Total Kill</span>
                        <span>{{ redTeamDTO.totalKills }}</span>
                    </div>
                </div>
                <div class="relative w-[22rem] flex items-center">
                    <div class="flex w-full">
                        <BarOne
                            :barWidth="calculateBarWidth(blueTeamDTO.totalGoldEarned, redTeamDTO.totalGoldEarned)"
                            :barColor1="blueTeamBarColor"
                            :barColor2="redTeamBarColor" 
                            :height="'20'"
                            :smallSizeHeight="'18'"
                            :rx="'1'"
                        />
                    </div>
                    <div class="w-full h-full absolute flex items-center justify-between text-xxs lg:text-xs text-white px-2">
                        <span>{{ blueTeamDTO.totalGoldEarned }}</span>
                        <span>Total Gold</span>
                        <span>{{ redTeamDTO.totalGoldEarned }}</span>
                    </div>
                </div>
            </div>
            <!-- blue Team info -->
            <div class="flex gap-x-1 lg:gap-x-1.5 text-xxs xs:text-sm lg:text-base flex-row-reverse">
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectBaron :color="redTeamBarColor"/>
                    <span>{{ teams[1].objectives.baron.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectHerald :color="redTeamBarColor"/>
                    <span>{{ teams[1].objectives.riftHerald.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectDragon :color="redTeamBarColor"/>
                    <span>{{ teams[1].objectives.dragon.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectTower :color="redTeamBarColor"/>
                    <span>{{ teams[1].objectives.tower.kills }}</span>
                </div>
            </div>
        </div>
        <!-- blue team -->
        <MatchCardDetailTeam
            team="블루팀"
            :gameDuration="gameDuration"
            :maxDamage="maxDamage"
            :maxDamageTaken="maxDamageTaken"
            :gameResult="blueTeamResult"
            :participants="blueTeamDTO.participants"
            :inputSummonerIndex="blueTeaminputSummonerIndex"
            :participantsItems="blueTeamDTO.teamItems"
            :participantsKDA="blueTeamDTO.teamKDA"
        />
        <!-- red team -->
        <MatchCardDetailTeam 
            team="레드팀"
            :gameDuration="gameDuration"
            :maxDamage="maxDamage"
            :maxDamageTaken="maxDamageTaken"
            :gameResult="redTeamResult"
            :participants="redTeamDTO.participants"
            :inputSummonerIndex="redTeamInputSummonerIndex"
            :participantsItems="redTeamDTO.teamItems"
            :participantsKDA="redTeamDTO.teamKDA"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    gameDuration: {
        type: String
    },
    gameResult: {
        type: String
    },
    maxDamage: {
        type: Number
    },
    maxDamageTaken: {
        type: Number,
    },
    inputSummonerIndex: {
        type: Number
    },
    blueTeamDTO: {
        type: Object
    },
    redTeamDTO: {
        type: Object
    },
    teams: {
        type: Array
    }
});

const showToTalBar = ref();
const blueTeamBarColor = ref();
const redTeamBarColor = ref();

const blueTeamResult = ref();
const redTeamResult = ref();

const blueTeaminputSummonerIndex = ref();
const redTeamInputSummonerIndex = ref();

[blueTeamResult.value, redTeamResult.value] = getGameResult(props.gameResult, props.inputSummonerIndex);
[blueTeaminputSummonerIndex.value, redTeamInputSummonerIndex.value] = normalizeInputSummonerIndex(props.inputSummonerIndex);
[blueTeamBarColor.value, redTeamBarColor.value] = setBarColor(blueTeamResult.value);
showToTalBar.value = checkShowToTalBar(blueTeamResult.value);

function checkShowToTalBar(blueTeamResult) {
    if (blueTeamResult === '다시하기') {
        return false;
    }
    return true;
}

function setBarColor(blueTeamResult) {
    if (blueTeamResult === '다시하기') {
        return ['#94a3b8', '#94a3b8'];
    }
    else if (blueTeamResult === '승리') {
        return ['#60a5fa','#E34646'];
    }

    return ['#E34646','#60a5fa'];
}

function getGameResult(result, inputSummonerIndex) {
    let blueTeamResult = '';
    let redTeamResult = ''

    if (result === '다시하기') {
        [blueTeamResult, redTeamResult] = ['다시하기', '다시하기'];
    }
    else if (result === '승리') {
        [blueTeamResult, redTeamResult] = inputSummonerIndex < 5 ? ['승리', '패배'] : ['패배', '승리'];
     
    }
    else if (result === '패배') {
        [blueTeamResult, redTeamResult] = inputSummonerIndex < 5 ? ['패배', '승리'] : ['승리', '패배'];
    }
    return [blueTeamResult, redTeamResult];
};

function normalizeInputSummonerIndex(inputSummonerIndex) {
    let blueTeamIndex = -1;
    let redTeamIndex = -1;

    if (inputSummonerIndex < 5) {
        blueTeamIndex = inputSummonerIndex;
    }
    else {
        redTeamIndex = inputSummonerIndex - 5;
    }
    return [blueTeamIndex, redTeamIndex];
}


function calculateBarWidth(value1, value2) {
    if (value1 + value2 === 0) {
        return '0%';
    }
    return Math.floor(value1 / (value1 + value2) * 100).toString() + '%'
}

</script>
