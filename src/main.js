import editform from './components/edit-form.js'
import newform from './components/new-form.js'

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
                    this.todos = this.todos.filter((todo) => todo.id !== todoId)
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

app.component('edit-form', editform)
app.component('new-form', newform)

app.mount('#app');
