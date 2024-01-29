<script setup lang="ts">
import ToDoList from './components/ToDoList.vue'
</script>

<template>
  <header v-text="'Vue 3 ToDo App'" />
  <main class="todo-app">
    <ToDoList />
  </main>
  <footer>armandupe 2024</footer>
</template>

<style scoped>
footer {
  margin-top: 10rem;
}
</style>
