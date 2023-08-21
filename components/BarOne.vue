<template>
    <div class="w-full">
        <div class="lg:hidden">
            <svg width='100%' :height=smallSizeHeight>
            <g class='bars'>
                <rect :fill=barColor2 width='100%' :height='smallSizeHeight' rx="1"></rect>
                <rect :fill=barColor1 :width='barWidth' :height='smallSizeHeight' rx="1"></rect>
            </g>
            </svg>
        </div>
        <div class="hidden lg:block">
            <svg width='100%' :height=height>
            <g class='bars'>
                <rect :fill=barColor2 width='100%' :height='height' :rx="rx"></rect>
                <rect :fill=barColor1 :width='barWidth' :height='height' :rx="rx"></rect>
            </g>
            </svg>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    barColor1: {
        type: String,
        default: '#93c5fd'
    },
    barColor2: {
        type: String,
        default: '#fca5a5'
    },
    barWidth: {
        type: String,
        default: '20%'
    },
    smallSizeHeight: {
        type: String,
        default: '11.5'
    },
    height: {
        type: String,
        default: '7'
    },
    rx: {
        type: String,
        default: '1'
    }
});

</script>