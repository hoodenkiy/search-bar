<template>
	<div>
		<img
			:alt="`${item.name.first} ${item.name.last}`"
			class="card-img w-auto shadow-sm rounded-circle"
			:src="item.picture.thumbnail"
			v-if="item.picture && item.picture.thumbnail"
		/>
		<span class="mx-3 strong font-weight-bold">
			{{ item.name.first }}
			{{ item.name.last }}
		</span>
		&mdash; <span class="mx-2">{{ item.phone }}</span>
	</div>
</template>

<script>
export default {
	props: ['item']
};
</script>

<style></style>
