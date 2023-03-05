<template>
    <div class="login">
        <AppInput v-model="login" placeholder="Логин" />
        <AppInput v-model="password" type="password" placeholder="Пароль" />
        <AppButton @click="onLogin">Войти</AppButton>
        <p class="login-error" v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import AppInput from '@/components/UI/AppInput.vue';
import AppButton from '@/components/UI/AppButton.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const login = ref('');
const password = ref('');
const error = ref('');

const onLogin = async () => {
    if (!login.value || !password.value) {
        error.value = 'Поля не заполнены';
        return;
    }

    if (password.value.length < 8) {
        error.value = 'Пароль должен содержать не менее 8 символов';
        return;
    }

    const result = await store.dispatch('loginUser', {
        login: login.value,
        password: password.value,
    });

    login.value = '';
    password.value = '';

    if (!result) {
        error.value = 'Неверный логин/\пароль';
        return;
    }

    router.push({ name: 'OrderView' });
}
</script>

<style lang="scss" scoped>
.login {
    width: 344px;
    padding: 50px 35px;
    display: grid;
    gap: 16px;
    background-color: #f0f0f0;

    &-error {
        color: red;
    }
}
</style>