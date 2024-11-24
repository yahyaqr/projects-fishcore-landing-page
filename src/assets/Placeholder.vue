<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="computedWidth" :height="computedHeight" viewBox="0 0 150 50"
        preserveAspectRatio="none">
        <!-- SVG Content -->
        <rect width="100%" height="100%" fill="#ddd" />
        <text x="50%" y="50%" fill="#888" font-family="Arial, sans-serif" font-size="14" dominant-baseline="middle"
            text-anchor="middle">
            Placeholder
        </text>
    </svg>
</template>

<script>
export default {
    name: "Placeholder",
    props: {
        width: {
            type: [String, Number],
            default: "150", // Default width
        },
        height: {
            type: [String, Number],
            default: "50", // Default height
        },
    },
    computed: {
        computedWidth() {
            return this.width + (isNaN(this.width) ? "" : "px");
        },
        computedHeight() {
            return this.height + (isNaN(this.height) ? "" : "px");
        },
    },
};
</script>