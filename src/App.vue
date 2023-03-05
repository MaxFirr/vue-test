<template>
	<component :is="layoutComponent"></component>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const layoutComponent = computed(() => {
	const layout = route.meta.layout || 'MainLayout';
	return defineAsyncComponent(() => import(`@/layouts/${layout}.vue`));
})
</script>

<style src="@/assets/styles/reset.scss" lang="scss"></style>