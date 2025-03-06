const app = Vue.createApp({
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login() {
            axios.post('/api/login', {
                username: this.username,
                password: this.password
            })
            .then(() => {
                window.location.href = '/index.html';
            })
            .catch((error) => {
                this.error = error.response.data.error;
            });
        },
        register() {
            axios.post('/api/register', {
                username: this.username,
                email: this.email,
                password: this.password
            })
            .then(() => {
                window.location.href = '/index.html';
            })
            .catch((error) => {
                this.error = error.response.data.error;
            });
        }
    }
});

app.mount('#app');