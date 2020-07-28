<template>
	<div class="shadow-sm">
		<ul class="list-group auto-complete rounded-0" ref="resultsList">
			<li
				class="list-group-item rounded-0"
				:class="{ active: activeResult === index }"
				@click="$emit('result-selected', user)"
				v-for="(user, index) in results"
				@keydown="$emit('keyboard-navigation')"
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
</template>

<script>
export default {
	data() {
		return {
			activeResult: null
		};
	},
	props: {
		results: {
			type: Array
		}
	}
};
</script>
