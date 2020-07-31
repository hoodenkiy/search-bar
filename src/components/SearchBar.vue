<template>
	<div :class="[customClass, 'search-wrapper']">
		<div class="search-input w-100">
			<label for="search-input" class="sr-only">Search for a user by first or last name</label>
			<input
				aria-owns="results-list"
				autocomplete="off"
				class="form-control form-control-lg"
				:class="{ 'rounded-top': showAutoComplete }"
				@focus="
					SHOW_USER_PROFILE(false);
					searchText = '';
				"
				@input="handleSearch($event)"
				@keydown="handleKeys"
				id="search-input"
				placeholder="Search for a user by first or last name ..."
				ref="searchInput"
				v-model="searchText"
			/>
		</div>
		<AutoCompleteList
			@click-out="clearSearchResults"
			@keyboard-navigation="handleKeys"
			:results="filteredUsers"
			@result-selected="handleUserSelection($event)"
			v-if="showAutoComplete"
		/>
		<Message :message="message" />
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Message from '@/components/shared/Message';
import AutoCompleteList from '@/components/shared/AutoCompleteList';

import _ from 'lodash';
export default {
	data() {
		return {
			searchText: ''
		};
	},
	props: {
		customClass: {
			type: String
		}
	},
	components: {
		AutoCompleteList,
		Message
	},
	computed: {
		...mapState(['searchResults', 'filteredUsers', 'message']),
		showAutoComplete() {
			return this.filteredUsers.length > 0;
		}
	},
	methods: {
		...mapMutations([
			'RESET_MESSAGE',
			'SET_MESSAGE',
			'SET_SELECTED_USER',
			'SHOW_USER_PROFILE',
			'SET_FILTERED_USERS'
		]),
		clearSearchResults,
		handleKeys,
		handleSearch: _.debounce(handleSearchInput, 600),
		handleUserSelection
	}
};

/**
 * Clears search results
 */
function clearSearchResults() {
	this.searchText = '';
	this.SET_FILTERED_USERS([]);
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

	const keys = {
		arrrowDown: 40,
		arrrowUp: 38,
		esc: 27,
		tab: 9
	};
	// debugger;

	const isValidKey = [40, 38, 27, 9].includes(event.keyCode);
	const resultsList = document.getElementById('results-list');

	if (resultsList && isValidKey) {
		if (event.keyCode === keys.esc) {
			this.clearSearchResults();
		}
		const list = [...resultsList.children];
		const firstItem = list[0];
		const lastItem = list[list.length - 1];
		const listLength = list.length;
		const focusedIndex = list.indexOf(document.activeElement);

		const isLastItem = focusedIndex === list.length - 1;
		const isFirstItem = focusedIndex === 0;

		document.activeElement.classList.remove('active');

		if (focusedIndex === -1 || isLastItem) {
			firstItem.focus();
			firstItem.classList.add('active');
		}

		if (
			event.keyCode === keys.arrrowDown &&
			listLength > 1 &&
			list[focusedIndex + 1]
		) {
			list[focusedIndex + 1].focus();
			list[focusedIndex + 1].classList.add('active');
		}

		if (event.keyCode === keys.arrrowUp && listLength > 1 && isFirstItem) {
			lastItem.focus();
			lastItem.classList.add('active');
		}

		if (
			event.keyCode === keys.arrrowUp &&
			listLength > 1 &&
			list[focusedIndex - 1]
		) {
			list[focusedIndex - 1].focus();
			list[focusedIndex - 1].classList.add('active');
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
function handleSearchInput(event) {
	if (
		!event ||
		!event.target ||
		!event.target.value ||
		event.target.value.length > 250
	) {
		return;
	}
	if (event.target.value.length >= 3) {
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
</script>

<style lang="scss">
.auto-complete {
	margin-top: -1px;

	.list-group-item {
		&.active {
			cursor: pointer;
		}
	}
}
</style>
