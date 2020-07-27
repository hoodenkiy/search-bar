<template>
	<main>
		<div class="card border-0 my-5">
			<div class="card-body">
				<img
					:alt="`${selectedUser.name.first} ${selectedUser.name.last}`"
					class="card-img w-auto shadow-sm rounded-circle mb-3"
					:src="selectedUser.picture.large"
					v-if="selectedUser.picture.large"
				/>

				<h5 class="card-title mb-4">
					{{ selectedUser.name.first }}
					{{ selectedUser.name.last }}
				</h5>
				<h6 class="card-text">
					Personal information:
				</h6>
				<p><strong>Phone#:</strong> {{ selectedUser.phone }}</p>
			</div>
		</div>
	</main>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['selectedUser'])
	}
};
</script>
