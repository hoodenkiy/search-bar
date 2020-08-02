import * as mutationTypes from './mutation-types';

export default {
	[mutationTypes.SET_SEARCH_RESULTS](state, payload) {
		if (!payload) {
			return;
		}

		state.searchResults = payload.sort((a, b) => {
			if (a.name.last < b.name.last) {
				return -1;
			}

			if (a.name.last > b.name.last) {
				return 1;
			}

			return 0;
		});
	},

	[mutationTypes.SET_FILTERED_USERS](state, payload = []) {
		state.filteredUsers = payload;
	},

	[mutationTypes.SET_SELECTED_USER](state, id) {
		debugger
		const user = state.searchResults.find(user => {
			return user.id.value === id;
		});
		state.selectedUser = {
			id: user.id.value,
			firstName: user.name.first,
			lastName: user.name.last,
			picture: user.picture.large,
			phone: user.phone
		};
	},

	[mutationTypes.SET_MESSAGE](state, payload) {
		if (!payload) {
			return;
		}

		state.message = payload;
	},

	[mutationTypes.RESET_MESSAGE](state) {
		state.message = {};
	}
};
