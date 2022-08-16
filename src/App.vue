<script>
import ToDoItem from "./components/todoItem.vue";
import uniqueId from "lodash.uniqueid";

export default {
  name: "app",
  components: {
    ToDoItem,
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
            const itemIndex = this.tasks.findIndex(item => item.id === id);
            this.tasks.splice(itemIndex, 1)
            
    },
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
</template>

<style></style>
