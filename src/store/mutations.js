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

	[mutationTypes.SHOW_USER_PROFILE](state, payload) {
		state.showUserProfile = payload;
	},

	[mutationTypes.SET_FILTERED_USERS](state, payload = []) {
		state.filteredUsers = payload;
	},

	[mutationTypes.SET_SELECTED_USER](state, payload) {
		if (!payload) {
			return;
		}

		state.selectedUser = payload;
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
