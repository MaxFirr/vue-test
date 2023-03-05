<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.button {
    width: fit-content;
    height: 34px;
    padding: 0 30px;
    cursor: pointer;
    background-color: #FFFEFE;
    border: 1px solid #000000;
}
</style>