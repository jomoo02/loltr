<template>
    <div>
        <div class="text-zinc-500 text-xxxs xs:text-xs sm:text-sm flex justify-center gap-x-px xs:gap-x-[0.2rem] sm:gap-x-[0.3rem]">
            {{ win + loss }}전
            <div class="flex gap-x-px xs:gap-x-[1.5px]">
                <span>{{ win }}승</span> 
                <span>{{ loss }}패</span>
            </div>
        </div>
        <div class="relative flex justify-center xs:hidden">
            <svg width="68" height="68">
                <circle cx="34" cy="34" r="17" stroke-width="13" fill="none" stroke="#fca5a5"/>
                <circle cx="34" cy="34" r="17" fill="none" stroke="#93c5fd" stroke-width="13" :stroke-dasharray="stroke_dasharray" :stroke-dashoffset="storke_dashoffset" />
            </svg>
            <div class="text_percent top-[1.75rem] text-xxxs">{{ percent }}%</div>
        </div>
        <div class="relative hidden xs:flex sm:hidden justify-center">
            <svg width="84" height="84">
                <circle cx="42" cy="42" r="21" stroke-width="15" fill="none" stroke="#fca5a5" />
                <circle cx="42" cy="42" r="21" fill="none" stroke="#93c5fd" stroke-width="15" :stroke-dasharray="stroke_dasharray_xs" :stroke-dashoffset="storke_dashoffset_xs" />
            </svg>
            <div class="text_percent top-[2.17rem] text-xxs">{{ percent }}%</div>
        </div>
        <div class="relative hidden sm:flex md:hidden justify-center">
            <svg width="108" height="108">
                <circle cx="54" cy="54" r="27" stroke-width="20" fill="none" stroke="#fca5a5" />
                <circle cx="54" cy="54" r="27" fill="none" stroke="#93c5fd" stroke-width="20" :stroke-dasharray="stroke_dasharray_sm" :stroke-dashoffset="storke_dashoffset_sm" />
            </svg>
            <div class="text_percent top-[2.7rem] text-sm">{{ percent }}%</div>
        </div>
        <div class="relative hidden md:flex justify-center">
            <svg width="120" height="120">
                <circle cx="60" cy="60" r="40" stroke-width="25" fill="none" stroke="#fca5a5" />
                <circle cx="60" cy="60" r="40" fill="none" stroke="#93c5fd" stroke-width="25" :stroke-dasharray="stroke_dasharray_md" :stroke-dashoffset="storke_dashoffset_md" />
            </svg>
            <div class="text_percent top-12 text-base">{{ percent }}%</div>
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


const stroke_dasharray = ref();
const stroke_dasharray_xs = ref();
const stroke_dasharray_sm = ref();
const stroke_dasharray_md = ref();
const storke_dashoffset = ref();
const storke_dashoffset_xs = ref();
const storke_dashoffset_sm = ref();
const storke_dashoffset_md = ref();

const percent = ref(Math.floor(props.win / (props.win + props.loss) * 100));
[stroke_dasharray.value, storke_dashoffset.value] = calculateStrokeData(percent.value, 17);
[stroke_dasharray_xs.value, storke_dashoffset_xs.value] = calculateStrokeData(percent.value, 21);
[stroke_dasharray_sm.value, storke_dashoffset_sm.value] = calculateStrokeData(percent.value, 27);
[stroke_dasharray_md.value, storke_dashoffset_md.value] = calculateStrokeData(percent.value, 40);


watch(() => [props.win, props.loss], ([newWin, newLoss]) => {
    percent.value = Math.floor(newWin / (newWin + newLoss) * 100);
    [stroke_dasharray.value, storke_dashoffset.value] = calculateStrokeData(percent.value, 17);
    [stroke_dasharray_xs.value, storke_dashoffset_xs.value] = calculateStrokeData(percent.value, 21);
    [stroke_dasharray_sm.value, storke_dashoffset_sm.value] = calculateStrokeData(percent.value, 27);
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
.text_percent {
    @apply absolute font-medium text-zinc-500;
}
</style>