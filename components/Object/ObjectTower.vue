<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="18" height="18" viewBox="0 1 34 34" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g><path style="opacity:0.735" fill="#0a192d" d="M 15.5,2.5 C 21.267,4.25108 25.6003,7.91775 28.5,13.5C 26.2206,18.9397 24.7206,24.6063 24,30.5C 19.6667,33.1667 15.3333,33.1667 11,30.5C 10.1371,24.6455 8.63711,18.9788 6.5,13.5C 9.14513,9.52363 12.1451,5.85697 15.5,2.5 Z"/></g>
        <g><path style="opacity:1" :fill="color" d="M 16.5,6.5 C 19.9188,7.04218 21.5855,9.04218 21.5,12.5C 23.3547,12.272 24.1881,12.9387 24,14.5C 22.1038,16.5299 19.9371,18.1966 17.5,19.5C 14.5677,18.2003 12.2344,16.2003 10.5,13.5C 11.325,12.6143 12.325,12.281 13.5,12.5C 13.0283,9.64207 14.0283,7.64207 16.5,6.5 Z"/></g>
        <g><path style="opacity:1" fill="#0b1b2f" d="M 16.5,9.5 C 18.9118,9.69408 19.9118,11.0274 19.5,13.5C 18.1667,13.5 16.8333,13.5 15.5,13.5C 15.4326,12.0413 15.7659,10.7079 16.5,9.5 Z"/></g>
        <g><path style="opacity:1" :fill="color" d="M 12.5,18.5 C 14.1477,19.8098 15.8144,21.1431 17.5,22.5C 19.1487,21.3523 20.6487,20.019 22,18.5C 21.7988,21.7772 21.6321,25.1105 21.5,28.5C 18.8333,28.5 16.1667,28.5 13.5,28.5C 13.5405,25.1194 13.2071,21.7861 12.5,18.5 Z"/></g>
    </svg>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        default: '#818cf8'
    }
})
</script>