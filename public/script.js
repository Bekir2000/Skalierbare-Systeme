let app = Vue.createApp({
    data: function() {
        return {
            todos: [], // initialize todos as an empty array
            description: '',
            deadline: '',
            percentage: '',
            editId: ''
        }
    },
    created() {
        axios.get('/api/todos')
            .then((response) => {
                this.todos = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        deleteTodo(todoId) {
            axios.delete(`/api/deletetodo/${todoId}`)
                .then(() => {
                    location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
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
        editTodo(todoId) {
            window.location.href = `/edit.html?todoId=${todoId}`
    }
    }
});

app.component('edit-form', {
    props: ['todos'],
    template: `
        <form @submit.prevent="editTodo()">
            <div class="form-group">
                <label for="task">Task</label>
                <input type="text" class="form-control" maxlength="160" name="task" placeholder="Enter your task here"
                    v-model="description"/>
            </div>
            <div class=" form-group">
                <label for="deadline">Deadline</label>
                <input type="text" class="form-control" pattern="(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/\\d{4}"
                    name="deadline" placeholder="dd/mm/yyyy" v-model="deadline"/>
            </div>
            <div class="form-group">
                <label for="percent">%</label>
                <input type="text" pattern="[0-9]+" class="form-control" name="percent" v-model="percentage"
                    placeholder="XX"/>
            </div>
            <div class="container text-center m-2">
                    <button type="submit" class="btn btn-primary"> Save </button>
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
        todoId = new URLSearchParams(window.location.search).get('todoId');
        this.todoId=todoId

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
    methods: {
        editTodo(){
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
})

app.mount('#app');
