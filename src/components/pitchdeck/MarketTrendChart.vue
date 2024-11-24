<template>
    <canvas ref="chartRef" style="width: 100%; height: 400px;"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    chartData: {
        type: Object,
        required: true
    }
});

const chartRef = ref(null);

const drawChart = (data) => {
    const canvas = chartRef.value;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    // Define chart dimensions and padding
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Extract data
    const labels = data.labels;
    const values = data.datasets[0].data;

    // Calculate max value and scaling factor
    const maxValue = Math.max(...values) * 1.1;
    const yScale = chartHeight / maxValue;

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y-axis labels and gridlines
    const step = maxValue / 5;
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#666';
    for (let i = 0; i <= 5; i++) {
        const y = height - padding - (step * i * yScale);
        ctx.fillText((step * i).toFixed(0), padding - 10, y + 4);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw X-axis labels
    const xStep = chartWidth / (labels.length - 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    labels.forEach((label, i) => {
        const x = padding + i * xStep;
        ctx.fillText(label, x, height - padding + 20);
    });

    // Plot the data
    ctx.strokeStyle = data.datasets[0].borderColor || '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    values.forEach((value, i) => {
        const x = padding + i * xStep;
        const y = height - padding - value * yScale;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = data.datasets[0].pointBackgroundColor || '#007bff';
    values.forEach((value, i) => {
        const x = padding + i * xStep;
        const y = height - padding - value * yScale;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
};

onMounted(() => {
    drawChart(props.chartData);
});

watch(() => props.chartData, (newData) => {
    drawChart(newData);
}, { deep: true });
</script>