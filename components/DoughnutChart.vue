<template>
    <div>
        <div class="record_text">
            {{ win + loss }}전
            <div class="flex gap-x-px xs:gap-x-[1.5px]">
                <span>{{ win }}승</span> 
                <span>{{ loss }}패</span>
            </div>
        </div>

        <div class="relative flex justify-center xs:hidden">
            <svg width="60" height="60">
                <circle cx="30" cy="30" r="15" stroke-width="11" fill="none" stroke="#fca5a5"/>
                <circle cx="30" cy="30" r="15" fill="none" stroke="#93c5fd" stroke-width="11" :stroke-dasharray="stroke_dasharray_xs" :stroke-dashoffset="storke_dashoffset_xs" />
            </svg>
            <div class="percent_text top-[1.45rem] text-[0.625rem]">{{ percent }}%</div>
        </div>

        <div class="relative hidden xs:flex md:hidden justify-center">
            <svg width="84" height="84">
                <circle cx="42" cy="42" r="21" stroke-width="15" fill="none" stroke="#fca5a5" />
                <circle cx="42" cy="42" r="21" fill="none" stroke="#93c5fd" stroke-width="15" :stroke-dasharray="stroke_dasharray_sm" :stroke-dashoffset="storke_dashoffset_sm" />
            </svg>
            <div class="percent_text top-[2.17rem] text-[0.6875rem]">{{ percent }}%</div>
        </div>

        <div class="relative hidden md:flex justify-center">
            <svg width="120" height="120">
                <circle cx="60" cy="60" r="40" stroke-width="25" fill="none" stroke="#fca5a5" />
                <circle cx="60" cy="60" r="40" fill="none" stroke="#93c5fd" stroke-width="25" :stroke-dasharray="stroke_dasharray_md" :stroke-dashoffset="storke_dashoffset_md" />
            </svg>
            <div class="percent_text top-12 text-base">{{ percent }}%</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    win: {
        type: Number,
        default: 10
    },
    loss: {
        type: Number,
        default: 10
    }
});


const stroke_dasharray_xs = ref();
const stroke_dasharray_sm = ref();
const stroke_dasharray_md = ref();
const storke_dashoffset_xs = ref();
const storke_dashoffset_sm = ref();
const storke_dashoffset_md = ref();

const percent = ref(Math.floor(props.win / (props.win + props.loss) * 100));
[stroke_dasharray_xs.value, storke_dashoffset_xs.value] = calculateStrokeData(percent.value, 15);
[stroke_dasharray_sm.value, storke_dashoffset_sm.value] = calculateStrokeData(percent.value, 21);
[stroke_dasharray_md.value, storke_dashoffset_md.value] = calculateStrokeData(percent.value, 40);


watch(() => [props.win, props.loss], ([newWin, newLoss]) => {
    percent.value = Math.floor(newWin / (newWin + newLoss) * 100);
    [stroke_dasharray_xs.value, storke_dashoffset_xs.value] = calculateStrokeData(percent.value, 15);
    [stroke_dasharray_sm.value, storke_dashoffset_sm.value] = calculateStrokeData(percent.value, 21);
    [stroke_dasharray_md.value, storke_dashoffset_md.value] = calculateStrokeData(percent.value, 40);
});

function calculateStrokeData(percent, RADIUS) {
    const percentDivde = percent / 100;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const x1 = CIRCUMFERENCE * percentDivde;
    const x2 = CIRCUMFERENCE * (1 - percentDivde);
    const stroke_dasharray = String(x1) + ' ' + String(x2);
    const storke_dashoffset = CIRCUMFERENCE * 0.25;

    return [stroke_dasharray ,storke_dashoffset];
}

</script>

<style scoped>
.record_text {
    @apply text-zinc-500 text-[0.625rem] xs:text-xs sm:text-sm flex justify-center gap-x-px xs:gap-x-[0.2rem] sm:gap-x-[0.3rem];
}
.percent_text {
    @apply absolute font-medium text-zinc-500;
}
</style>