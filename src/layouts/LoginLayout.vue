<template>
    <div class="wrapper">
        <div class="wrapper-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;

    &-content {
        margin: 40px 0;
    }
}
</style>