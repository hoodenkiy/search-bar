<template>
	<div id="app" class="container my-5">
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

	/deep/.search-wrapper {
		max-width: 450px;
	}
}
</style>
