<template>
    <div class="flex flex-col mt-1 mb-4 lg:mt-2.5 lg:mb-4">
        <!-- header -->
        <div class="flex bg-white justify-between rounded-t-lg px-1.5 xs:px-2.5 sm:px-5 lg:px-6 xl:px-4 py-1 md:py-2 lg:py-2" >
             <!-- blue Team info -->
            <div class="flex gap-x-1 lg:gap-x-1.5 text-xxs xs:text-sm lg:text-base">
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectBaron :color="blueTeamBarColor"/>
                    <span>{{ blueTeamObjectives.baron.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectHerald :color="blueTeamBarColor"/>
                    <span>{{ blueTeamObjectives.riftHerald.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectDragon :color="blueTeamBarColor"/>
                    <span>{{ blueTeamObjectives.dragon.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectTower :color="blueTeamBarColor"/>
                    <span>{{ blueTeamObjectives.tower.kills }}</span>
                </div>
            </div>
            <!-- 총 킬, 총 머니 -->
            <div class="hidden flex-col gap-y-1" :class="showToToolBar ? 'md:flex' : 'hidden'">
                <div class="relative w-[22rem] flex items-center">
                    <div class="flex w-full">
                        <BarOne
                            :bar-width="calculateBarWidth(blueTeamDto.totalKills, redTeamDto.totalKills)"
                            :bar-color1="blueTeamBarColor"
                            :bar-color2="redTeamBarColor" 
                            :height="'20'"
                            :small-size-height="'18'"
                        />
                    </div>
                    <div class="w-full h-full absolute flex items-center justify-between text-xxs lg:text-xs text-white px-2">
                        <span>{{ blueTeamDto.totalKills }}</span>
                        <span>Total Kill</span>
                        <span>{{ redTeamDto.totalKills }}</span>
                    </div>
                </div>
                <div class="relative w-[22rem] flex items-center">
                    <div class="flex w-full">
                        <BarOne
                            :bar-width="calculateBarWidth(blueTeamDto.totalGoldEarned, redTeamDto.totalGoldEarned)"
                            :bar-color1="blueTeamBarColor"
                            :bar-color2="redTeamBarColor" 
                            :height="'20'"
                            :small-size-height="'18'"
                        />
                    </div>
                    <div class="w-full h-full absolute flex items-center justify-between text-xxs lg:text-xs text-white px-2">
                        <span>{{ blueTeamDto.totalGoldEarned }}</span>
                        <span>Total Gold</span>
                        <span>{{ redTeamDto.totalGoldEarned }}</span>
                    </div>
                </div>
            </div>
            <!-- blue Team info -->
            <div class="flex gap-x-1 lg:gap-x-1.5 text-xxs xs:text-sm lg:text-base flex-row-reverse">
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectBaron :color="redTeamBarColor"/>
                    <span>{{ redTeamObjectives.baron.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectHerald :color="redTeamBarColor"/>
                    <span>{{ redTeamObjectives.riftHerald.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectDragon :color="redTeamBarColor"/>
                    <span>{{ redTeamObjectives.dragon.kills }}</span>
                </div>
                <div class="flex items-center gap-x-[2px] lg:gap-x-1">
                    <ObjectTower :color="redTeamBarColor"/>
                    <span>{{ redTeamObjectives.tower.kills }}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <!-- blue team -->
            <MatchCardDetailTeam
                :puuid="puuid"
                :game-info-dto="{
                    team: '블루팀',
                    gameResult: blueTeamResult,
                    gameDuration
                }"
                :max-damage-dto="maxDamageDto"
                :participants="blueTeamDto.participants"
            />
            <!-- red team -->
            <MatchCardDetailTeam 
                :puuid="puuid"
                :game-info-dto="{
                    team: '레드팀',
                    gameResult: redTeamResult,
                    gameDuration
                }"
                :max-damage-dto="maxDamageDto"
                :participants="redTeamDto.participants"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    puuid: {
        type: String
    },
    gameDuration: {
        type: String
    },
    maxDamageDto: {
        type: Object
    },
    blueTeamDto: {
        type: Object
    },
    redTeamDto: {
        type: Object
    },
    checkRedo: {
        type: Boolean
    }
});

const [blueTeamResult, redTeamResult] = getGameResult(props.checkRedo, props.blueTeamDto.participants[0].win);

const [blueTeamBarColor, redTeamBarColor] = setBarColor(blueTeamResult);

const showToToolBar = blueTeamResult === '다시하기' ? false : true;

const blueTeamObjectives = ref(props.blueTeamDto.objectives);
const redTeamObjectives = ref(props.redTeamDto.objectives);

function setBarColor(blueTeamResult) {
    if (blueTeamResult === '다시하기') {
        return ['#94a3b8', '#94a3b8'];
    }
    else if (blueTeamResult === '승리') {
        return ['#60a5fa','#E34646'];
    }

    return ['#E34646','#60a5fa'];
}

function getGameResult(checkRedo, blueTeamWin) {
    if (checkRedo) {
        return ['다시하기', '다시하기'];
    }
    return blueTeamWin ? ['승리', '패배'] : ['패배', '승리'];
};

function calculateBarWidth(value1, value2) {
    if (value1 + value2 === 0) {
        return '0%';
    }
    return Math.floor(value1 / (value1 + value2) * 100).toString() + '%';
}

</script>
