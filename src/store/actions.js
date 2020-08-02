import axios from 'axios';
import * as mutationTypes from './mutation-types';
import store from './';

const API_BASE_URL = 'https://randomuser.me/api';
const limit = 100;

export const fetchUsers = async({ commit }, userId) => {
	let response;

	try {
		response = await axios.get(
			`${API_BASE_URL}/?results=${limit}&seed=foobar&inc=name,phone,picture,id`
		);
	} catch (error) {
		handleErrors(error);
		return;
	}

	if (response.data && response.data.results) {
		commit(mutationTypes.SET_SEARCH_RESULTS, response.data.results);
		if (userId) {
			commit(mutationTypes.SET_SELECTED_USER, userId);
		}
	}
};

/**
 * Handles errors for api calls
 * @param {Error} error
 */
function handleErrors(error) {
	console.log('error', error);
	store.commit(mutationTypes.SET_MESSAGE, {
		type: 'danger',
		content: error
	});
}
