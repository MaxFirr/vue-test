<template>
	<table>
		<tr>
			<th>№</th>
			<th>Имя клиента</th>
			<th>
				Адрес
				<button class="sorting" :class="{ [sorting.type]: sorting.key == 'address' }"
					@click="() => onSorting('address')">
					<svg width="16" height="16" viewBox="0 0 16 16">
						<path fill-rule="evenodd"
							d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
					</svg>
				</button>
			</th>
			<th>
				Дата заказа
				<button class="sorting" :class="{ [sorting.type]: sorting.key == 'date' }" @click="() => onSorting('date')">
					<svg width="16" height="16" viewBox="0 0 16 16">
						<path fill-rule="evenodd"
							d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
					</svg>
				</button>
			</th>
			<th>Статус</th>
			<th>Комментарий</th>
			<th v-if="user?.role === 'ADMIN'"></th>
		</tr>
		<tr v-for="order in sortingOrders" :key="order.id" :class="{ 'success': order.status == 'Выполнен' }">
			<td>{{ order.id }}</td>
			<td>{{ order.name }}</td>
			<td>{{ order.address }}</td>
			<td>{{ order.date }}</td>
			<td>{{ order.status }}</td>
			<td>{{ order.comment }}</td>
			<td class="controls" v-if="user?.role === 'ADMIN'">
				<button v-if="order.status === 'Новый'" class="button" @click="() => onStatusUpdate(order)">
					<svg width="20" height="20" viewBox="0 0 16 16">
						<path
							d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
					</svg>
				</button>
				<button class="button" @click="() => onModal(order.id)">
					<svg width="20" height="20" viewBox="0 0 16 16">
						<path
							d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
					</svg>
				</button>
			</td>
		</tr>
	</table>

	<div class="modal" v-if="isModal" @click.self="isModal = false">
		<div class="modal-content">
			<p>Вы действительно хотите удалить {{ orderDeleteId }} заказ?</p>
			<div class="modal-buttons">
				<AppButton @click="onDeleteOrder">Ок</AppButton>
				<AppButton @click="isModal = false">Отмена</AppButton>
			</div>
		</div>
	</div>
</template>

<script setup>
import AppButton from '@/components/UI/AppButton.vue';
import { onMounted, computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isModal = ref(false);
const orderDeleteId = ref(null);
const sorting = reactive({
	key: null,
	type: 'ASC',
});

const monthsRu = computed(() => store.getters.months);
const user = computed(() => store.getters.user);

const getDate = (dateString) => {
	const dateArray = dateString.split(' ');
	return new Date(dateArray[2], monthsRu.value.indexOf(dateArray[1]), dateArray[0]);
}

const orders = computed(() => store.getters.orders);
const sortingOrders = computed(() => {
	switch (sorting.key) {
		case 'address': {
			return orders.value.sort((a, b) => sorting.type == 'ASC'
				? a.address.localeCompare(b.address)
				: b.address.localeCompare(a.address)
			);
		}
		case 'date': {
			return orders.value.sort((a, b) => {
				const dateA = getDate(a.date);
				const dateB = getDate(b.date);
				return sorting.type == 'ASC'
					? dateA.getTime() - dateB.getTime()
					: dateB.getTime() - dateA.getTime()
			});
		}
		default: return orders.value;
	}
});

const onSorting = (key) => {
	if (sorting.key == key) {
		switch (sorting.type) {
			case 'ASC': sorting.type = 'DESC'; break;
			case 'DESC': sorting.key = null; break;
			default: sorting.type = 'ASC';
		}
	} else {
		sorting.key = key;
		sorting.type = 'ASC';
	}
}

const onStatusUpdate = (order) => {
	order.status = 'Выполнен';
	store.dispatch('updateOrder', order);
}

const onModal = (id) => {
	isModal.value = true;
	orderDeleteId.value = id;
}

const onDeleteOrder = () => {
	store.dispatch('deleteOrder', orderDeleteId.value);
	orderDeleteId.value = null;
	isModal.value = false;
}

onMounted(() => {
	store.dispatch('fetchOrders');
});
</script>

<style lang="scss" scoped>
table {
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;

	td,
	th {
		text-align: left;
		padding: 16px 12px;

		&.controls {
			text-align: end;
		}

		.sorting {
			cursor: pointer;
			margin-left: 4px;

			svg {
				opacity: 0.5;
			}

			&.ASC svg {
				opacity: 1;
			}

			&.DESC svg {
				opacity: 1;
				transform: rotate(180deg);
			}
		}
	}

	tr {
		border: 1px solid #000;

		&.success {
			color: #878787;
		}
	}
}

.button {
	cursor: pointer;
	margin-left: 4px;
}

.modal {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.35);

	&-content {
		width: 344px;
		padding: 32px;
		display: grid;
		gap: 16px;
		background-color: #f0f0f0;
	}

	&-buttons {
		display: flex;
		justify-content: space-around;
	}
}
</style>
