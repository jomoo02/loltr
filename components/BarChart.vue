<template>
    <div>
        <div class="block xs:hidden">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                :width="250"
                :height="250"
            />
        </div>
        <div class="hidden xs:block sm:hidden">
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
                :width="350"
                :height="300"
            />
        </div>
        <div class="hidden sm:block lg:hidden">
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
                :width="700"
                :height="425"
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
            default() {
                return {
                    labels: [ 'January', 'February', 'March' ],
                    datasets: [ { data: [40, 20, 12] } ]
                }
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
            default: 375
        },
        height: {
            type: Number,
            default: 350
        }
    },
}


</script>