<template>
	<div :class="`mt-2 pt-1 text-${errorClass}`">
		{{ errorMesage }}
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {
			active: false
		};
	},
	computed: {
		...mapState(['message']),
		errorMesage() {
			return this.message.content && this.active
				? this.message.content
				: undefined;
		},
		errorClass() {
			return this.message.type && this.active
				? this.message.type
				: 'primary';
		}
	},
	methods: {
		...mapActions(['getTodos']),
		...mapMutations(['SET_MESSAGE'])
	},
	watch: {
		message(newMessage) {
			if (!newMessage.content) {
				return;
			}

			this.active = true;

			setTimeout(() => {
				this.active = false;
			}, 5000);
		}
	}
};
</script>
