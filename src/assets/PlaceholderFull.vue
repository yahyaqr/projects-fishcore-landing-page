<template>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 150 50" preserveAspectRatio="none">
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
};
</script>

<style scoped>
/* Ensure the SVG scales to fit the parent container */
svg {
    display: block;
    /* Removes inline SVG gaps */
}
</style>