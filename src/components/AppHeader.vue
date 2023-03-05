<template>
    <header class="header">
        <div class="header-links">
            <router-link :to="{ name: 'OrderView' }">Все заказы</router-link>
            <router-link v-if="user?.role === 'ADMIN'" :to="{ name: 'OrderCreateView' }">Добавить заказ</router-link>
        </div>
        <div class="header-profile">
            <span class="header-username">{{ user?.name }}</span>
            <AppButton @click="onLogout">Выйти</AppButton>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AppButton from './UI/AppButton.vue';

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.user);

const onLogout = () => {
    store.dispatch('logoutUser');
    router.push({ name: 'LoginView' });
}
</script>

<style lang="scss" scoped>
.header {
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #165996;
    font-size: 14px;

    &-profile,
    &-links {
        display: flex;
        align-items: center;
        gap: 32px;

        a {
            color: #FFFFFF;
        }
    }
}
</style>