export default {
    template: `<form @submit.prevent="addTodo()">
            <div class="form-group">
                <label for="task">Task</label>
                <input type="text" class="form-control" maxlength="160" name="task" placeholder="Enter your task here" v-model="description"/>
            </div>
            <div class="form-group">
                <label for="deadline">Deadline</label>
                <input type="text" class="form-control datepicker" name="deadline" placeholder="dd/mm/yyyy" v-model="deadline" data-provide="datepicker" readonly>
            </div>
            <div class="form-group">
                <label for="percent">%</label>
                <input type="text" pattern="[0-9]+" class="form-control" name="percent" placeholder="XX" v-model="percentage"/>
            </div>

            <div class="container text-center m-2">
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
`,
    data() {
        return {
            description: '',
            deadline: '',
            percentage: '',
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
        addTodo() {
            axios.post('/api/newtodo', {
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
