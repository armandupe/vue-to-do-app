<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { ToDo } from '@/interfaces/main.ts'

const addMsg = ref('Добавить')
const delMsg = ref('Удалить всё')
const delCheckedMsg = ref('Удалить выбранные')
const todos = ref([]) as Ref<ToDo[]>
const toDoTitle = ref('')
const toDoDescr = ref('')
const isVisibleDelAll = ref(false)
const isDataChanged = ref(false)

onMounted(() => {
  const storedTodos = localStorage.getItem('todos')
  if (storedTodos) {
    try {
      todos.value = JSON.parse(storedTodos)
      if (todos.value.length > 0) {
        isVisibleDelAll.value = true
      }
    } catch (e) {
      localStorage.removeItem('todos')
    }
  }
})

const addTodo = () => {
  todos.value.push({
    title: toDoTitle.value,
    descr: toDoDescr.value,
    done: false,
    id: Math.random()
  })
  toDoTitle.value = ''
  toDoDescr.value = ''
  isVisibleDelAll.value = true
  saveToDos()
}

const saveToDos = () => {
  const ListOfTasks = JSON.stringify(todos.value)
  localStorage.setItem('todos', ListOfTasks)
}

const removeToDo = (index: number) => {
  todos.value.splice(index, 1)
  if (!todos.value.length) isVisibleDelAll.value = false
  saveToDos()
}

const removeAll = () => {
  todos.value = []
  isVisibleDelAll.value = false
  localStorage.removeItem('todos')
}

const removeChecked = () => {
  todos.value = todos.value.filter((todo) => !todo.done)
  if (!todos.value.length) isVisibleDelAll.value = false
  saveToDos()
}

const changeToDoInfo = (event: Event, todo: ToDo, type: string) => {
  const inputElement = event.target as HTMLInputElement
  if (inputElement && type === 'title') {
    todo.title = inputElement.value
  } else if (inputElement && type === 'descr') {
    todo.descr = inputElement.value
  }
  saveToDos()
  isDataChanged.value = true
  setTimeout(() => {
    isDataChanged.value = false
  }, 1000)
}
</script>

<template>
  <div class="success-toast" v-text="'Сохранено'" v-show="isDataChanged" />
  <div class="input-container">
    <input
      v-model.trim="toDoTitle"
      type="text"
      class="input"
      placeholder="Название задачи"
      @keyup.enter="addTodo()"
    />
    <textarea
      v-model.trim="toDoDescr"
      type="text"
      class="input textarea"
      placeholder="Описание задачи"
      @keyup.enter="addTodo()"
    ></textarea>
    <button :disabled="!toDoTitle || !toDoDescr" @click="addTodo" class="btn-add">
      {{ addMsg }}
    </button>
  </div>
  <ul class="list">
    <li class="list-element" v-for="(todo, n) in todos" :key="todo.id">
      <label class="label">
        <input type="checkbox" class="checkbox" v-model="todo.done" />
        <span class="checkbox-checkmark"></span>
      </label>
      <div class="todo-text">
        <input
          :class="{ 'del-text': todo.done }"
          class="input"
          type="text"
          @change="changeToDoInfo($event, todo, 'title')"
          :value="todo.title"
        />
        <textarea
          :value="todo.descr"
          @change="changeToDoInfo($event, todo, 'descr')"
          :class="{ 'del-text': todo.done }"
        />
      </div>
      <button class="btn-remove-todo" v-if="todo.done" @click="removeToDo(n)">
        <img
          class="close-icon"
          title="Удалить"
          alt="close icon"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDU1LjExMSA0NTUuMTExIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTUuMTExIDQ1NS4xMTE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0UyNEM0QjsiIGN4PSIyMjcuNTU2IiBjeT0iMjI3LjU1NiIgcj0iMjI3LjU1NiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0QxNDAzRjsiIGQ9Ik00NTUuMTExLDIyNy41NTZjMCwxMjUuMTU2LTEwMi40LDIyNy41NTYtMjI3LjU1NiwyMjcuNTU2Yy03Mi41MzMsMC0xMzYuNTMzLTMyLjcxMS0xNzcuNzc4LTg1LjMzMw0KCWMzOC40LDMxLjI4OSw4OC4xNzgsNDkuNzc4LDE0Mi4yMjIsNDkuNzc4YzEyNS4xNTYsMCwyMjcuNTU2LTEwMi40LDIyNy41NTYtMjI3LjU1NmMwLTU0LjA0NC0xOC40ODktMTAzLjgyMi00OS43NzgtMTQyLjIyMg0KCUM0MjIuNCw5MS4wMjIsNDU1LjExMSwxNTUuMDIyLDQ1NS4xMTEsMjI3LjU1NnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzMxLjM3OCwzMzEuMzc4Yy04LjUzMyw4LjUzMy0yMi43NTYsOC41MzMtMzEuMjg5LDBsLTcyLjUzMy03Mi41MzNsLTcyLjUzMyw3Mi41MzMNCgljLTguNTMzLDguNTMzLTIyLjc1Niw4LjUzMy0zMS4yODksMGMtOC41MzMtOC41MzMtOC41MzMtMjIuNzU2LDAtMzEuMjg5bDcyLjUzMy03Mi41MzNsLTcyLjUzMy03Mi41MzMNCgljLTguNTMzLTguNTMzLTguNTMzLTIyLjc1NiwwLTMxLjI4OWM4LjUzMy04LjUzMywyMi43NTYtOC41MzMsMzEuMjg5LDBsNzIuNTMzLDcyLjUzM2w3Mi41MzMtNzIuNTMzDQoJYzguNTMzLTguNTMzLDIyLjc1Ni04LjUzMywzMS4yODksMGM4LjUzMyw4LjUzMyw4LjUzMywyMi43NTYsMCwzMS4yODlsLTcyLjUzMyw3Mi41MzNsNzIuNTMzLDcyLjUzMw0KCUMzMzkuOTExLDMwOC42MjIsMzM5LjkxMSwzMjIuODQ0LDMzMS4zNzgsMzMxLjM3OHoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
        />
      </button>
    </li>
  </ul>
  <div class="remove-btns">
    <button @click="removeAll" v-show="isVisibleDelAll" class="btn-del">{{ delMsg }}</button>
    <button @click="removeChecked" v-show="isVisibleDelAll" class="btn-del">
      {{ delCheckedMsg }}
    </button>
  </div>
</template>
<style scoped>
.success-toast {
  position: absolute;
  z-index: 10;
  top: -3rem;
  right: 0;
  padding: 0 1rem;
  width: fit-content;
  height: auto;
  background-color: rgb(94, 206, 94);
  color: white;
  border-radius: 0.25rem;
  font-weight: 600;
}
</style>
