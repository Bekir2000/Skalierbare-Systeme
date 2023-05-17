<template>
    <div id="app" class="container col-lg-6 my-3 border mx-auto">
    <form @submit.prevent="addTodo()">
            <div class="form-group">
                <label for="task">Task</label>
                <input type="text" class="form-control" maxlength="160" name="task" placeholder="Enter your task here" :value="description" @input="description = $event.target.value" required/>
            </div>
            <div class="form-group">
                <label for="deadline">Deadline</label>
                <input type="text" class="form-control datepicker" name="deadline" placeholder="dd/mm/yyyy" v-model="deadline" data-provide="datepicker" readonly required>
            </div>
            <div class="form-group">
                <label for="percent">%</label>
                <input type="text" pattern="[0-9]+" class="form-control" name="percent" placeholder="XX" v-model="percentage" required/>
            </div>
            <div class="container text-center m-2">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  data () {
    return {
      description: '',
      deadline: '',
      percentage: ''
    }
  },
  mounted () {
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    }).on('changeDate', (event) => {
      this.deadline = event.target.value
    })
    console.log('test')
  },
  methods: {
    addTodo () {
      axios.post('http://localhost:8004/api/newtodo', {
        description: this.description,
        deadline: this.deadline,
        percentage: this.percentage
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
