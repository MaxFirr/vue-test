<template>
    <input class="input" :type="props.type" :placeholder="placeholder" v-model="text">
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
})

const text = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    height: 34px;
    padding: 0 15px;
    background-color: #FFFEFE;
    border: 1px solid #000000;
}
</style>