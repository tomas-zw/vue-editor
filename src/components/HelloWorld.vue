<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
  toggleForm: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      {{ msg }}<button @click="toggleForm">Login/Register</button>
    </h1>
    <h3 class="links-login">
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a> +
      <a target="_blank" href="https://tiptap.dev/installation/vue3">TipTap</a>.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  color: #798999;
}

h3 {
  font-size: 1.2rem;
  color: #798999;
}

.links-login {
  display: flex;
  justify-content: space-evenly;
}

.greetings {
  width: 100%;
}

a {
  color: #41b883;
  text-decoration: underline;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

button {
  background: #41b883;
  border: none;
  padding: 10px 20px;
  margin: 30px 40px;
  border-radius: 20px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
