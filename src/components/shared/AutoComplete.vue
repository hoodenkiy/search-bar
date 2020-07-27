<template>
	<div :class="`mt-2 pt-1 text-${errorClass}`">
		{{ errorMesage }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	props: {
		message: {
			type: Object
		}
	},
	computed: {
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
