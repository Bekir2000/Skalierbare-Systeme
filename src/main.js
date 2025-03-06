import editform from './components/edit-form.js'
import newform from './components/new-form.js'

let app = Vue.createApp({
    data: function() {
        return {
            todos: [], // initialize todos as an empty array
            description: '',
            deadline: '',
            percentage: '',
            editId: '',
            isLoading: true // initialize loading state
        }
    },
    created() {
        // Check if user is authenticated
        axios.get('/api/todos')
            .then((response) => {
                this.todos = response.data;
                this.isLoading = false; // set loading to false after data is loaded
            })
            .catch((error) => {
                this.isLoading = false; // set loading to false if there's an error
                if (error.response && error.response.status === 401) {
                    window.location.href = '/login.html';
                } else {
                    console.log(error);
                }
            });
    },
    methods: {
        deleteTodo(todoId) {
            axios.delete(`/api/deletetodo/${todoId}`)
                .then(() => {
                    this.todos = this.todos.filter((todo) => todo.id !== todoId)
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        window.location.href = '/login.html';
                    } else {
                        console.log(error);
                    }
                });
        },
        editTodo(todoId) {
            window.location.href = `/edit.html?todoId=${todoId}`
        },
        logout() {
            axios.post('/api/logout')
                .then(() => {
                    window.location.href = '/login.html';
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
});

app.component('edit-form', editform)
app.component('new-form', newform)

app.mount('#app');
