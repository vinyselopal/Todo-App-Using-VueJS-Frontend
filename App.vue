<script>
export default {
data () {
  return {
    tasks: [],
    todoContent: ''
  }
},
methods: {
  addTaskAction() {
    if(this.value !== '') {
      this.tasks.push({todoContent: this.todoContent, doneStatus: false, selectedPriority: 0, notes: '', date: '', expanded: false, id: Date.now()})
      this.todoContent = ''
    }
  },
  expand(index) {
    this.tasks[index].expanded = !this.tasks[index].expanded
    this.tasks.forEach((a, i) => {
      if (i !== index) a.expanded = false
    })
  },
  deleteTodo(index) {
    this.tasks.splice(index,1)
  },
  isDone(index) {
    return this.tasks[index].doneStatus
  },
  onDone(event, index) {
    this.tasks[index].doneStatus = event.target.checked
}
}
}

</script>

<template>
<header class = "title">
            <h1>VUEDOO</h1>
        </header>
            <ul>
              <li v-for="(task,index) in tasks">
              
                <div class="visible">
                  <p class="savedTodo">
                  <text :class="{taskCompletion:isDone(index), todoContentBar}">{{task.todoContent}}</text>
                  </p>
                  <input type="checkbox" class="done" @change="onDone($event, index)">
                  <button class="expandButton" @click="expand(index)">v</button>
                </div>
                <div class="hidden" v-if="this.tasks[index].expanded">
                <div class="leftHidden">
                  <textarea class="notes"></textarea>
                  </div>
                  <div class="rightHidden">
                  <input type="date" class="date">
                  <select class="priority">
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                  </select>
                  <button class='delete' @click="deleteTodo">delete</button>
                  </div>
                </div>
                
              </li>
            </ul>
            <div class = "appContent"></div>
            <div class = "addTodoBar">
                <input v-on:keypress.enter="addTaskAction" v-model="todoContent" type = "text" id = "typeTodo" placeholder = "type in"/>
            </div>
</template>

<style>

</style>
