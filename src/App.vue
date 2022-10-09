<script>
import ToDoItem from "./components/todoItem.vue";
import ToDoFooter from "./components/todoFooter.vue";
import {getAllTodosExport} from '../DB.js';
import {insertTodoExport} from '../DB.js';
import {updateTodoExport} from '../DB.js';
import {deleteTodoExport} from '../DB.js';
import {deleteAllExport} from '../DB.js';
import {deleteDoneExport} from '../DB.js';



export default {
  name: "app",
  components: {
    ToDoItem,
    ToDoFooter,
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
        const todo = {
          content: this.todoContent,
          done: false,
          priority: 0,
          notes: "",
          date: "",
          expanded: false
        }
        const id = insertTodoExport(todo)
        todo.id = id
        this.tasks.push(todo);
        this.todoContent = "";
      }
    },
    todoDeleted(id) {
      const itemIndex = this.tasks.findIndex((item) => item._id === id);
      this.tasks.splice(itemIndex, 1);
      deleteTodoExport(id)
    },
    clearedAll() {
      this.tasks = [];
      deleteAllExport()
    },
    countDone() {
      let count = 0;
      this.tasks.forEach((a) => {
        if (a.done) count++;
      });
      return count;
    },
    clearedDone() {
      const length = this.tasks.length;
      while (this.countDone()) {
        for (let i = 0; i <= length; i++) {
          const task = this.tasks[i];
          if (task === undefined) break;
          if (task.done) {
            const itemIndex = this.tasks.findIndex(
              (item) => item.id === task.id
            );
            this.tasks.splice(itemIndex, 1);
          }
        }
      }
      deleteDoneExport({'done': true})
    },
    doneUpdated(done, id) {
      const itemIndex = this.tasks.findIndex((item) => item._id === id);
      this.tasks[itemIndex].done = done;
      updateTodoExport({'done': done}, this.tasks[itemIndex]._id)

    },
    expandedTodo(id, expanded) {
      this.tasks.forEach(a => {
          if (a._id === id) a.expanded = !expanded
          else a.expanded = false 
      })
    },
    async updateTodosOnStart() {
          const result = await getAllTodosExport()
          this.tasks = result
    }, 
    updateContent(value, id) {
      const itemIndex = this.tasks.findIndex(item => item._id === id)
      this.tasks[itemIndex].content = value;
      updateTodoExport({'content': value}, this.tasks[itemIndex]._id)
    },
    notesUpdated(notes, id){
      const itemIndex = this.tasks.findIndex(item => item._id === id)
      this.tasks[itemIndex].notes = notes;
      updateTodoExport({'notes': notes}, this.tasks[itemIndex]._id)
    },
    dateUpdated(date, id){
      const itemIndex = this.tasks.findIndex(item => item._id === id)
      this.tasks[itemIndex].date = date;
      updateTodoExport({'date': date}, this.tasks[itemIndex]._id)
    },
    priorityUpdated(priority, id){
      const itemIndex = this.tasks.findIndex(item => item._id === id)
      this.tasks[itemIndex].priority = priority;
      updateTodoExport({'priority': priority}, this.tasks[itemIndex]._id)
    }
  }, mounted() {
    this.updateTodosOnStart()
  }
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
        :id="task._id"
        :expanded="task.expanded"
        @delete-todo="todoDeleted"
        @edit-todo-text="updateContent"
        @update-done="doneUpdated"
        @expand="expandedTodo"
        @update-notes="notesUpdated"
        @update-date="dateUpdated"
        @update-priority="priorityUpdated"
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
  <to-do-footer
    class="footer"
    @clear-all="clearedAll"
    @clear-done="clearedDone"
  ></to-do-footer>
</template>

<style></style>
