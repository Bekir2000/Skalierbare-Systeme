<template>
    <h1 class="text-center"><strong>ToDo</strong></h1>

    <div class="container borderborder-2 text-center mx-auto" id="app" v-cloak>
        <div class="row p-1 m-1 border-bottom border-2 align-items-center">
            <div class="col-md-5">Task</div>
            <div class="col-md-3">Deadline</div>
            <div class="col-md-1">%</div>
            <div class="col-md-3"></div>
        </div>
        <transition-group name="fade" tag="div">
            <div v-for="todo in todos" :key="todo.id" class="row p-1 m-1 border align-items-center text-center">
                <div class="col-md-5"> {{ todo.description}}</div>
                <div class="col-md-3"> {{ todo.deadline }}</div>
                <div class="col-md-1">
                    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar overflow-visible" :style="`width: ${todo.percentage}%`"></div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="btn-group m-1" role="group" aria-label="Basic example">
                        <router-link :to="{ name: 'edit', params: { id: todo.id } }" class="btn btn-primary">Edit</router-link>
                    </div>
                    <div class="btn-group m-1" role="group" aria-label="Second group">
                        <button class="btn btn-danger" type="delete" @click="deleteTodo(todo.id)">X</button>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>

    <div class="container text-center my-3">
        <div class="row">
            <div class="col">
                <router-link to="/newtodo" class="btn btn-primary">New ToDo</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeView',
  data: function () {
    return {
      todos: [],
      description: '',
      deadline: '',
      percentage: '',
      editId: ''
    }
  },
  created () {
    axios.get('http://localhost:8004/api/todos')
      .then((response) => {
        this.todos = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    deleteTodo (todoId) {
      axios.delete(`http://localhost:8004/api/deletetodo/${todoId}`)
        .then(() => {
          this.todos = this.todos.filter((todo) => todo.id !== todoId)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
