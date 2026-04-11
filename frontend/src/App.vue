<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Reset para a tela ocupar 100% sem bordas brancas */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>