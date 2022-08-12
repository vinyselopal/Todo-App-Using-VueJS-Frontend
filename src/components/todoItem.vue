<template>
  <div class="visible">
    <p class="savedTodo">
      <text :class="{ taskCompletion: isDone(index), todoContentBar: true }">{{
        content
      }}</text>
    </p>
    <input type="checkbox" class="done" :checked="done" />
    <button class="expandButton" @click="expand">v</button>
  </div>

  <div class="hidden" v-if="this.expanded">
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
    priority: { default: 0, type: Integer },
    notes: { default: "", type: String },
    date: { default: "", type: String },
    expanded: { default: false, type: Boolean },
    id: {required: true, type: String}
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    },
    deleteTodo() {
      this.$emit("todo-deleted", this.id);
    },
  },
};
</script>
