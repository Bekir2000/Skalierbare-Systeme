export default {
    template: `<form @submit.prevent="addTodo()">
            <div class="form-group">
                <label for="task">Task</label>
                <input type="text" class="form-control" maxlength="160" name="task" placeholder="Enter your task here" v-model="description"/>
            </div>
            <div class=" form-group">
                <label for="deadline">Deadline</label>
                <input type="text" class="form-control" pattern="(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\\d{4}"
                    name="deadline" placeholder="dd/mm/yyyy" v-model="deadline"/>
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
        },
    }
}
