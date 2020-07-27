<template>
	<div class="search-wrapper">
		<div class="search-input">
			<input
				class="form-control rounded-0 form-control-lg"
				@focus="
					SHOW_USER_PROFILE(false);
					searchText = '';
				"
				@keydown.tab="clearSearchResults"
				@input="handleSearch($event)"
				@keyup.enter="handleSearch($event)"
				@keydown="handleKeys"
				placeholder="Search for a user by first or last name ..."
				ref="searchInput"
				v-model="searchText"
			/>
		</div>
		<div v-if="showAutoComplete" class="shadow-sm">
			<ul class="list-group auto-complete rounded-0" ref="resultsList">
				<li
					class="list-group-item rounded-0"
					@click="handleUserSelection(user)"
					v-for="(user, index) in filteredUsers"
					@keydown="handleKeys"
					:key="`user-${index}`"
					tabindex="0"
					@keydown.enter="handleUserSelection(user)"
				>
					<img
						:alt="`${user.name.first} ${user.name.last}`"
						class="card-img w-auto shadow-sm rounded-circle"
						:src="user.picture.thumbnail"
						v-if="user.picture.thumbnail"
					/>
					<span class="mx-3 strong font-weight-bold">
						{{ user.name.first }}
						{{ user.name.last }}
					</span>
					&mdash; <span class="mx-2">{{ user.phone }}</span>
				</li>
			</ul>
		</div>
		<div
			v-if="showErrorMessage"
			class="alert alert-primary mt-3 rounded-0"
			role="alert"
		>
			No results were found
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			searchText: '',
			showErrorMessage: false
		};
	},
	computed: {
		...mapState(['searchResults', 'filteredUsers']),
		showAutoComplete() {
			return this.filteredUsers.length;
		}
	},
	methods: {
		...mapMutations([
			'SET_SELECTED_USER',
			'SHOW_USER_PROFILE',
			'SET_FILTERED_USERS'
		]),
		clearSearchResults,
		handleKeys,
		handleSearch,
		handleUserSelection
	}
};

/**
 * Clears search results
 */
function clearSearchResults() {
	this.searchText = '';
	this.SET_FILTERED_USERS([]);
	this.showErrorMessage = false;
	this.$nextTick(() => this.$refs.searchInput.focus());
}
/**
 * Handles keyboard navigation
 * @param event - event data
 */
function handleKeys(event) {
	if (!event.keyCode) {
		return;
	}

	const isValidKey = [40, 38, 27].includes(event.keyCode);

	if (this.$refs.resultsList && isValidKey) {
		const keys = {
			arrrowDown: 40,
			arrrowUp: 38,
			esc: 27
		};
		if (event.keyCode === keys.esc) {
			this.clearSearchResults();
		}

		const list = [...this.$refs.resultsList.children];
		const firstItem = list[0];
		const lastItem = list[list.length - 1];
		const listLength = list.length;
		const focusedIndex = list.indexOf(document.activeElement);

		const isLastItem = focusedIndex === list.length - 1;
		const isFirstItem = focusedIndex === 0;

		if (focusedIndex === -1 || isLastItem) {
			firstItem.focus();
		}

		if (event.keyCode === keys.arrrowDown && listLength > 1) {
			list[focusedIndex + 1].focus();
		}

		if (event.keyCode === keys.arrrowUp && listLength > 1 && isFirstItem) {
			lastItem.focus();
		}

		if (event.keyCode === keys.arrrowUp && listLength > 1) {
			list[focusedIndex - 1].focus();
		}
	}
}

/**
 * Handles result/user selection
 * @param user - selected user data
 */
function handleUserSelection(user) {
	if (!user) {
		return;
	}

	this.SET_FILTERED_USERS([]);
	this.searchText = '';
	this.SHOW_USER_PROFILE(true);
	this.SET_SELECTED_USER(user);
}

/**
 * Handles search behavior, validates and sets search text
 * @param event - event data
 */
function handleSearch(event) {
	if (!event && event.target && event.target.value) {
		return;
	}

	if (event.target.value.length > 1) {
		this.searchText = event.target.value.toLowerCase();
		const matches = this.searchResults.filter(user => {
			const firstName = user.name.first.toLowerCase();
			const lastName = user.name.first.toLowerCase();
			return (
				firstName.includes(this.searchText) ||
				lastName.includes(this.searchText)
			);
		});

		if (!matches.length) {
			this.showErrorMessage = true;
		} else {
			this.showErrorMessage = false;
		}

		// this. = false;
		this.SET_FILTERED_USERS(matches.slice(0, 10));
	}
}
</script>

<style lang="scss">
.auto-complete {
	margin-top: -1px;
}
</style>
