export default {
    template: `<form @submit.prevent="editTodo()">
            <div class="form-group">
                <label for="task">Task</label>
                <input type="text" class="form-control" maxlength="160" name="task" placeholder="Enter your task here"
                    v-model="description"/>
            </div>
            <div class=" form-group">
                <label for="deadline">Deadline</label>
                <input type="text" class="form-control datepicker" name="deadline" placeholder="dd/mm/yyyy" v-model="deadline" data-provide="datepicker" readonly>
            </div>
            <div class="form-group">
                <label for="percent">%</label>
                <input type="text" pattern="[0-9]+" class="form-control" name="percent" v-model="percentage"
                    placeholder="XX"/>
            </div>
            <div class="container text-center m-2">
                    <button type="submit" class="btn btn-primary"> Save </button >
            </div>
        </form>
`,
    data() {
        return {
            description: '',
            deadline: '',
            percentage: '',
            todoId: ''
        }
    },
    created() {
        const todoId = new URLSearchParams(window.location.search).get('todoId');
        this.todoId = todoId
        if (this.todoId) {
            axios.get(`/api/todos/${this.todoId}`)
                .then((response) => {
                    this.description = response.data[0].description;
                    this.deadline = response.data[0].deadline;
                    this.percentage = response.data[0].percentage;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        }).on('changeDate', (event) => {
      this.deadline = event.target.value;
    });
    },
    methods: {
        editTodo() {
            axios.put(`/api/edittodo/${this.todoId}`, {
                description: this.description,
                deadline: this.deadline,
                percentage: this.percentage
            })
                .then(() => {
                    window.location.href = '/index.html';
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
}
