<script setup lang="ts">
let output: string;
</script>

<template>
	<div class="container">
		<div class="columns is-desktop">
			<div class="column is-full-mobile">
				<label for="EXMLinput">Paste EXML here:</label>
				<textarea id="EXMLinput" v-model="output" autofocus></textarea>
			</div>
			<div class="column is-full-mobile">
				<div style="font-weight:bold">Output</div>
				<div id="output">{{ output }}</div>
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
	width: 99%;
	padding: 0 5px;
	border-radius: 5px;
	resize: vertical;
}

#output {
	display: grid;
	border: 1px solid black;
}

#output>div {
	border: 1px solid black;
}
</style>