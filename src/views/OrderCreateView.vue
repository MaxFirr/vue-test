<template>
    <div class="order">
        <h2>Добавить заказ</h2>
        <AppInput placeholder="Введите ваше имя" v-model="order.name" />
        <AppInput placeholder="Введите ваш адрес" v-model="order.address" />
        <AppInput placeholder="Комментарий" v-model="order.comment" />
        <AppButton @click="onCreate">Добавить заказ</AppButton>
        <p class="order-error" v-if="error">{{ error }}</p>
    </div>
</template>

<script setup>
import AppButton from '@/components/UI/AppButton.vue';
import AppInput from '@/components/UI/AppInput.vue';
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const error = ref('');

const monthsRu = computed(() => store.getters.months);
const user = computed(() => store.getters.user);

const order = reactive({
    name: user.value.name,
    address: '',
    comment: '',
    status: 'Новый',
    date: null,
});

const onCreate = () => {
    if (!order.name || !order.address) {
        error.value = 'Поля не заполнены';
        return;
    }

    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    order.date = `${day} ${monthsRu.value[date.getMonth()]} ${date.getFullYear()}`;

    store.dispatch('addOrder', order);

    order.name = user.value.name;
    order.address = '';
    order.comment = '';
    error.value = '';
}
</script>

<style lang="scss" scoped>
.order {
    max-width: 192px;
    display: grid;
    gap: 16px;

    &-error {
        color: red;
    }
}
</style>