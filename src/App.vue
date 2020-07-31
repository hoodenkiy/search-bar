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
		<SearchBar :custom-class="searchBarClass" />
		<UserProfile v-if="showUserProfile" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';

export default {
	data() {
		return { searchBarClass: 'm-auto' };
	},
	components: {
		SearchBar,
		UserProfile
	},
	created() {
		this.fetchUsers();
	},
	computed: {
		...mapState(['showUserProfile'])
	},
	methods: {
		...mapActions(['fetchUsers'])
	}
};
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
