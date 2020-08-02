<template>
	<div class="shadow-sm">
		<ul
			role="listbox"
			class="list-group auto-complete w-100"
			ref="resultsList"
			:id="`${this.searchInputId}-results-list`"
		>
			<li
				class="list-group-item"
				:class="{
					active: activeResult === index,
					'rounded-0': index === 0 && results.length > 1
				}"
				@click="$emit('result-selected', result)"
				v-for="(result, index) in results"
				@keydown="$emit('keyboard-navigation', $event)"
				@mouseover="activeResult = index"
				@mouseout="activeResult = null"
				:key="`result-${index}`"
				role="option"
				tabindex="0"
				@keydown.enter="$emit('result-selected', result)"
			>
				<slot></slot>
				<img
					:alt="`${result.name.first} ${result.name.last}`"
					class="card-img w-auto shadow-sm rounded-circle"
					:src="result.picture.thumbnail"
					v-if="result.picture && result.picture.thumbnail"
				/>
				<span class="mx-3 strong font-weight-bold">
					{{ result.name.first }}
					{{ result.name.last }}
				</span>
				&mdash; <span class="mx-2">{{ result.phone }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	beforeDestroy() {
		document.removeEventListener('click', this.onClickOutside);
	},
	mounted() {
		document.addEventListener('click', this.onClickOutside);
	},
	data() {
		return {
			activeResult: null
		};
	},
	methods: {
		onClickOutside(event) {
			const searchBox = document.getElementById(this.searchInputId);
			if (
				event.target !== searchBox &&
				event.target !== this.$refs.resultsList &&
				!this.$refs.resultsList.contains(event.target)
			) {
				this.$emit('click-out');
			}
		}
	},
	props: {
		results: {
			type: Array
		},
		searchInputId: {
			type: String
		}
	}
};
</script>
