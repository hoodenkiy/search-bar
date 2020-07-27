<template>
	<div :class="[customClass, 'search-wrapper']">
		<div class="search-input">
			<input
				aria-label="Search for a user by first or last name"
				class="form-control rounded-0 form-control-lg"
				@focus="
					SHOW_USER_PROFILE(false);
					searchText = '';
				"
				@input="handleSearch($event)"
				@keydown="handleKeys"
				placeholder="Search for a user by first or last name ..."
				ref="searchInput"
				v-model="searchText"
			/>
		</div>
		<AutoComplete>
		<div
			v-if="showAutoComplete"
			class="shadow-sm"
			v-clickoutside="clearSearchResults"
		>
			<ul class="list-group auto-complete rounded-0" ref="resultsList">
				<li
					class="list-group-item rounded-0"
					:class="{ active: activeResult === index }"
					@click="handleUserSelection(user)"
					v-for="(user, index) in filteredUsers"
					@keydown="handleKeys"
					@mouseover="activeResult = index"
					@mouseout="activeResult = null"
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
		<Message :message="message" />
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Message from '@/components/shared/Message';
import _ from 'lodash';
export default {
	data() {
		return {
			searchText: '',
			activeResult: null
		};
	},
	props: {
		customClass: {
			type: String
		}
	},
	components: {
		Message
	},
	computed: {
		...mapState(['searchResults', 'filteredUsers', 'message']),
		showAutoComplete() {
			return this.filteredUsers.length;
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
	},
	directives: {
		clickoutside: {
			bind: function(el, binding, vnode) {
				el.clickOutsideEvent = function(event) {
					// here I check that click was outside the el and his childrens
					if (!(el === event.target || el.contains(event.target))) {
						// and if it did, call method provided in attribute value
						vnode.context[binding.expression](event);
					}
				};
				document.body.addEventListener('click', el.clickOutsideEvent);
				document.body.addEventListener(
					'touchstart',
					el.clickOutsideEvent
				);
			},
			unbind: function(el) {
				document.body.removeEventListener(
					'click',
					el.clickOutsideEvent
				);
				document.body.removeEventListener(
					'touchstart',
					el.clickOutsideEvent
				);
			},
			stopProp(event) {
				event.stopPropagation();
			}
		}
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

	const keys = {
		arrrowDown: 40,
		arrrowUp: 38,
		esc: 27,
		tab: 9
	};

	const isValidKey = [40, 38, 27, 9].includes(event.keyCode);

	if (this.$refs.resultsList && isValidKey) {
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
