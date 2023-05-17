<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">MyToDo</span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                          <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  <router-view/>
    <footer class="footer bg-body-secondary w-100 position-absolute bottom-0 lh-1">
        <div class="container">
            <p class="text-center m-0 p-3">
                <router-link to="/impressum" class="link-secondary text-decoration-none">Impressum</router-link>
            </p>
        </div>
    </footer>
</template>
