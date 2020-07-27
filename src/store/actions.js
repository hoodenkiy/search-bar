import axios from 'axios';
import * as mutationTypes from './mutation-types';

const API_BASE_URL = 'https://randomuser.me/api';
const limit = 100;

export const fetchUsers = ({ commit }) => {
	return axios
		.get(`${API_BASE_URL}/?results=${limit}&seed=foobar?inc=name,phone`)
		.then(response => {
			if (response.data && response.data.results) {
				commit(mutationTypes.SET_SEARCH_RESULTS, response.data.results);
			}
		})
		.catch(error => {
			handleErrors(error);
		});
};

/**
 * Handles errors for api calls
 * @param {Error} error
 */
function handleErrors(error) {
	console.log('error', error);
}
