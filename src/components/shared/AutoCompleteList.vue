<template>
	<div class="shadow-sm">
		<ul
			class="list-group auto-complete"
			ref="resultsList"
			id="results-list"
		>
			<li
				class="list-group-item"
				:class="{
					active: activeResult === index,
					'rounded-0': index === 0
				}"
				@click="$emit('result-selected', user)"
				v-for="(user, index) in results"
				@keydown="$emit('keyboard-navigation', $event)"
				@mouseover="activeResult = index"
				@mouseout="activeResult = null"
				:key="`user-${index}`"
				tabindex="0"
				@keydown.enter="$emit('result-selected', user)"
			>
				<img
					:alt="`${user.name.first} ${user.name.last}`"
					class="card-img w-auto shadow-sm rounded-circle"
					:src="user.picture.thumbnail"
					v-if="user.picture && user.picture.thumbnail"
				/>
				<span class="mx-3 strong font-weight-bold">
					{{ user.name.first }}
					{{ user.name.last }}
				</span>
				&mdash; <span class="mx-2">{{ user.phone }}</span>
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
			const searchBox = document.getElementById('search-input');
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
		}
	}
};
</script>
