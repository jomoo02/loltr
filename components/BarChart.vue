<template>
    <div>
        <div class="block sm:hidden">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                :width="375"
                :height="300"
            />
        </div>

        <div class="hidden md:block lg:hidden">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                :width="600"
                :height="400"
            />
        </div>

        <div class="hidden lg:block xl:hidden">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                :width="900"
                :height="450"
            />
        </div>

        <div class="hidden xl:block">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                :width="900"
                :height="450"
            />
        </div>

    </div>

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