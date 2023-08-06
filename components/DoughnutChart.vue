<template>
    <div>
        <div class="text-zinc-500 text-sm flex justify-center gap-x-[0.3rem]">
            <span>{{ win + loss }}전</span>
            <div class="flex gap-x-[1.5px]">
                <span>{{ win }}승</span>
                <span>{{ loss }}패</span>
            </div>
   
        </div>
        <div class="hidden md:block">
            <div class="relative flex justify-center">
                <svg width="120" height="120">
                    <circle  cx="60" cy="60" r="40" stroke-width="25" fill="none" stroke="#fca5a5"/>
                    <circle  cx="60" cy="60" r="40" fill="none" stroke="#93c5fd"
                    stroke-width="25" :stroke-dasharray="stroke_dasharray1" :stroke-dashoffset="storke_dashoffset1" />
                </svg>
                <div class="absolute inset-x-15 top-12 text-base font-medium text-zinc-500">{{ percent }}%</div>
            </div>
        </div>
        <div class="md:hidden">
            <div class="relative flex justify-center">
                <svg width="80" height="80">
                    <circle  cx="40" cy="40" r="28" stroke-width="18" fill="none" stroke="#fca5a5"/>93c5fd
                    <circle  cx="40" cy="40" r="28" fill="none" stroke="#93c5fd"
                    stroke-width="18" :stroke-dasharray="stroke_dasharray2" :stroke-dashoffset="storke_dashoffset2" />
                </svg>
                <div class="absolute inset-x-15 top-[1.9rem]  text-sm font-medium text-zinc-500">{{ percent }}%</div>
            </div>
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


const stroke_dasharray1 = ref();
const storke_dashoffset1 = ref();
const stroke_dasharray2 = ref();
const storke_dashoffset2 = ref();

const percent = ref(Math.floor(props.win / (props.win + props.loss) * 100));
caculateStroke(percent.value);

// watch(() => props.win, (newValue) => {
watch(() => [props.win, props.loss], ([newWin, newLoss]) => {
    // percent.value = Math.floor(props.win / (props.win + props.loss) * 100);
    percent.value = Math.floor(newWin / (newWin + newLoss) * 100);
    caculateStroke(percent.value);
    console.log(percent.value)
});


function caculateStroke(percent) {
    const percentDivde = percent / 100;
    const RADIUS = 40;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const x11 = CIRCUMFERENCE * percentDivde;
    const x12 = CIRCUMFERENCE * (1 - percentDivde);

    const RADIUS2 = 28;
    const CIRCUMFERENCE2 = 2 * Math.PI * RADIUS2;
    const x21 = CIRCUMFERENCE2 * percentDivde;
    const x22 = CIRCUMFERENCE2 * (1 - percentDivde);

    stroke_dasharray1.value = String(x11) + ' ' + String(x12);
    storke_dashoffset1.value = CIRCUMFERENCE * 0.25;
    stroke_dasharray2.value = String(x21) + ' ' + String(x22);
    storke_dashoffset2.value = CIRCUMFERENCE2 * 0.25;
}
</script>

