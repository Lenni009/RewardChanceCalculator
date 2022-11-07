<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      output: 0
    }
  },
	methods: {
		onKeyUp(event) {
			this.output = event.target.value;
		}
	}
}
</script>

<template>
	<div class="container">
		<div class="columns is-desktop">
			<div class="column is-full-mobile">
				<label for="EXMLinput">Paste EXML here:</label>
				<textarea id="EXMLinput" autofocus @keyup="onKeyUp"></textarea>
			</div>
			<div class="column is-full-mobile">
				<div style="font-weight:bold">Output</div>
				<div id="output">
					{{ output }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.column>* {
	display: block;
	color: var(--color-heading);
}

.container {
	padding: 2em 0;
}

label {
	font-weight: bold;
}

textarea {
	background-color: var(--color-background-soft);
	height: 85vh;
	width: 35vw;
}
</style>
