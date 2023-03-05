import { createStore } from 'vuex'

export default createStore({
    state: {
        orders: [],
        months: [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
        ],
        user: null,
    },

    getters: {
        orders(state) {
            return state.orders;
        },
        months(state) {
            return state.months;
        },
        user(state) {
            return state.user;
        }
    },

    mutations: {
        setOrders(state, payload) {
            state.orders = payload;
        },
        addOrder(state, payload) {
            state.orders.push(payload);
        },
        deleteOrder(state, payload) {
            state.orders = state.orders.filter(order => order.id != payload);
        },
        setUser(state, payload) {
            state.user = payload;
        },
        logoutUser(state) {
            state.user = null;
        }
    },

    actions: {
        async fetchOrders({ state, commit }) {
            if (state.orders.length) return;
            try {
                const response = await fetch('http://localhost:3000/events');
                const orders = await response.json();
	            commit('setOrders', orders);
            } catch (e) {
                alert('Ошибка');
            }
        },

        async addOrder({ state, commit }, order) {
            try {
                const response = await fetch('http://localhost:3000/events', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(order),
                });
                const newOrder = await response.json();
                commit('addOrder', newOrder);
            } catch (e) {
                alert('Ошибка');
            }
        },

        async updateOrder({ state, commit }, order) {
            try {
                const response = await fetch(`http://localhost:3000/events/${order.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(order),
                });
            } catch (e) {
                alert('Ошибка');
            }
        },

        async deleteOrder({ state, commit }, id) {
            try {
                const response = await fetch(`http://localhost:3000/events/${id}`, {
                    method: 'DELETE',
                });
                commit('deleteOrder', id);
            } catch (e) {
                alert('Ошибка');
            }
        },

        async loginUser({ state, commit }, { login, password }) {
            try {
                const response = await fetch(`http://localhost:3000/users?user=${login}&password=${password}`);
                const [user] = await response.json();
                if (user) {
                    commit('setUser', user);
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                alert('Ошибка');
            }
        },

        logoutUser({ state, commit }) {
            commit('logoutUser');    
        }
    },

    modules: {
    }
})
