<template>
  <div class="visible">
    <p class="savedTodo">
      <input
        type="text"
        :class="{ /*taskCompletion: isDone(index),*/ todoContentBar: true }"
        @change="onTextEdit"
        v-model="content"
      />
    </p>
    <input type="checkbox" class="done" v-model="done" @change="emitDone" />
    <button class="expandButton" @click="expand">v</button>
  </div>

  <div class="hidden" v-if="expanded">
    <div class="leftHidden">
      <textarea class="notes">{{ notes }}</textarea>
    </div>
    <div class="rightHidden">
      <input type="date" class="date" :value="date" />
      <select class="priority" :selectedIndex="priority">
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
      <button class="delete" @click="deleteTodo">delete</button>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["delete-todo", "edit-todo-text", "update-done", "expand"],
  data() {
    return {
      todoContent: this.content,
      doneStatus: this.done,
      selectedPriority: this.priority,
      todoNotes: this.notes,
      todoDate: this.date,
    };
  },
  props: {
    content: { required: true, type: String },
    done: { default: false, type: Boolean },
    priority: { default: 0, type: Number },
    notes: { default: "", type: String },
    date: { default: "", type: String },
    id: { required: true, type: String },
    expanded: {default: false, type: Boolean}
  },
  methods: {
    expand() {
      this.$emit('expand', this.id, this.expanded)
    },
    deleteTodo() {
      this.$emit("delete-todo", this.id);
    },
    onTextEdit(event) {
      const var1 = event.target.value;
      this.todoContent = var1;
      this.$emit("edit-todo-text", var1);
    },
    emitDone() {
      this.$emit("update-done", this.id, this.done);
    },
  },
};
</script>
