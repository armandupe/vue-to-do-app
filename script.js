new Vue({
    el: "#app",
    data: {
      todos: []
    },
    methods: {
      addTodo(event) {
        const text = event.target.value
        if (text != '') {
          this.todos.push({text, done: false, id: Math.random()})
          event.target.value = ''
        }
      },
      removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
      },
      check(todo) {
        todo.done = !todo.none
      }
     
    }
})     