<script>
import ToDoItem from "./src/components/todoItem.vue";
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
        });
        this.todoContent = "";
      }
    },
    todoDeleted(index) {
      this.tasks.splice(index, 1)
    }
  },
};
</script>

<template>
  <header class="title">
    <h1>VUEDOO</h1>
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
        @delete-todo="todo-deleted(index)"
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
