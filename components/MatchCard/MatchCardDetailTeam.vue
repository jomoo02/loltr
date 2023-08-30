<template>
    <div class="flex flex-col">
        <!-- info -->
        <div class="flex justify-between items-center text-sm text-gray-500 border-b border-b-inherit px-1 xs:px-2 sm:px-5 lg:px-6 xl:px-2 py-0.5 bg-white border-t border-t-inherit"
            :class="{ 'border-slate-500/60': redo, 'border-win/50': win, 'border-loss/50': loss }"
        >
            <div class="flex items-center">
                <div class="lg:w-[13.5rem] flex justify-center gap-x-1 text-xxs xs:text-xs sm:text-sm lg:text-base">
                    <span class="font-semibold" :class="{ 'text-slate-500': redo, 'text-wintext': win, 'text-losstext': loss }">{{ gameResult }}</span>
                    <span>{{ team }}</span>
                </div>
                <div class="w-[6rem] xl:w-[5.25rem] hidden lg:flex justify-center">KDA</div>
            </div>
            <div class="hidden lg:flex">
                <div class="w-[8.4rem] xl:w-[8.8rem] flex justify-center px-4">피해량</div>
                <div class="w-[3.3rem] flex justify-center">와드</div>
                <div class="w-[5.05rem] flex justify-center">cs</div>
                <div class="w-[11.25rem] flex justify-center">아이템</div>
            </div>
        </div>
        <div v-for="(participant, index) in participants" :key="index">
            <MatchCardDetailParticipant 
                :gameResult="gameResult"
                :participant="participant"
                :team="team"
                :index="index"
                :gameDuration="gameDuration"
                :puuid="puuid"
                :maxDamageDTO="maxDamageDTO"
            />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    team: {
        type: String,
        default: '블루팀'
    },
    puuid: {
        type: String
    },
    gameDuration: {
        type: String
    },
    maxDamageDTO: {
        type: Object
    },
    gameResult: {
        type: String,
        default: '승리'
    },
    participants: {
        type: Array
    },
});

const win = ref(false);
const loss = ref(false);
const redo = ref(false);

checkGameResult(props.gameResult);

function checkGameResult(gameResult) {
    if (gameResult === '승리') {
        win.value = true;
    }
    else if (gameResult === '패배') {
        loss.value = true;
    }
    else if (gameResult === '다시하기') {
        redo.value = true;
    }
}

</script>
