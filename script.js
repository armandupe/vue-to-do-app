new Vue({
  el: "#app",
  data: {
    title: 'Задачи',
    addMsg: 'Добавить',
    delMsg: 'Удалить всё',
    errorInputMsg: 'Напишите что-нибудь, пожалуйста :)',
    todos: [],
    isVisibleDelAll: false,
    isHidden: true
  },
  methods: {
    addTodo() {
      let text = document.querySelector('.todo-app__input');
      text = text.value;
      const regExp = text.match(/\s{2,}/g);

      if (text != '' && text != ' ' && !regExp) {
        this.todos.push({ text, done: false, id: Math.random() })
        let clearInputValue = document.querySelector('.todo-app__input');
        clearInputValue.value = '';

        const errorMsg = document.querySelector('.todo-app__input-error-msg');
        this.isHidden = true;
        errorMsg.textContent = ' ';

        this.isVisibleDelAll = true;

        this.saveToDos();

      } else {
        const errorMsg = document.querySelector('.todo-app__input-error-msg');
        this.isHidden = false;
        errorMsg.textContent = this.errorInputMsg;
      }
    },
    saveToDos() {
      const ListOfTasks = JSON.stringify(this.todos);
      localStorage.setItem('todos', ListOfTasks);
    },
    removeToDo(n) {
      this.todos.splice(n, 1);
      if (this.todos.length == 0) {
        this.isVisibleDelAll = false;
      }
      this.saveToDos();
    },
    removeAll() {
      const li = document.querySelectorAll('.todo-app__list-element')
      for (let i = 0; i < li.length; i++) {
        const listEl = li[i];
        listEl.parentNode.removeChild(listEl);
      }
      this.isVisibleDelAll = false;
      localStorage.removeItem('todos');
    },
    check() {
      this.todos.done = true;
    },
  },
  mounted() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      } catch (e) {
        localStorage.removeItem('todos');
      }
    }
    if (this.todos.length > 0) {
      this.isVisibleDelAll = true;
    }
  }
})     