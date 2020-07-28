<template>
	<div class="shadow-sm" v-clickoutside="$emit('click-outside')">
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
</script>
