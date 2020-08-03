<template>
	<div class="shadow-sm">
		<ul
			role="listbox"
			class="list-group auto-complete w-100"
			ref="resultsList"
			:id="`${this.searchInputId}-results-list`"
		>
			<li
				:class="{
					active: activeResult === index,
					'rounded-bottom': results.length === 1,
					'rounded-0': index === 0 && results.length > 1
				}"
				class="list-group-item"
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
				<slot :item="result"></slot>
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
