<script>
import ToDoItem from "./components/todoItem.vue";
import uniqueId from "lodash.uniqueid";
import ToDoFooter from './components/todoFooter.vue';

export default {
  name: "app",
  components: {
    ToDoItem, ToDoFooter
  },
  data() {
    return {
      tasks: [],
      todoContent: "",
    };
  },
  methods: {
    addTaskAction() {
      if (this.todoContent) {
        this.tasks.push({
          content: this.todoContent,
          done: false,
          priority: 0,
          notes: "",
          date: "",
          id: uniqueId("todo-"),
        });
        this.todoContent = "";
      }
    },
    todoDeleted(id) {
            const itemIndex = this.tasks.findIndex(item => item.id === id); // why error with filter on proxy
            this.tasks.splice(itemIndex, 1)

    },
    clearedAll() {
      this.tasks = []
    },
    countDone() {
      let count = 0
      this.tasks.forEach(a => {
        if(a.done) count++
      })
      return count
    },
    clearedDone() {
              console.log(this.tasks[0])
      const length =  this.tasks.length
      while (this.countDone()) {
      for (let i = 0; i <= length; i++) {
        const task = this.tasks[i]
        if (task === undefined) break
        console.log(this.tasks)
        if(task.done) {
          const itemIndex = this.tasks.findIndex(item => item.id === task.id); // why error with filter on proxy
          this.tasks.splice(itemIndex, 1)
        }
      }
      }
    },
    doneUpdated(id, done) {
      const itemIndex = this.tasks.findIndex(item => item.id === id);
      this.tasks[itemIndex].done = done
    }
  },
};
</script>

<template>
  <header class="title">
    <h1>To-Do with Vue</h1>
  </header>
  <ul>
    <li v-for="(task, index) in tasks">
      <to-do-item
        :content="task.content"
        :done="task.done"
        :priority="task.priority"
        :notes="task.notes"
        :date="task.date"
        :id="task.id"
        @delete-todo="todoDeleted"
        @edit-todo-text="
          (value) => {
            this.tasks[index].content = value;
          }
        "
        @update-done="doneUpdated"
      ></to-do-item>
    </li>
  </ul>
  <div class="addTodoBar">
    <input
      v-on:keypress.enter="addTaskAction"
      v-model.trim="todoContent"
      type="text"
      id="typeTodo"
      placeholder="type in"
    />
  </div>
  <to-do-footer class="footer" @clear-all="clearedAll" @clear-done="clearedDone"></to-do-footer>

</template>

<style></style>
