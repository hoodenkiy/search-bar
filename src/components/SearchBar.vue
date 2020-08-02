<template>
	<div :class="[customClass, 'search-bar']">
		<div class="search-bar-input w-100">
			<label :for="inputId" :class="{ 'sr-only': !showLabel }">{{
				inputLabel
			}}</label>
			<input
				aria-owns="results-list"
				autocomplete="off"
				class="form-control form-control-lg"
				:class="{ 'rounded-top': showAutoComplete }"
				@focus="handleInputFocus"
				@input="handleSearch($event)"
				@keydown="handleKeys"
				:id="inputId"
				:placeholder="inputPlaceholder"
				v-model="searchText"
			/>
		</div>
		<AutoCompleteList
			@click-out="clearSearchResults"
			@keyboard-navigation="handleKeys"
			:results="results"
			:search-input-id="inputId"
			@result-selected="handleResultSelection($event)"
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
		},
		inputLabel: {
			type: String,
			default: 'Search'
		},
		inputId: {
			type: String,
			default: 'search-input'
		},
		inputPlaceholder: {
			type: String
		},
		results: {
			type: Array
		},
		showLabel: {
			type: Boolean
		}
	},
	components: {
		AutoCompleteList,
		Message
	},
	computed: {
		...mapState(['searchResults', 'message']),
		showAutoComplete() {
			return this.results.length > 0;
		}
	},
	methods: {
		...mapMutations(['SHOW_USER_PROFILE', 'SET_FILTERED_USERS']),
		clearSearchResults,
		handleKeys,
		handleSearch: _.debounce(handleSearchInput, 600),
		handleResultSelection,
		handleInputFocus,
		handleItem
	}
};

/**
 * Clears search results, and sets focus back to the input
 */
function clearSearchResults() {
	this.searchText = '';
	this.$emit('clear-search-results');
	this.$nextTick(() => {
		document.getElementById(this.inputId).focus();
	});
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

	const isValidKey = [40, 38, 27, 9].includes(event.keyCode);
	const resultsList = document.getElementById(`${this.inputId}-results-list`);

	if (resultsList && isValidKey) {
		if (event.keyCode === keys.esc || event.keyCode === keys.tab) {
			this.clearSearchResults();
		}
		const list = [...resultsList.children];
		const firstItem = list[0];
		const lastItem = list[list.length - 1];
		const listLength = list.length;
		const focusedIndex = list.indexOf(document.activeElement);

		const isLastItem = focusedIndex === list.length - 1;
		const isFirstItem = focusedIndex === 0;

		const nextItem = list[focusedIndex + 1];
		const prevItem = list[focusedIndex - 1];

		document.activeElement.classList.remove('active');

		if (focusedIndex === -1 || isLastItem) {
			this.handleItem(firstItem);
		}

		if (event.keyCode === keys.arrrowDown && listLength > 1 && nextItem) {
			this.handleItem(nextItem);
		}

		if (event.keyCode === keys.arrrowUp && listLength > 1 && isFirstItem) {
			this.handleItem(lastItem);
		}

		if (event.keyCode === keys.arrrowUp && listLength > 1 && prevItem) {
			this.handleItem(prevItem);
		}
	}
}

/**
 * Focuses an item and adds focus
 * @param item - selected user data
 */
function handleItem(item) {
	item.focus();
	item.classList.add('active');
}

/**
 * Handles focus input
 */
function handleInputFocus() {
	this.searchText = '';
	this.$emit('search-input-focused');
}

/**
 * Handles result/user selection
 * @param result - selected user data
 */
function handleResultSelection(result) {
	if (!result) {
		return;
	}
	this.searchText = '';
	this.$emit('result-selected', result);
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

	this.$emit('search-input', event.target.value);
	this.searchText = event.target.value.toLowerCase();
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
