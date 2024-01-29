new Vue({
  el: "#app",
  data: {
    title: 'Задачи',
    addMsg: 'Добавить',
    delMsg: 'Удалить всё',
    todos: [],
    toDoTitle: '',
    toDoDescr: '',
    isVisibleDelAll: false,
    isBtnDisabled: false
  },
  methods: {
  addTodo() {
      this.todos.push({ toDoTitle:this.toDoTitle, toDoDescr: this.toDoDescr, done: false, id: Math.random() });
      this.toDoTitle = '';
      this.toDoDescr = '';
      this.isVisibleDelAll = true;
      this.saveToDos();
  },
    saveToDos() {
      const ListOfTasks = JSON.stringify(this.todos);
      localStorage.setItem('todos', ListOfTasks);
    },
    removeToDo(index) {
      this.todos.splice(index, 1);
      if (!this.todos.length) this.isVisibleDelAll = false;
      this.saveToDos();
    },
    removeAll() {
      const listElements = this.$refs.listEl;
      listElements.forEach(el => el.remove());
      this.isVisibleDelAll = false;
      localStorage.removeItem('todos');
    },
    check() {
      this.todos.done = true;
    },
  },
  mounted() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        this.todos = JSON.parse(storedTodos);
        if (this.todos.length > 0) {
          this.isVisibleDelAll = true;
        }
      } catch (e) {
        localStorage.removeItem('todos');
      }
    }
  }
})     