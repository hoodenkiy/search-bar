<template>
	<div id="app" class="container my-5">
		<SearchBar />
		<UserProfile v-if="showUserProfile" />
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchBar from '@/components/SearchBar';
import UserProfile from '@/components/UserProfile';

export default {
	components: {
		SearchBar,
		UserProfile
	},
	created() {
		this.fetchUsers({});
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
}
</style>
