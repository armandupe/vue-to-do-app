new Vue({
  el: "#app",
  data: {
    todos: []
  },
  methods: {
    addTodo() {
      let text = document.querySelector('.todo-app__input');
      text = text.value;
      const regExp = text.match(/\s{2,}/g);
console.log(this.todos);
      if (text != '' && text != ' ' && !regExp) {
        this.todos.push({ text, done: false, id: Math.random() })
        let clearInputValue = document.querySelector('.todo-app__input');
        clearInputValue.value = '';

        let delBtn = document.querySelector('.btn-del-all');
        delBtn.style.display = 'block';

        const errorMsg = document.querySelector('.todo-app__input-error-msg');
        errorMsg.classList.add('hidden');
        errorMsg.textContent = ' ';
      } else {
        const errorMsg = document.querySelector('.todo-app__input-error-msg');
        errorMsg.classList.remove('hidden');
        errorMsg.textContent = 'Напишите что-нибудь, пожалуйста :)';
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      if (this.todos.length == 0) {
        let delBtn = document.querySelector('.btn-del-all');
        delBtn.style.display = 'none';
      }
    },
    removeAll() {
      const li = document.querySelectorAll('.todo-app__list-element')
      for (let i = 0; i < li.length; i++) {
        const listEl = li[i];
        listEl.parentNode.removeChild(listEl);
      }

      let delBtn = document.querySelector('.btn-del-all');
      delBtn.style.display = 'none';

    },
    check(todo) {
      todo.done = !todo.none;
    }

  }
})     