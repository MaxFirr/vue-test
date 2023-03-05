<template>
    <div class="wrapper">
        <AppHeader />
        <div class="wrapper-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
</script>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-rows: 52px 1fr;

    &-content {
        padding: 32px;
    }
}
</style>