<template>
    <div>
        <!-- header -->
        <div class="flex justify-between text-sm text-gray-500 border-b xs:px-2 sm:px-5 lg:px-6 xl:px-2 py-0.5 bg-white"
            :class="{ 'border-slate-500/60': redo, 'border-win/50': win, 'border-loss/50': loss, 'rounded-t-md': placement === '1st', 'border-t border-t-inherit': placement !== '1st' }"
        >
            <div class="flex">
                <div class="w-[13.5rem] font-medium">{{ placement }}</div>
                <div class="lg:w-[6rem] xl:w-[5.25rem] hidden lg:flex justify-center">KDA</div>
            </div>
            
            <div class="hidden lg:flex">
                <div class="w-[8.4rem] xl:w-[8.8rem] px-4 flex justify-center">피해량</div>
                <div class="w-[8.35rem] flex justify-center">골드</div>
                <div class="w-[11.25rem] flex justify-center">아이템</div>
            </div>
        </div>

        <MatchCardArenaDetailParticipant  v-for="(participant, index) in participants" :key="index"
            :placement="placement"
            :puuid="puuid"
            :check-redo="checkRedo"
            :check-win="checkWin"
            :participant="participant"
            :max-damage-dto="maxDamageDto"
        />
   
    </div>
</template>

<script setup>

const props = defineProps({
    placement: {
        type: String
    },
    maxDamageDto: {
        type: Object
    },
    participants: {
        type: Array
    },
    checkRedo: {
        type: Boolean
    },
    checkWin: {
        type: Boolean
    },
    puuid: {
        type: String
    }
})

const redo = ref(props.checkRedo);
const win = ref(props.checkWin);
const loss = ref(!props.checkWin);

</script>

