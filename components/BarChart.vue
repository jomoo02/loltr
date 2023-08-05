<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        :width="width"
        :height="height"
    />
</template>
    
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartData: {
            type: Object,
            default: {
                labels: [ 'January', 'February', 'March' ],
                datasets: [ { data: [40, 20, 12] } ]
            }
        },
        chartOptions: {
            type: Object,
            default: {
                responsive: false
            }
        },
        width: {
            type: Number,
            // default: 900
            default: 375
        },
        height: {
            type: Number,
            default: 350
        }
    }
}
</script>