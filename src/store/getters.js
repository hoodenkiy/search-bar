/**
 * Returns max 10 users if match found
 */
export const searchUsers = state => searchTerm => {
	if (!searchTerm) {
		return [];
	}

	const matches = state.searchResults.filter(user => {
		const firstName = user.name.first.toLowerCase();
		const lastName = user.name.first.toLowerCase();
		const term = searchTerm.toLowerCase();
		return firstName.includes(term) || lastName.includes(term);
	});

	return matches.slice(0, state.limitUsers);
};
