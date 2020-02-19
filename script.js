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

          let delBtn = document.querySelector('.btn-del-all');
          delBtn.style.display = 'block'
        }
        
      },
      addTodoOnClick() {
        let text = document.querySelector('.todo-app__input')
        text = text.value
        if (text != '') {
          this.todos.push({text, done: false, id: Math.random()})
          let clearInputValue = document.querySelector('.todo-app__input')
          clearInputValue.value = ''

          let delBtn = document.querySelector('.btn-del-all');
          delBtn.style.display = 'block'
        }
        
      },
      removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        if (this.todos.length == 0) {
          let delBtn = document.querySelector('.btn-del-all');
          delBtn.style.display = 'none'
        }
      },
      removeAll() {
        let li = document.querySelectorAll('.todo-app__list-element')
        for (let i = 0; i < li.length; i++) {
          const listEl = li[i];
          listEl.parentNode.removeChild(listEl)
        }

        let delBtn = document.querySelector('.btn-del-all');
        delBtn.style.display = 'none'
        
      },
      check(todo) {
        todo.done = !todo.none
      }
     
    }
})     