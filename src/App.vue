<script setup lang="ts">
import ToDoList from './components/ToDoList.vue'
</script>

<template>
  <header>
    <h1>Vue 3 ToDo App</h1>
  </header>
  <main class="todo-app">
    <ToDoList />
  </main>
  <footer>armandupe 2024</footer>
</template>

<style scoped>
header h1 {
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
}
footer {
  margin-top: 3rem;
}
</style>
