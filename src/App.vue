<template>
	<div id="app" class="container mt-5 pt-5">
		<header class="text-center">
			<h1 class="h3 mb-4">
				&mdash;
				<svg
					width="1em"
					height="1em"
					viewBox="0 0 16 16"
					class="bi bi-search mr-2"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
					/>
					<path
						fill-rule="evenodd"
						d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
					/></svg
				>Search Bar Component &mdash;
			</h1>
		</header>
		<SearchBar
			:custom-class="searchBarClass"
			@clear-search-results="handleUserSelection"
			input-label="Search for a user"
			input-placeholder="Search for a user by first or last name ..."
			:results="filteredUsers"
			@result-selected="handleUserSelection($event)"
			:show-label="false"
			@search-input="handleSearchInput($event)"
		>
			<template v-slot="slotProps">
				<AutoCompleteItem :item="slotProps.item" />
			</template>
		</SearchBar>
		<router-view />
	</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import SearchBar from '@/components/SearchBar';
import AutoCompleteItem from '@/components/shared/AutoCompleteItem';

export default {
	data() {
		return { searchBarClass: 'm-auto' };
	},
	components: {
		AutoCompleteItem,
		SearchBar
	},
	created() {
		this.fetchUsers(this.$route.params.id);
	},
	computed: {
		...mapState(['filteredUsers', 'searchResults'])
	},
	methods: {
		...mapActions(['fetchUsers']),
		...mapMutations([
			'RESET_MESSAGE',
			'SET_FILTERED_USERS',
			'SET_SELECTED_USER',
			'SET_MESSAGE'
		]),
		handleUserSelection,
		handleClearSearchResults,
		handleSearchInput
	},
	watch: {
		'$route.params.id'(id) {
			if (id) {
				this.SET_SELECTED_USER(id);
			}
		}
	}
};

/**
 * Clears search results
 * @param searchTerm - search term
 */
function handleSearchInput(searchTerm) {
	if (searchTerm.length >= 3) {
		const matches = this.searchResults.filter(user => {
			const firstName = user.name.first.toLowerCase();
			const lastName = user.name.first.toLowerCase();
			return (
				firstName.includes(searchTerm) || lastName.includes(searchTerm)
			);
		});

		if (!matches.length) {
			this.SET_MESSAGE({
				content: 'No results were found'
			});
		} else {
			this.RESET_MESSAGE();
		}

		this.SET_FILTERED_USERS(matches.slice(0, 10));
	} else {
		this.SET_FILTERED_USERS([]);
	}
}

/**
 * Clears search results
 */
function handleClearSearchResults() {
	this.SET_FILTERED_USERS([]);
}

/**
 * Handles result/user selection
 * @param user - selected user data
 */
function handleUserSelection(user) {
	if (!user) {
		return;
	}
	this.$router.push({ name: 'user', params: { id: user.id.value } });
	this.SET_FILTERED_USERS([]);
}
</script>

<style lang="scss" scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	/deep/.search-bar {
		max-width: 450px;
	}
}
</style>
